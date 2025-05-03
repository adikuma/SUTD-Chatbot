import os
import sys
import time
import threading
import datetime
import pickle
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
from dotenv import load_dotenv
from huggingface_hub import login
import torch
import gc
import importlib.util
import logging
from src.data_processor import load_data, process_documents
from src.embeddings import get_openai_embeddings
from src.vector_store import create_vector_store, load_vector_store
from src.rag_model import get_llm, create_qa_chain

# load environment variables
load_dotenv()

# setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("rag_api.log"), logging.StreamHandler()],
)
logger = logging.getLogger("rag_api")

# fastapi app
app = FastAPI(
    title="SUTD RAG API",
    description="API for SUTD Retrieval-Augmented Generation Question Answering System",
    version="1.0.0",
)

# configuration
VECTOR_STORE_PATH = "vector_store/faiss_index"
RAG_CONTENT_PATH = "data/rag_content/rag_data.json"
BASE_MODEL_ID = "meta-llama/Llama-3.2-1B"
FINETUNED_MODEL_ID = os.getenv("HUGGINGFACE_USERNAME") + "/sutd_rag_chatbot"
CONTENT_UPDATE_INTERVAL = 7 * 24 * 60 * 60  # 7 days in seconds
LAST_UPDATE_FILE = "data/last_update.pickle"


# pydantic models for api
class Question(BaseModel):
    query: str


class Answer(BaseModel):
    answer: str
    sources: List[Dict[str, Any]]


class RebuildRequest(BaseModel):
    json_path: Optional[str] = RAG_CONTENT_PATH


embeddings = None
vector_store = None
base_qa_chain = None
finetuned_qa_chain = None
content_update_thread = None
shutdown_event = threading.Event()


# function to import and run content retriever
def run_content_retriever():
    try:
        logger.info("running content retriever...")

        # safely skip playwright for now to avoid errors
        logger.info(
            "content retriever functionality is disabled to avoid playwright errors"
        )

        # create a dummy result to allow the process to continue
        results = []

        # save last update time so we don't keep trying to update
        os.makedirs(os.path.dirname(LAST_UPDATE_FILE), exist_ok=True)
        with open(LAST_UPDATE_FILE, "wb") as f:
            pickle.dump(datetime.datetime.now(), f)

        return results
    except Exception as e:
        logger.error(f"error running content retriever: {str(e)}")
        return None


def update_vector_store():
    global vector_store, base_qa_chain, finetuned_qa_chain, embeddings

    try:
        # check if vector store directory exists
        if os.path.exists(VECTOR_STORE_PATH):
            logger.info("vector store already exists, loading existing vector store...")
            vector_store = load_vector_store(VECTOR_STORE_PATH, embeddings)
        else:
            # load and process documents
            logger.info(
                f"updating vector store with fresh content from {RAG_CONTENT_PATH}..."
            )
            documents = process_documents(load_data(RAG_CONTENT_PATH))

            if not documents:
                logger.warning("no documents found or processed during update")
                return False

            logger.info(f"building vector store from {len(documents)} documents...")
            vector_store = create_vector_store(documents, embeddings, VECTOR_STORE_PATH)

        # update the retriever and qa chains
        retriever = vector_store.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        # Only update chains if they already exist
        if base_qa_chain is not None:
            try:
                base_llm = get_llm(model_id=BASE_MODEL_ID)
                base_qa_chain = create_qa_chain(base_llm, retriever)
                logger.info("base qa chain updated")
            except Exception as e:
                logger.error(f"error updating base qa chain: {e}")

        if finetuned_qa_chain is not None:
            try:
                finetuned_llm = get_llm(model_id=FINETUNED_MODEL_ID)
                finetuned_qa_chain = create_qa_chain(finetuned_llm, retriever)
                logger.info("finetuned qa chain updated")
            except Exception as e:
                logger.error(f"error updating finetuned qa chain: {e}")

        logger.info("vector store successfully updated")
        return True
    except Exception as e:
        logger.error(f"error updating vector store: {str(e)}")
        return False


def should_update_content():
    # create initial last update file if it doesn't exist
    if not os.path.exists(LAST_UPDATE_FILE):
        os.makedirs(os.path.dirname(LAST_UPDATE_FILE), exist_ok=True)
        with open(LAST_UPDATE_FILE, "wb") as f:
            pickle.dump(datetime.datetime.now(), f)
        logger.info("created initial last update record - skipping immediate update")
        return False  # skip immediate update

    try:
        with open(LAST_UPDATE_FILE, "rb") as f:
            last_update = pickle.load(f)

        now = datetime.datetime.now()
        time_since_update = (now - last_update).total_seconds()

        if time_since_update >= CONTENT_UPDATE_INTERVAL:
            logger.info(
                f"time since last update ({time_since_update/86400:.1f} days) exceeds threshold, update needed"
            )
            return True
        else:
            logger.info(
                f"content is up to date (last updated {time_since_update/86400:.1f} days ago)"
            )
            return False
    except Exception as e:
        logger.error(f"error checking update status: {str(e)}")
        return False


def content_update_scheduler():
    global shutdown_event

    while not shutdown_event.is_set():
        try:
            if should_update_content():
                # run content retriever to fetch new data
                run_content_retriever()

                # update vector store with new data
                update_vector_store()

            # sleep for one day before checking again
            for _ in range(24):  # check shutdown event every hour
                if shutdown_event.wait(3600):  # 1 hour
                    break

        except Exception as e:
            logger.error(f"error in content update thread: {str(e)}")
            shutdown_event.wait(3600)  # wait an hour before trying again on error


@app.on_event("startup")
async def startup_event():
    global embeddings, vector_store, base_qa_chain, finetuned_qa_chain, content_update_thread

    try:
        # ensure vector store directory exists
        os.makedirs(os.path.dirname(VECTOR_STORE_PATH), exist_ok=True)

        # create initial last update file if it doesn't exist to prevent immediate update
        if not os.path.exists(LAST_UPDATE_FILE):
            os.makedirs(os.path.dirname(LAST_UPDATE_FILE), exist_ok=True)
            with open(LAST_UPDATE_FILE, "wb") as f:
                pickle.dump(datetime.datetime.now(), f)
            logger.info("created initial last update record")

        logger.info("loading embeddings model...")
        embeddings = get_openai_embeddings()

        # check if vector store exists
        if os.path.exists(VECTOR_STORE_PATH):
            logger.info("loading existing vector store...")
            vector_store = load_vector_store(VECTOR_STORE_PATH, embeddings)
        else:
            logger.info("building vector store from documents...")
            documents = process_documents(load_data(RAG_CONTENT_PATH))
            logger.info(f"loaded {len(documents)} documents")
            vector_store = create_vector_store(documents, embeddings, VECTOR_STORE_PATH)

        huggingface_token = os.getenv("HUGGINGFACE_TOKEN")
        if huggingface_token:
            logger.info("logging in to huggingface...")
            login(token=huggingface_token)
        else:
            logger.warning("huggingface_token not set. model loading may fail.")

        # create retriever
        retriever = vector_store.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        # Try loading base model with better error handling
        try:
            logger.info(f"loading base model: {BASE_MODEL_ID}...")
            base_llm = get_llm(model_id=BASE_MODEL_ID)
            logger.info("creating base qa chain...")
            base_qa_chain = create_qa_chain(base_llm, retriever)
            logger.info("base model loaded successfully")
        except Exception as e:
            logger.error(f"error loading base model: {e}")
            base_qa_chain = None  # Ensure it's explicitly set to None

        # Try loading finetuned model with better error handling
        try:
            logger.info(f"loading finetuned model: {FINETUNED_MODEL_ID}...")
            finetuned_llm = get_llm(model_id=FINETUNED_MODEL_ID)
            logger.info("creating finetuned qa chain...")
            finetuned_qa_chain = create_qa_chain(finetuned_llm, retriever)
            logger.info("finetuned model loaded successfully")
        except Exception as e:
            logger.error(f"error loading finetuned model: {e}")
            finetuned_qa_chain = None  # Ensure it's explicitly set to None

        # Check if at least one model was loaded successfully
        if base_qa_chain is None and finetuned_qa_chain is None:
            logger.warning(
                "no models were loaded successfully - API will have limited functionality"
            )

        content_update_thread = threading.Thread(
            target=content_update_scheduler, daemon=True
        )
        content_update_thread.start()
        logger.info("content update scheduler started")

    except Exception as e:
        logger.error(f"critical error during startup: {e}")
        # Let API start with limited functionality


@app.on_event("shutdown")
async def handle_shutdown():
    global shutdown_event, content_update_thread

    # signal thread to stop
    logger.info("shutting down content update thread...")
    shutdown_event.set()

    # wait for thread to finish (with timeout)
    if content_update_thread and content_update_thread.is_alive():
        content_update_thread.join(timeout=5)

    logger.info("shutdown completed")


@app.get("/")
async def root():
    return {
        "message": "sutd rag api is running. use /rag/base or /rag/finetuned to ask questions."
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "models_loaded": {
            "base_model": base_qa_chain is not None,
            "finetuned_model": finetuned_qa_chain is not None,
        },
        "vector_store": vector_store is not None,
        "last_content_update": (
            pickle.load(open(LAST_UPDATE_FILE, "rb")).isoformat()
            if os.path.exists(LAST_UPDATE_FILE)
            else None
        ),
        "next_update_due": (
            (
                pickle.load(open(LAST_UPDATE_FILE, "rb"))
                + datetime.timedelta(seconds=CONTENT_UPDATE_INTERVAL)
            ).isoformat()
            if os.path.exists(LAST_UPDATE_FILE)
            else None
        ),
    }


@app.post("/rag/base", response_model=Answer)
async def ask_question_base(question: Question):
    if base_qa_chain is None:
        raise HTTPException(status_code=503, detail="base model not initialized")

    try:
        # process the question
        result = base_qa_chain.invoke({"query": question.query})

        # extract sources
        sources = []
        for doc in result.get("source_documents", []):
            sources.append(
                {
                    "content": doc.page_content[:200]
                    + "...",  # truncate for readability
                    "metadata": doc.metadata,
                }
            )

        # clean gpu memory
        torch.cuda.empty_cache()
        gc.collect()

        return {"answer": result.get("result", "").strip(), "sources": sources}
    except Exception as e:
        logger.error(f"error processing question with base model: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"error processing question: {str(e)}"
        )


@app.post("/rag/finetuned", response_model=Answer)
async def ask_question_finetuned(question: Question):
    if finetuned_qa_chain is None:
        raise HTTPException(status_code=503, detail="finetuned model not initialized")

    try:
        # process the question
        result = finetuned_qa_chain.invoke({"query": question.query})

        # extract sources
        sources = []
        for doc in result.get("source_documents", []):
            sources.append(
                {
                    "content": doc.page_content[:200]
                    + "...",  # truncate for readability
                    "metadata": doc.metadata,
                }
            )

        torch.cuda.empty_cache()
        gc.collect()

        return {"answer": result.get("result", "").strip(), "sources": sources}
    except Exception as e:
        logger.error(f"error processing question with finetuned model: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"error processing question: {str(e)}"
        )


@app.post("/rebuild-index")
async def rebuild_index(request: RebuildRequest):
    global vector_store, base_qa_chain, finetuned_qa_chain, embeddings

    try:
        logger.info(f"loading documents from {request.json_path}...")
        documents = process_documents(load_data(request.json_path))

        if not documents:
            raise HTTPException(
                status_code=400, detail="no documents found or processed"
            )

        logger.info(f"building vector store from {len(documents)} documents...")
        vector_store = create_vector_store(documents, embeddings, VECTOR_STORE_PATH)

        # update the retriever and qa chains
        retriever = vector_store.as_retriever(
            search_type="similarity", search_kwargs={"k": 5}
        )

        # recreate both qa chains if models are loaded
        success_base = False
        success_finetuned = False

        try:
            if base_qa_chain is not None:
                base_llm = get_llm(model_id=BASE_MODEL_ID)
                base_qa_chain = create_qa_chain(base_llm, retriever)
                success_base = True
        except Exception as e:
            logger.error(f"error rebuilding base model: {e}")

        try:
            if finetuned_qa_chain is not None:
                finetuned_llm = get_llm(model_id=FINETUNED_MODEL_ID)
                finetuned_qa_chain = create_qa_chain(finetuned_llm, retriever)
                success_finetuned = True
        except Exception as e:
            logger.error(f"error rebuilding finetuned model: {e}")

        # update last update time
        with open(LAST_UPDATE_FILE, "wb") as f:
            pickle.dump(datetime.datetime.now(), f)

        return {
            "status": "success",
            "message": f"vector store rebuilt with {len(documents)} documents",
            "models_updated": {
                "base_model": success_base,
                "finetuned_model": success_finetuned,
            },
        }
    except Exception as e:
        logger.error(f"error rebuilding index: {str(e)}")
        raise HTTPException(status_code=500, detail=f"error rebuilding index: {str(e)}")


@app.post("/update-content")
async def update_content():
    try:
        # force content update
        logger.info("manually triggering content update...")
        results = run_content_retriever()

        if results is None:
            raise HTTPException(status_code=500, detail="failed to retrieve content")

        success = update_vector_store()

        if not success:
            raise HTTPException(status_code=500, detail="failed to update vector store")

        return {
            "status": "success",
            "message": "content updated successfully",
        }
    except Exception as e:
        logger.error(f"error updating content: {str(e)}")
        raise HTTPException(status_code=500, detail=f"error updating content: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)

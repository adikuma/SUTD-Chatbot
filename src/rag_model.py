import torch
from langchain.llms import HuggingFacePipeline
from transformers import pipeline
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

def get_llm(model_id="meta-llama/Llama-3.2-3B-Instruct", device=0, max_new_tokens=128):
    # load a huggingface model and create a langchain pipeline
    llm = HuggingFacePipeline.from_model_id(
        model_id=model_id,
        task="text-generation",
        device=device,
        pipeline_kwargs={"max_new_tokens": max_new_tokens},
    ).bind(skip_prompt=True)
    
    return llm

def get_qa_prompt():
    prompt_template = """
    Use the following pieces of context to answer the question at the end. Please follow these rules:
    1. If you don't know the answer, don't try to make up an answer. Just say, "I can't find the final answer."
    2. If you find the answer, write it in a concise way with no more than five sentences.
    3. Do not add any extra information beyond what is supported by the context.

    {context}

    Question: {question}

    Answer:
    """
    
    return PromptTemplate(
        template=prompt_template, 
        input_variables=["context", "question"]
    )

def create_qa_chain(llm, retriever, chain_type="stuff"):
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type=chain_type,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": get_qa_prompt()}
    )
    
    return qa_chain
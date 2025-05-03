import os
from typing import List
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain.embeddings.base import Embeddings

def create_vector_store(documents: List[Document], embeddings: Embeddings, save_path: str = None):
    vector_store = FAISS.from_documents(documents, embeddings)
    
    if save_path:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        vector_store.save_local(save_path)
        print(f"Vector store saved to {save_path}")
    
    return vector_store

def load_vector_store(load_path: str, embeddings: Embeddings):
    # load an existing vector store from disk
    if not os.path.exists(load_path):
        raise FileNotFoundError(f"Vector store not found at {load_path}")
    
    vector_store = FAISS.load_local(
        load_path, 
        embeddings, 
        allow_dangerous_deserialization=True
    )
    
    return vector_store
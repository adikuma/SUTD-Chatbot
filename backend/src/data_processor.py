import json
import re
from typing import List, Dict, Any
from langchain_core.documents import Document

def extract_all_internal_urls(text_content):
    # extract and identify all internal urls from text content
    internal_urls = []
    link_pattern = r'\[([^\]]+)\]\((https?://[^)]+)\)'
    matches = re.findall(link_pattern, text_content)

    for text, url in matches:
        if 'sutd.edu.sg' in url:
            internal_urls.append({
                'text': text,
                'url': url
            })
    return internal_urls

def extract_pillar(title, url):
    # determine which academic pillar the document belongs to
    pillars = ["ISTD", "ESD", "EPD", "ASD", "DAI", "HASS", "SMT"]
    for pillar in pillars:
        if pillar in title or pillar.lower() in url.lower():
            return pillar
    return "General"

def load_data(json_path: str) -> List[Dict[str, Any]]:
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading data from {json_path}: {e}")
        return []

def process_documents(json_data: List[Dict[str, Any]]) -> List[Document]:
    # convert raw json data into langchain document objects
    documents = []
    
    for item in json_data:
        content = item.get("text_content", "") or item.get("content", "") or item.get("markdown", "")
        if not content or not content.strip():
            continue
            
        title = item.get("title", "")
        url = item.get("url", "")
        description = item.get("description", "")
        pillar = extract_pillar(title, url)
        internal_urls = extract_all_internal_urls(content)
        
        #create metadata for retrieval context
        metadata = {
            "title": title,
            "url": url,
            "description": description,
            "source": url,
            "pillar": pillar,
            "internal_urls": str(internal_urls)  # convert to string for faiss compatibility
        }
        
        # create document object
        doc = Document(page_content=content, metadata=metadata)
        documents.append(doc)
        
    return documents
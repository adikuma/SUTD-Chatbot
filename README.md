# SUTD RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot for Singapore University of Technology and Design (SUTD) that uses the latest information from the university website to answer student questions.

## Project Structure

```
BYTEUS/
├── data/
│   ├── content_retriever.py         # Web crawler for SUTD website
│   ├── datasets/                    # Dataset generation utilities
│   │   └── utils.py                 # Topic, question and answer generation
│   └── rag_content/                 # JSON files from crawled content
├── finetuning/
│   ├── finetune.py                  # Core finetuning implementation
│   ├── generate_dataset.py          # Dataset generation script
│   ├── train.py                     # CLI for model finetuning
│   └── README.md                    # Finetuning documentation
├── src/
│   ├── data_processor.py            # Process RAG content
│   ├── embeddings.py                # Embedding models
│   ├── rag_model.py                 # RAG implementation
│   ├── test_model.py                # Model testing utilities
│   └── vector_store.py              # Vector database management
├── vector_store/                    # FAISS vector database
├── main.py                          # FastAPI application
└── requirements.txt                 # Dependencies
```

## Setup

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Create a `.env` file with the following environment variables:

```
GOOGLE_GENAI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_TOKEN=your_huggingface_token
HUGGINGFACE_USERNAME=your_huggingface_username
```

## Complete Workflow

The SUTD RAG chatbot has three main components:

1. **Content Retrieval**: Crawl the SUTD website to gather information
2. **Dataset Generation & Finetuning**: Create QA dataset and finetune a language model
3. **RAG API**: Run API server with both base and finetuned models + RAG

### Step 1: Retrieve Content

First, run the content retriever to crawl the SUTD website:

```bash
python data/content_retriever.py
```

This will:
- Crawl the SUTD website starting from the homepage
- Extract content from each page
- Save the content as JSON files in `data/rag_content/`
- Create a master file `data/rag_content/rag_data.json`

### Step 2: Generate Dataset & Finetune Model

Generate a question-answer dataset:

```bash
python finetuning/generate_dataset.py --topics 20 --questions-per-topic 10
```

This will:
- Generate 20 topics related to university concerns
- Create 10 questions per topic
- Generate answers for each question
- Save the dataset to `data/datasets/` as CSV files
- Push the dataset to HuggingFace as `{username}/sutd_qa_dataset`

Next, finetune the model on this dataset:

```bash
python finetuning/train.py --base-model meta-llama/Llama-3.2-1B --epochs 3
```

This will:
- Download the base model
- Finetune it on the dataset using PEFT/LoRA
- Save the model to `finetuning/output/`
- Push the model to HuggingFace as `{username}/sutd_rag_chatbot`

### Step 3: Run the RAG API

Start the FastAPI server:

```bash
python main.py
```

The server will:
- Create or load the vector store from `data/rag_content/rag_data.json`
- Load both base and finetuned models
- Start a background thread to update content weekly
- Expose endpoints for question answering

## API Endpoints

- `GET /`: API information
- `GET /health`: System health check
- `POST /rag/base`: Ask a question using the base model with RAG
- `POST /rag/finetuned`: Ask a question using the finetuned model with RAG
- `POST /update-content`: Manually trigger content update
- `POST /rebuild-index`: Rebuild the vector store

## Features

- Automatic weekly content updates
- Vector database for efficient retrieval
- Both base and finetuned language models
- Detailed logging
- Quantized models for better performance
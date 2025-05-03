# SUTD RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot for Singapore University of Technology and Design (SUTD) that uses the latest information from the university website to answer student questions.

## Project Structure

```
  BYTEUS/
  ├── README.md
  ├── backend/
  │   ├── data/
  │   │   ├── content_retriever.py
  │   │   ├── datasets/
  │   │   │   ├── test.csv
  │   │   │   └── train.csv
  │   │   ├── generate_dataset.py
  │   │   ├── last_update.pickle
  │   │   └── rag_content/
  │   │       └── rag_data.json
  │   ├── finetuning/
  │   │   ├── finetune.log
  │   │   ├── finetune.py
  │   │   ├── results/
  │   │   ├── test.py
  │   │   ├── train.py
  │   │   └── utils.py
  │   ├── main.py
  │   ├── rag_api.log
  │   ├── rag_content/
  │   ├── requirements.txt
  │   ├── src/
  │   │   ├── __init__.py
  │   │   ├── data_processor.py
  │   │   ├── embeddings.py
  │   │   ├── rag_model.py
  │   │   └── vector_store.py
  │   └── vector_store/
  │       └── faiss_index/
  ├── frontend/
  │   ├── README.md
  │   ├── src/
  │   │   ├── App.tsx
  │   │   └── components/
  │   ├── package.json
  │   └── other frontend files
  └── venv/
```

## Setup

1. Install dependencies:

```bash
pip install -r backend/requirements.txt
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
python backend/data/content_retriever.py
```

This will:

- Crawl the SUTD website starting from the homepage
- Extract content from each page
- Save the content as JSON files in `backend/data/rag_content/`
- Create a master file `backend/data/rag_content/rag_data.json`

### Step 2: Generate Dataset & Finetune Model

Generate a question-answer dataset:

```bash
python backend/finetuning/generate_dataset.py --topics 20 --questions-per-topic 10
```

This will:

- Generate 20 topics related to university concerns
- Create 10 questions per topic
- Generate answers for each question
- Save the dataset to `backend/data/datasets/` as CSV files
- Push the dataset to HuggingFace as `{username}/sutd_qa_dataset`

Next, finetune the model on this dataset:

```bash
python backend/finetuning/train.py --base-model meta-llama/Llama-3.2-1B --epochs 3
```

This will:

- Download the base model
- Finetune it on the dataset using PEFT/LoRA
- Save the model to `backend/finetuning/output/`
- Push the model to HuggingFace as `{username}/sutd_rag_chatbot`

### Step 3: Run the RAG API

Start the FastAPI server:

```bash
python backend/main.py
```

The server will:

- Create or load the vector store from `backend/data/rag_content/rag_data.json`
- Load both base and finetuned models
- Start a background thread to update content weekly
- Expose endpoints for question answering

### Step 4: Run the Frontend

To start the frontend application:

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:

   ```bash
   npm run dev
   ```
3. The application will be available at http://localhost:5173

   - Make sure the backend is running for full functionality
   - You can switch between the base and fine-tuned model using the toggle

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

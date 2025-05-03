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

---


## Technical Details

### RAG Implementation

The backend implements a Retrieval-Augmented Generation (RAG) system that enhances LLM responses with factual information:

1. **Document Processing**:

   - The system extracts and processes content from SUTD website pages
   - `data_processor.py` converts raw JSON data into LangChain Document objects
   - Each document includes metadata (title, URL, academic pillar, etc.) for improved retrieval context
2. **Vector Store**:

   - Uses FAISS (Facebook AI Similarity Search) for efficient similarity searches
   - OpenAI's text-embedding-3-large model creates vector embeddings
   - The `vector_store.py` module handles creation, saving, and loading of the FAISS index
3. **Retrieval**:

   - When a question is received, relevant documents are retrieved using semantic similarity
   - The retriever is configured to return the top 5 most relevant documents
   - Retrieved documents provide the context for LLM response generation
4. **Generation**:

   - The system uses a custom prompt template that instructs the model to:
     - Use only information from the provided context
     - Answer concisely (max 5 sentences)
     - Admit when it doesn't know the answer
   - The LLM generates an answer based on retrieved documents
   - Source documents are tracked and returned alongside the answer
5. **Content Updates**:

   - A background thread periodically checks if content needs updating (weekly)
   - The vector store is automatically rebuilt when new content is available

### Finetuning Architecture

The backend uses Parameter-Efficient Fine-Tuning (PEFT) with LoRA (Low-Rank Adaptation) to adapt the model to the SUTD domain:

1. **Base Model**:

   - Uses meta-llama/Llama-3.2-1B as the foundation model
   - Loaded with 4-bit quantization for memory efficiency
2. **LoRA Configuration**:

   - Targets key model components: q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj
   - Uses rank r=16 and alpha=32 for the low-rank adaptation matrices
   - Small dropout (0.05) for regularization
   - Only trains a fraction of the parameters (~1%) for efficiency
3. **Training Process**:

   - Uses a custom question-answer format for consistency
   - Processes both train and test datasets with consistent tokenization
   - Employs gradient accumulation (8 steps) to handle larger effective batch sizes
   - Applies gradient checkpointing for memory efficiency
   - Uses fp16 precision for faster training
4. **Results**:

   - The finetuned model achieves better performance on SUTD-specific queries
   - Outputs stored in `finetuning/results/` include:
     - Model checkpoints at various stages
     - Metrics tracking performance
     - Generated answers for evaluation
     - Performance comparisons with the base model

import os
import json
import torch
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import gc
from typing import List
from dotenv import load_dotenv
from datasets import load_dataset
from openai import OpenAI
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain_community.llms import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from huggingface_hub import login
from sklearn.metrics.pairwise import cosine_similarity
import evaluate

load_dotenv()

HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
USERNAME = os.getenv("HUGGINGFACE_USERNAME")

client = OpenAI(api_key=OPENAI_API_KEY)
login(token=HUGGINGFACE_TOKEN)

BASE_MODEL_ID = "meta-llama/Llama-3.2-1B"
FINETUNED_MODEL_ID = f"{USERNAME}/sutd_rag_chatbot"

os.makedirs("results", exist_ok=True)

def load_models():
    print(f"loading base model: {BASE_MODEL_ID}...")
    base_tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL_ID)
    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL_ID,
        load_in_8bit=True,
        device_map="auto",
    )
    base_pipe = pipeline(
        "text-generation",
        model=base_model,
        tokenizer=base_tokenizer,
        max_new_tokens=100,
    )
    base_llm = HuggingFacePipeline(pipeline=base_pipe).bind(skip_prompt=True)

    print(f"loading finetuned model: {FINETUNED_MODEL_ID}...")
    ft_tokenizer = AutoTokenizer.from_pretrained(FINETUNED_MODEL_ID)
    ft_model = AutoModelForCausalLM.from_pretrained(
        FINETUNED_MODEL_ID,
        load_in_8bit=True,
        device_map="auto",
    )
    ft_pipe = pipeline(
        "text-generation",
        model=ft_model,
        tokenizer=ft_tokenizer,
        max_new_tokens=100,
    )
    ft_llm = HuggingFacePipeline(pipeline=ft_pipe).bind(skip_prompt=True)

    prompt = PromptTemplate(
        input_variables=["question"],
        template="Question: {question}\nAnswer:"
    )
    llm_base = prompt | base_llm
    llm_finetune = prompt | ft_llm

    return llm_base, llm_finetune

def generate_answers(llm, questions, max_tokens=100):
    answers = []
    for i, question in enumerate(questions):
        print(f"processing question {i+1}/{len(questions)}")
        try:
            answer = llm.invoke(
                question,
                pipeline_kwargs={"max_new_tokens": max_tokens},
            )
            answers.append(answer)
        except Exception as e:
            print(f"error generating answer: {e}")
            answers.append("Error generating response")
        if i % 10 == 0:
            torch.cuda.empty_cache()
            gc.collect()
    return answers

def bleu_scores(responses: List[str], answers: List[str]) -> float:
    bleu = evaluate.load("bleu")
    refs = [[a] for a in answers]
    print("computing corpus-level bleu score...")
    out = bleu.compute(predictions=responses, references=refs)
    return out["bleu"]

def cosine_similarity_score(
    client: OpenAI,
    responses: List[str],
    answers: List[str],
) -> float:
    response_embeddings = []
    for i, resp in enumerate(responses):
        print(f"processing response {i+1}/{len(responses)}")
        emb = client.embeddings.create(
            model="text-embedding-ada-002",
            input=resp,
        ).data[0].embedding
        response_embeddings.append(emb)

    answer_embeddings = []
    for ans in answers:
        emb = client.embeddings.create(
            model="text-embedding-ada-002",
            input=ans,
        ).data[0].embedding
        answer_embeddings.append(emb)

    response_embeddings = np.array(response_embeddings)
    answer_embeddings = np.array(answer_embeddings)
    sims = [
        cosine_similarity(
            [response_embeddings[i]],
            [answer_embeddings[i]],
        )[0][0]
        for i in range(len(response_embeddings))
    ]
    return float(np.mean(sims))

def plot_results(cosine_base, cosine_finetune):
    cosine_impr = (
        (cosine_finetune - cosine_base) / cosine_base * 100
        if cosine_base > 0 else float("inf")
    )

    fig, ax = plt.subplots(figsize=(8, 5))
    models = ["Base", "Fine-tuned"]
    cos_vals = [cosine_base, cosine_finetune]

    ax.bar(models, cos_vals, color=["skyblue", "salmon"])
    ax.set_title("Cosine Similarity")
    ax.text(1, cos_vals[1], f"+{cosine_impr:.1f}%", ha="center", va="bottom")

    plt.tight_layout()
    plt.savefig("results/model_comparison.png")
    plt.show()

    metrics = {
        "cosine_similarity_base": cosine_base,
        "cosine_similarity_finetune": cosine_finetune,
        "cosine_improvement": cosine_impr,
    }
    with open("results/metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)

def main():
    print("starting model evaluation...")
    llm_base, llm_finetune = load_models()

    print(f"loading test data from huggingface: {USERNAME}/sutd_qa_dataset")
    raw_data = load_dataset(f"{USERNAME}/sutd_qa_dataset")
    questions = raw_data["test"]["question"]
    reference_answers = raw_data["test"]["answer"]

    print("\ngenerating answers with base model...")
    base_answers = generate_answers(llm_base, questions)

    print("\ngenerating answers with finetuned model...")
    finetune_answers = generate_answers(llm_finetune, questions)

    results_df = pd.DataFrame({
        "question": questions,
        "reference_answer": reference_answers,
        "base_model_answer": base_answers,
        "finetuned_model_answer": finetune_answers,
    })
    results_df.to_csv("results/generated_answers.csv", index=False)

    print("\ncalculating cosine similarity...")
    cosine_base = cosine_similarity_score(
        client, base_answers, reference_answers
    )
    cosine_finetune = cosine_similarity_score(
        client, finetune_answers, reference_answers
    )

    print("\nresults:")
    print(f"cosine similarity for base model: {cosine_base}")
    print(f"cosine similarity for finetuned model: {cosine_finetune}")

    plot_results(cosine_base, cosine_finetune)

if __name__ == "__main__":
    main()
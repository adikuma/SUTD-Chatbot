import torch
from langchain_community.llms import HuggingFacePipeline
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from transformers import BitsAndBytesConfig
import bitsandbytes


def get_llm(model_id="meta-llama/Llama-3.2-3B-Instruct", device=0, max_new_tokens=100):
    # create the tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    is_finetuned = "adi0308" in model_id
    
    if is_finetuned:
        # for fine-tuned models, load with PEFT configuration
        from peft import PeftModel, PeftConfig

        # first load the base model
        base_model = AutoModelForCausalLM.from_pretrained(
            "meta-llama/Llama-3.2-1B",  # this should be the same base model you fine-tuned from
            device_map=(
                "auto"
                if device == "auto"
                else f"cuda:{device}" if torch.cuda.is_available() else "cpu"
            ),
            torch_dtype=torch.float16,
        )
        model = PeftModel.from_pretrained(base_model, model_id)
    else:
        # for base models, try to use quantization if available
        try:
            # configure 4-bit quantization
            quantization_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_compute_dtype=torch.float16,
                bnb_4bit_quant_type="fp4",
                bnb_4bit_use_double_quant=True,
            )

            model = AutoModelForCausalLM.from_pretrained(
                model_id,
                quantization_config=quantization_config,
                device_map=(
                    "auto"
                    if device == "auto"
                    else f"cuda:{device}" if torch.cuda.is_available() else "cpu"
                ),
                torch_dtype=torch.float16,
            )
        except (ImportError, ModuleNotFoundError):
            # Fall back to regular loading if bitsandbytes is not available
            model = AutoModelForCausalLM.from_pretrained(
                model_id,
                device_map=(
                    "auto"
                    if device == "auto"
                    else f"cuda:{device}" if torch.cuda.is_available() else "cpu"
                ),
                torch_dtype=torch.float16,
            )

    # create pipeline with max_new_tokens
    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=max_new_tokens,
        temperature=0.2,
    )

    # create langchain wrapper
    llm = HuggingFacePipeline(pipeline=pipe).bind(skip_prompt=True)
    return llm


def get_qa_prompt():
    prompt_template = """
    Use the following pieces of context to answer the question at the end. Please follow these rules:
    1. If you don't know the answer, don't try to make up an answer. Just say, "I can't find the final answer."
    2. If you find the answer, write it in a concise way with no more than four sentences.
    3. Do not add any extra information beyond what is supported by the context.
    {context}
    
    Question: {question}
    
    Answer:
    """

    return PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )


def create_qa_chain(llm, retriever, chain_type="stuff"):
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type=chain_type,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": get_qa_prompt()},
    )

    return qa_chain

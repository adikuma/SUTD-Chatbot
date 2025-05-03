import os
import pandas as pd
import torch
from dotenv import load_dotenv
from datasets import Dataset, load_dataset
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling,
    BitsAndBytesConfig,
)
from peft import prepare_model_for_kbit_training, LoraConfig, get_peft_model, PeftModel
from sklearn.model_selection import train_test_split
from huggingface_hub import login
import logging

# configure logging for the finetuning process
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("finetune.log"), logging.StreamHandler()],
)

# load environment variables for api keys and usernames
load_dotenv()

HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
USERNAME = os.getenv("HUGGINGFACE_USERNAME")
OUTPUT_MODEL = f"{USERNAME}/sutd_rag_chatbot"

# login to huggingface for pushing models
login(token=HUGGINGFACE_TOKEN)


def prepare_qa_dataset(dataset_id):
    try:
        logging.info(f"loading dataset from huggingface hub: {dataset_id}")
        dataset = load_dataset(dataset_id)

        # format the data as question-answer pairs for model consumption
        def format_dataset(split):
            formatted_texts = []

            # access the question and answer fields in the dataset
            questions = dataset[split]["question"]
            answers = dataset[split]["answer"]

            for q, a in zip(questions, answers):
                formatted_text = f"Question: {q}\nAnswer: {a}"
                formatted_texts.append({"text": formatted_text})

            return Dataset.from_pandas(pd.DataFrame(formatted_texts))

        # process both train and test splits
        train_dataset = format_dataset("train")
        test_dataset = format_dataset("test")

        logging.info(
            f"successfully prepared dataset: {len(train_dataset)} train examples, {len(test_dataset)} test examples"
        )
        return train_dataset, test_dataset

    except Exception as e:
        logging.error(f"error preparing datasets from huggingface: {e}")
        raise e


def tokenize_function(examples, tokenizer, max_length=512):
    return tokenizer(
        examples["text"], truncation=True, max_length=max_length, padding="max_length"
    )


def finetune_model(
    base_model="meta-llama/Llama-3.2-1B",
    dataset_id=None,
    output_dir="finetune_output",
    num_train_epochs=3,
    learning_rate=2e-4,
    warmup_steps=500,
    weight_decay=0.01,
    max_grad_norm=1.0,
    push_to_hub=True,
):
    try:
        # create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)

        # ensure dataset_id is provided
        if not dataset_id:
            dataset_id = f"{USERNAME}/sutd_qa_dataset"
            logging.info(f"using default dataset id: {dataset_id}")

        #prepare datasets
        logging.info("preparing datasets...")
        train_dataset, test_dataset = prepare_qa_dataset(dataset_id)

        # load tokenizer and model
        logging.info(f"loading base model: {base_model}")
        tokenizer = AutoTokenizer.from_pretrained(base_model)
        tokenizer.pad_token = tokenizer.eos_token

        # using bitsandbytes for quantization (4-bit)
        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf8",
            bnb_4bit_compute_dtype=torch.float16,
        )

        #  load model with quantization
        model = AutoModelForCausalLM.from_pretrained(
            base_model,
            quantization_config=bnb_config,
            device_map="auto",
            torch_dtype=torch.float16,
        )

        #  prepare model for k-bit training
        model = prepare_model_for_kbit_training(model)

        #  define lora configuration for efficient fine-tuning
        lora_config = LoraConfig(
            r=16,
            lora_alpha=32,
            target_modules=[
                "q_proj",
                "k_proj",
                "v_proj",
                "o_proj",
                "gate_proj",
                "up_proj",
                "down_proj",
            ],
            lora_dropout=0.05,
            bias="none",
            task_type="CAUSAL_LM",
        )

        model = get_peft_model(model, lora_config)

        model.print_trainable_parameters()

        # tokenize datasets
        logging.info("tokenizing datasets...")
        tokenized_train = train_dataset.map(
            lambda examples: tokenize_function(examples, tokenizer),
            batched=True,
            remove_columns=["text"],
        )

        tokenized_test = test_dataset.map(
            lambda examples: tokenize_function(examples, tokenizer),
            batched=True,
            remove_columns=["text"],
        )

        data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

        # training arguments
        training_args = TrainingArguments(
            output_dir=output_dir,
            num_train_epochs=num_train_epochs,
            per_device_train_batch_size=4,
            gradient_accumulation_steps=8,
            learning_rate=learning_rate,
            warmup_steps=warmup_steps,
            weight_decay=weight_decay,
            max_grad_norm=max_grad_norm,
            logging_steps=10,
            evaluation_strategy="epoch",
            save_strategy="epoch",
            fp16=True,
            push_to_hub=push_to_hub,
            hub_model_id=OUTPUT_MODEL,
            hub_token=HUGGINGFACE_TOKEN,
            report_to="tensorboard",
            gradient_checkpointing=True,
        )

        trainer = Trainer(
            model=model,
            args=training_args,
            train_dataset=tokenized_train,
            eval_dataset=tokenized_test,
            data_collator=data_collator,
        )

        # train the model
        logging.info("starting training...")
        trainer.train()

        # save the model
        logging.info("saving model...")
        trainer.save_model(output_dir)

        if push_to_hub:
            logging.info(f"pushing model to hub: {OUTPUT_MODEL}")
            trainer.push_to_hub()

        logging.info("training completed successfully!")
        return True

    except Exception as e:
        logging.error(f"error during finetuning: {e}")
        return False

if __name__ == "__main__":
    logging.info("starting finetuning process...")
    finetune_model()

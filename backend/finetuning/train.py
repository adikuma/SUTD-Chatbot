import os
from dotenv import load_dotenv
from huggingface_hub import login
import logging
from finetune import finetune_model

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("results/training.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("train")
load_dotenv()

def main():
    base_model = "meta-llama/Llama-3.2-1B"
    username = os.getenv("HUGGINGFACE_USERNAME")
    dataset = f"{username}/qa_dataset" if username else None
    output_dir = "results/outputs"
    epochs = 5
    learning_rate = 2e-4
    push_to_hub = True

    token = os.getenv("HUGGINGFACE_TOKEN")
    if not token:
        logger.error("HUGGINGFACE_TOKEN environment variable not set")
        return
    login(token=token)
    if not dataset:
        logger.error(
            "No dataset specified and HUGGINGFACE_USERNAME not set"
        )
        return
    logger.info(f"Starting fine-tuning of {base_model} with dataset {dataset}")
    result = finetune_model(
        base_model=base_model,
        dataset_id=dataset,
        output_dir=output_dir,
        num_train_epochs=epochs,
        learning_rate=learning_rate,
        push_to_hub=push_to_hub,
    )
    if result:
        logger.info("Fine-tuning completed successfully!")
    else:
        logger.error("Fine-tuning failed. Check logs for details.")

if __name__ == "__main__":
    main()

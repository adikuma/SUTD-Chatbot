import os
import sys
import time
from dotenv import load_dotenv
import logging
import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset, DatasetDict
from utils import generate_topics, generate_questions, generate_answer

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("results/generate_dataset.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger("generate_dataset")

load_dotenv()

def process_dataset(csv_file, output_file, api_key):
    try:
        df = pd.read_csv(output_file)
        print(f"resuming from existing file: {output_file}")
    except FileNotFoundError:
        df = pd.read_csv(csv_file)
        df['answer'] = None

    requests_made = 0
    rate_limit = 12
    total = len(df)
    start_time = time.time()
    processed_rows = 0

    for index, row in df.iterrows():
        if pd.notna(row.get('answer')):
            processed_rows += 1
            continue

        question = row['question']
        now = time.time()
        elapsed = now - start_time
        if requests_made >= rate_limit:
            to_wait = 60 - elapsed
            if to_wait > 0:
                print(f"rate limit reached, sleeping {to_wait:.2f}s")
                time.sleep(to_wait)
            requests_made = 0
            start_time = time.time()

        try:
            answer_resp = generate_answer(api_key, question)
            df.at[index, 'answer'] = answer_resp.get("answer", "")
            if processed_rows % 5 == 0:
                df.to_csv(output_file, index=False)
            requests_made += 1
            processed_rows += 1
            print(f"processing {csv_file}: {processed_rows}/{total}")
        except Exception as e:
            print(f"error processing question: {question}")
            print(f"error: {e}")
            df.to_csv(output_file, index=False)
            if "429" in str(e) or "exceeded" in str(e).lower() or "ResourceExhausted" in str(e):
                wait = 120
                print(f"quota exceeded, waiting {wait}s")
                time.sleep(wait)
                requests_made = 0
                start_time = time.time()
            continue

    df.to_csv(output_file, index=False)
    print(f"finished writing {output_file}")
    return df

def generate_dataset(
    num_topics=20,
    questions_per_topic=10,
    output_dir="datasets",
    test_size=0.2,
    seed=42
):
    api_key = os.getenv("GOOGLE_GENAI_API_KEY")
    username = os.getenv("HUGGINGFACE_USERNAME")
    if not api_key or not username:
        logger.error("GOOGLE_GENAI_API_KEY or HUGGINGFACE_USERNAME not set")
        return False

    os.makedirs(output_dir, exist_ok=True)

    logger.info(f"generating {num_topics} topics")
    topics = generate_topics(api_key, num=num_topics)
    logger.info(f"topics: {topics}")

    logger.info(f"generating {questions_per_topic} questions per topic")
    records = []

    # simple rate‐limit for question generation
    q_requests = 0
    q_limit = 15
    q_start = time.time()

    for i, topic in enumerate(topics):
        now = time.time()
        elapsed = now - q_start
        if q_requests >= q_limit:
            if elapsed < 60:
                wait = 60 - elapsed
                logger.info(f"question rate limit reached, sleeping {wait:.2f}s")
                time.sleep(wait)
            q_requests = 0
            q_start = time.time()

        logger.info(f"topic {i+1}/{len(topics)}: {topic}")
        qd = generate_questions(api_key, topic, num=questions_per_topic)
        q_requests += 1

        qs = qd.get(topic, [])
        if not qs:
            logger.warning(f"no questions for topic: {topic}")
            continue

        for q in qs:
            records.append({"topic": topic, "question": q})

    df = pd.DataFrame(records)
    train_df, test_df = train_test_split(df, test_size=test_size, random_state=seed)

    train_csv = os.path.join(output_dir, "train.csv")
    test_csv = os.path.join(output_dir, "test.csv")
    train_df.to_csv(train_csv, index=False)
    test_df.to_csv(test_csv, index=False)
    logger.info(f"saved train/test csv to {output_dir}")

    print("generating answers for training dataset")
    train_with_answers = process_dataset(train_csv, train_csv, api_key)
    print("generating answers for testing dataset")
    test_with_answers = process_dataset(test_csv, test_csv, api_key)

    train_ds = Dataset.from_pandas(train_with_answers)
    test_ds = Dataset.from_pandas(test_with_answers)
    ds_dict = DatasetDict({"train": train_ds, "test": test_ds})

    logger.info(f"pushing dataset to HuggingFace as {username}/qa_dataset")
    ds_dict.push_to_hub(f"{username}/qa_dataset")
    logger.info("done")
    return True

def main():
    success = generate_dataset()
    if success:
        print("dataset generation completed successfully")
    else:
        print("dataset generation failed")
        sys.exit(1)

if __name__ == "__main__":
    main()

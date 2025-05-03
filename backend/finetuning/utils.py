import os
import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import JsonOutputParser

def get_genai_model(
    api_key: str,
    model: str = "gemini-2.0-flash-lite",
    temp: float = 0.6
) -> ChatGoogleGenerativeAI:
    return ChatGoogleGenerativeAI(
        google_api_key=api_key,
        model=model,
        temperature=temp,
        convert_system_message_to_human=True,
    )

def generate_topics(GOOGLE_GENAI_API_KEY, num=20):
    class TopicsList(BaseModel):
        topics: List[str] = Field(
            description=f"A list of {num} topics that prospective students might care about",
            min_length=num,
            max_length=num
        )
    os.makedirs("data", exist_ok=True)
    filename = os.path.join("data", "topics.json")
    parser = JsonOutputParser(pydantic_object=TopicsList)
    prompt = PromptTemplate(
        template=(
            "List out topics a prospective student might be interested in when "
            "choosing a university. Think of real concerns such as academic "
            "quality, campus life, tuition, social environment, and career "
            "opportunities.\n\n{format_instructions}\n\n{input}"
        ),
        input_variables=["input"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    input_prompt = (
        f"Please list exactly {num} topics that capture what prospective "
        "students care about when choosing a university like SUTD."
    )
    model = get_genai_model(GOOGLE_GENAI_API_KEY, temp=0.8)
    chain = prompt | model | parser
    topics: List[str] = []
    try:
        response = chain.invoke({"input": input_prompt})
        topics = response["topics"]
    except Exception as e:
        print(f"error generating topics: {e}")
    return topics

def generate_questions(GOOGLE_GENAI_API_KEY, topic, num=10):
    class Questions(BaseModel):
        questions: List[str] = Field(
            description=f"A list of {num} questions about a specific topic",
            min_length=num,
            max_length=num
        )
    parser = JsonOutputParser(pydantic_object=Questions)
    prompt = PromptTemplate(
        template=(
            "Imagine you are a prospective university student wanting to know "
            "more about a specific aspect. For the topic provided, generate "
            "exactly {num_questions} questions that you might naturally ask. "
            "Topic: {topic}\n\n{format_instructions}"
        ),
        input_variables=["topic", "num_questions"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    model = get_genai_model(GOOGLE_GENAI_API_KEY, temp=0.4)
    chain = prompt | model | parser
    data: Dict[str, Any] = {}
    try:
        response = chain.invoke({"topic": topic, "num_questions": num})
        data[topic] = response["questions"]
    except Exception as e:
        print(f"error generating questions for topic '{topic}': {e}")
    return data

def generate_answer(GOOGLE_GENAI_API_KEY, question):
    class Answer(BaseModel):
        answer: str = Field(description="The answer to the question")
    parser = JsonOutputParser(pydantic_object=Answer)
    prompt = PromptTemplate(
        template=(
            "Answer the following question in a friendly, clear, and brief manner, "
            "as though you are advising a prospective student. Use simple language "
            "and get straight to the point.\n\n{format_instructions}\n\n{question}"
        ),
        input_variables=["question"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    model = get_genai_model(GOOGLE_GENAI_API_KEY, temp=0.3)
    chain = prompt | model | parser
    return chain.invoke({"question": question})

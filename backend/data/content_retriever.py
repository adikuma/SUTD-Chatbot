import json
from playwright.sync_api import sync_playwright
from readability import Document as ReadabilityDocument
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import time
import logging
import os
import re
from dotenv import load_dotenv
from collections import deque
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field

load_dotenv()

# configuration
GOOGLE_GENAI_API_KEY = os.getenv("GOOGLE_GENAI_API_KEY")
if not GOOGLE_GENAI_API_KEY:
    logging.error("fatal error: GOOGLE_GENAI_API_KEY environment variable not set.")
    exit(1)

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

# crawler settings
SEED_URL = "https://www.sutd.edu.sg/"  # starting point for crawling
OUTPUT_FOLDER = "rag_content"
OUTPUT_JSON_FILE = os.path.join(OUTPUT_FOLDER, "rag_data.json")
MAX_PAGES = 100 # #TODO: max limit on number of pages to crawl  (can be adjusted later)
DELAY_BETWEEN_REQUESTS = 4  # respecting gemini's 15 req/min rate limit
PLAYWRIGHT_TIMEOUT = 60000
DOMAIN_RESTRICTION = "sutd.edu.sg"  # only crawl urls within this domain

# create output folder if it doesn't exist
if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)


class TextContent(BaseModel):
    content: str = Field(
        description="the main content extracted from the html as clean, readable paragraphs of plain text"
    )


def sanitize_filename(filename):
    sanitized = re.sub(r'[\\/*?:"<>|]', "", filename)
    sanitized = sanitized.replace(" ", "_")
    return sanitized[:200]


def detect_pillar_from_url(url, title):
    # extract pillar information from url or title
    pillars = {
        "istd": "Information Systems Technology and Design",
        "epd": "Engineering Product Development",
        "esd": "Engineering Systems and Design",
        "asd": "Architecture and Sustainable Design",
        "dai": "Design and Artificial Intelligence",
        "hass": "Humanities, Arts and Social Sciences",
    }

    for code, name in pillars.items():
        if code.lower() in url.lower() or code.lower() in title.lower():
            return {"code": code.upper(), "name": name}

    return None


def is_valid_url(url, base_domain):
    try:
        parsed = urlparse(url)
        if base_domain not in parsed.netloc:
            return False

        skip_extensions = [
            ".pdf",
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".css",
            ".js",
            ".xml",
            ".ico",
            ".doc",
            ".docx",
        ]
        if any(parsed.path.endswith(ext) for ext in skip_extensions):
            return False

        return True
    except:
        return False


# initialize gemini
genai.configure(api_key=GOOGLE_GENAI_API_KEY)

# setup parser for structured output
parser = JsonOutputParser(pydantic_object=TextContent)

# setup gemini with langchain
model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=GOOGLE_GENAI_API_KEY,
    temperature=0.2,
    convert_system_message_to_human=True,
    max_output_tokens=8192,
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "you are a content extractor for a university chatbot. extract only the main content from the html as clean, readable paragraphs of plain text. remove all navigation menus, headers, footers, and unnecessary elements. preserve all important information including:\n"
            "- dates and deadlines\n"
            "- contact information\n"
            "- admission requirements\n"
            "- course details\n"
            "- program descriptions\n"
            "- faculty information\n\n"
            "format the output as simple paragraphs with proper spacing between them. maintain lists in their original structure. do not add any commentary.\n\n"
            "{format_instructions}",
        ),
        (
            "human",
            "extract the main content from this webpage:\n\n```html\n{html_snippet}\n```",
        ),
    ]
)

chain = prompt | model | parser


def crawl_website():
    processed_urls = set()
    url_queue = deque([SEED_URL])
    output_data = []
    requests_made = 0
    rate_limit = 10  # reduced further due to larger outputs
    start_time = time.time()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(user_agent="Mozilla/5.0 SUTD Chatbot Web Crawler")
        page = context.new_page()

        while url_queue and len(processed_urls) < MAX_PAGES:
            current_url = url_queue.popleft()

            if current_url in processed_urls:
                continue

            logging.info(
                f"processing {len(processed_urls)+1}/{MAX_PAGES}: {current_url}"
            )

            try:
                # visit the page
                page.goto(
                    current_url, wait_until="networkidle", timeout=PLAYWRIGHT_TIMEOUT
                )
                html_content = page.content()
                current_title = page.title()

                # extract links for crawling
                links = page.evaluate(
                    """
                    () => {
                        const anchors = Array.from(document.querySelectorAll('a[href]'));
                        return anchors.map(a => a.href);
                    }
                """
                )

                # process the current page
                if html_content:
                    try:
                        # extract readable content
                        readable_doc = ReadabilityDocument(html_content)
                        article_title = current_title or readable_doc.short_title()
                        meta_description = ""

                        # try to extract meta description
                        try:
                            soup = BeautifulSoup(html_content, "html.parser")
                            meta_desc = soup.find("meta", attrs={"name": "description"})
                            if meta_desc:
                                meta_description = meta_desc.get("content", "")
                        except:
                            pass

                        # rate limit handling
                        current_time = time.time()
                        elapsed_time = current_time - start_time
                        if requests_made >= rate_limit:
                            remaining_time = 60 - elapsed_time
                            if remaining_time > 0:
                                logging.info(
                                    f"rate limit: sleeping for {remaining_time:.2f} seconds..."
                                )
                                time.sleep(remaining_time)
                            requests_made = 0
                            start_time = time.time()

                        # process with gemini
                        response = chain.invoke(
                            {
                                "html_snippet": html_content,
                                "format_instructions": parser.get_format_instructions(),
                            }
                        )

                        requests_made += 1

                        # get the extracted content
                        extracted_text = response.get("content", "")

                        # detect pillar information
                        pillar_info = detect_pillar_from_url(current_url, article_title)

                        # build enhanced metadata
                        path_segments = urlparse(current_url).path.strip("/").split("/")

                        # create rag-optimized item with simplified structure
                        item = {
                            "url": current_url,
                            "title": article_title,
                            "description": meta_description,
                            "pillar": pillar_info,
                            "path_structure": path_segments,
                            "content": extracted_text,
                            "crawl_date": time.strftime("%Y-%m-%d"),
                        }

                        if extracted_text and extracted_text.strip():
                            output_data.append(item)

                            # save individual json file
                            safe_filename = sanitize_filename(article_title) + ".json"
                            with open(
                                os.path.join(OUTPUT_FOLDER, safe_filename),
                                "w",
                                encoding="utf-8",
                            ) as f:
                                json.dump(item, f, indent=2, ensure_ascii=False)

                            # save main json after every 5 successful extractions
                            if len(output_data) % 5 == 0:
                                with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as f:
                                    json.dump(
                                        output_data, f, indent=2, ensure_ascii=False
                                    )
                                logging.info(
                                    f"saved progress: {len(output_data)} pages processed"
                                )

                    except Exception as e:
                        logging.error(
                            f"error processing content for {current_url}: {e}"
                        )

                # add new links to the queue
                for link in links:
                    if (
                        is_valid_url(link, DOMAIN_RESTRICTION)
                        and link not in processed_urls
                        and link not in url_queue
                    ):
                        url_queue.append(link)

                # mark as processed
                processed_urls.add(current_url)

            except Exception as e:
                logging.error(f"error visiting {current_url}: {e}")

            # respect crawl delay
            time.sleep(DELAY_BETWEEN_REQUESTS)

        browser.close()

    # save all data to json
    if output_data:
        with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        logging.info(f"saved {len(output_data)} pages to {OUTPUT_JSON_FILE}")

    return output_data


if __name__ == "__main__":
    logging.info("starting web crawler...")
    results = crawl_website()
    logging.info(f"crawling complete. processed {len(results)} pages.")

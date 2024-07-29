from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
from nrclex import NRCLex
import spacy
import PyPDF2

nlp = spacy.load("en_core_web_sm")

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EntitiesResponse(BaseModel):
    persons: List[str]
    places: List[str]
    emotions: List[Dict[str, str]]
    pronouns: List[str]

class TextRequest(BaseModel):
    text: str

@app.post('/read-pdf')
async def read_pdf(file: UploadFile = File(...)) -> str:
    reader = PyPDF2.PdfReader(file.file)
    text = ""
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

@app.post('/extract-entities', response_model=EntitiesResponse)
async def extract_entities(request: TextRequest) -> EntitiesResponse:
    doc = nlp(request.text)
    persons = set()
    places = set()
    pronouns = set()

    for token in doc:
        if token.pos_ == "PRON":  # Check if the token is a pronoun
            pronouns.add(token.text.lower()) 

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            persons.add(ent.text)
        elif ent.label_ in {"GPE", "LOC"}:
            places.add(ent.text)

    emotions = NRCLex(request.text).affect_frequencies
    sorted_emotions = sorted(emotions.items(), key=lambda x: x[1], reverse=True)[:5]
    emotion_words = [{'emotion': emotion, 'frequency': freq} for emotion, freq in sorted_emotions]

    return EntitiesResponse(
        persons=list(persons),
        places=list(places),
        emotions=emotion_words,
        pronouns=list(pronouns)
    )

@app.post('/process-pdf/', response_model=EntitiesResponse)
async def process_pdf(file: UploadFile = File(...)):
    text = await read_pdf(file.file)
    result = await extract_entities(TextRequest(text=text))
    return result

# @app.post('/speak')
# async def speak(text: TextRequest):
#     HUME_API_URL = 'https://api.hume.ai/v0/evi'
#     HUME_API_KEY = '0WkbllVumtf4oY2engilGaf667PMxoZcytVI65sIdF5OCWaV'

#     async with httpx.AsyncClient() as client:
#         response = await client.post(
#             HUME_API_URL,
#             json={
#                 'text': text.text,
#                 'voice': 'en-US-Wavenet-F'
#             },
#             headers={
#                 'Authorization': f'Bearer {HUME_API_KEY}',
#                 'Content-Type': 'application/json'
#             }
#         )
#         response.raise_for_status()
#         return response.json()

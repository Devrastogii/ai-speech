# Smart PDF Tool

## Overview

The **Smart PDF Tool** provides a seamless and intelligent way to interact with PDF documents. This tool allows users to upload PDF files, extract text, and gain insights through advanced features such as emotion detection, entity recognition, and text-to-speech conversion.

## Features

- **PDF Upload**: Easily upload PDF files through a clean and simple user interface.
- **Text Extraction**: Extract text from PDF files using PyPDF2.
- **Emotion Detection**: Analyze and detect emotions within the text using advanced NLP techniques.
- **Entity Recognition**: Identify and extract person names, place names, and pronouns using spaCy's entity recognition.
- **Text-to-Speech Conversion**: Convert text to human-like speech for an enhanced reading experience.

## User Interface

We have designed a clean and intuitive user interface to ensure a seamless user experience. Below is a screenshot of the interface:

<img width="959" alt="ai-speech" src="https://github.com/user-attachments/assets/b218cfb8-fb5d-4db2-b64e-1fe94062d716">


## How to Use

1. **Upload a PDF**: Click on the "Upload PDF" button and select the PDF file you wish to upload.
2. **Extract Text**: The tool automatically extracts text from the uploaded PDF.
3. **Analyze Text**: View the extracted text along with detected emotions and identified entities.
4. **Text-to-Speech**: Click on the "Read Aloud" button to hear the text read out loud with human-like speech.

## Screenshots

Here are some screenshots of the Smart PDF Tool in action:

<img width="946" alt="detect-ui" src="https://github.com/user-attachments/assets/ab6d9104-755d-43c4-b8c1-7ab3da1885c9">

## Video Demo

For a detailed demonstration of the Smart PDF Tool, watch our video:

[Video Demo](https://drive.google.com/file/d/1XSn2VNH-Aq3D5KNF42b3QNZA6ONJu1jn/view?usp=sharing)

## Install the required dependencies:
1. pip install fastapi uvicorn pydantic nrclex spacy PyPDF2
2. python -m spacy download en_core_web_sm
3. uvicorn main:app --reload
## Technologies Used
1. Backend: Python, FastAPI
2. Frontend: HTML, CSS, JavaScript
3. Libraries: PyPDF2, spaCy, responsivevoice api

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from models import Faq
from typing import List

app = FastAPI()

faqs = [
    Faq(id=1, question='What is Fruit.ai?', answer='A health manager product'),
    # Add more FAQs here
]

@app.get("/faqs")
async def read_faqs():
    return faqs

@app.get("/faqs/{id}")
async def read_faq(id: int):
    for faq in faqs:
        if faq.id == id:
            return faq
    raise HTTPException(status_code=404, detail="FAQ not found")

@app.post("/faqs")
async def create_faq(faq: Faq):
    faqs.append(faq)
    return faq

@app.put("/faqs/{id}")
async def update_faq(id: int, faq: Faq):
    for i, existing_faq in enumerate(faqs):
        if existing_faq.id == id:
            faqs[i] = faq
            return faq
    raise HTTPException(status_code=404, detail="FAQ not found")

@app.delete("/faqs/{id}")
async def delete_faq(id: int):
    for i, faq in enumerate(faqs):
        if faq.id == id:
            del faqs[i]
            return JSONResponse(status_code=204)
    raise HTTPException(status_code=404, detail="FAQ not found")
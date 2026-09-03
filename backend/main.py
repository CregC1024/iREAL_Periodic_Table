from typing import Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from elements_data import ELEMENTS


class Element(BaseModel):
    number: int
    symbol: str
    name: str
    atomic_mass: float
    category: str
    period: int
    group: Optional[int]
    block: str
    phase: str
    electron_configuration: str
    electronegativity: Optional[float]
    discovered: Optional[int]
    xpos: int
    ypos: int
    summary: str


app = FastAPI(title="Periodic Table API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

_BY_NUMBER = {e["number"]: e for e in ELEMENTS}
_BY_SYMBOL = {e["symbol"].lower(): e for e in ELEMENTS}


@app.get("/api/elements", response_model=list[Element])
def list_elements(
    category: Optional[str] = None,
    phase: Optional[str] = None,
    block: Optional[str] = None,
    q: Optional[str] = Query(None, description="Search by name or symbol"),
):
    result = ELEMENTS
    if category:
        result = [e for e in result if e["category"] == category]
    if phase:
        result = [e for e in result if e["phase"] == phase]
    if block:
        result = [e for e in result if e["block"] == block]
    if q:
        ql = q.lower()
        result = [e for e in result if ql in e["name"].lower() or ql == e["symbol"].lower() or ql == str(e["number"])]
    return result


@app.get("/api/elements/{key}", response_model=Element)
def get_element(key: str):
    element = _BY_NUMBER.get(int(key)) if key.isdigit() else _BY_SYMBOL.get(key.lower())
    if element is None:
        raise HTTPException(status_code=404, detail="Element not found")
    return element


@app.get("/api/categories", response_model=list[str])
def list_categories():
    return sorted({e["category"] for e in ELEMENTS})


@app.get("/api/health")
def health():
    return {"status": "ok"}

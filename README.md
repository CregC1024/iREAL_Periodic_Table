# Interactive Periodic Table

Angular 19 frontend + FastAPI backend.

## Run

```bash
# backend
cd backend && pip install -r requirements.txt && uvicorn main:app --reload --port 8000

# frontend (proxies /api to :8000)
cd frontend && npm install && npm start
```

Open http://localhost:4200. API docs at http://localhost:8000/docs.

## API
- `GET /api/elements?category=&phase=&block=&q=`
- `GET /api/elements/{number|symbol}`
- `GET /api/categories`

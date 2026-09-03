<img width="1707" height="882" alt="Screenshot 2026-09-02 at 11 23 41 PM" src="https://github.com/user-attachments/assets/c64e5053-9052-4ec7-925b-4992bcd03196" />



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

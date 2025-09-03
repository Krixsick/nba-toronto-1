# main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from raptor_team import router as raptors_router
from standings import router as standings_router
app = FastAPI(title="NBA_API", description="NBA team roster API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(raptors_router)
app.include_router(standings_router)
import os
from fastapi import FastAPI, APIRouter
from routes import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",            # For local development
    "http://localhost:3000",       # Frontend on a different port
    "https://wishcraft.ravinath.dev"  # Deployed frontend domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router)

import os
from fastapi import FastAPI, APIRouter
from app.routes import api_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app = FastAPI(redirect_slashes=False)

origins = [
    "http://localhost",            # For local development
    "http://localhost:3000",       # Frontend on a different port
    "http://64.227.46.49",         # Deployed IP address
    "https://64.227.46.49",        # Deployed IP address
    "https://wishcraft.ravinath.online",  # Deployed frontend domain
    "http://wishcraft.ravinath.online",
    "https://www.wishcraft.ravinath.online",
    "http://www.wishcraft.ravinath.online"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["wishcraft.ravinath.online", "www.wishcraft.ravinath.online", "*"])

app.include_router(api_router)
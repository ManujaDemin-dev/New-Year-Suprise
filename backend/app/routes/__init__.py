from fastapi import APIRouter
from app.routes import wishes

api_router = APIRouter(
    prefix='/api/v1',
)

api_router.include_router(wishes.router)
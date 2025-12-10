"""
Health Check Routes
"""

from fastapi import APIRouter
from app.config import settings

router = APIRouter()


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.app_name,
        "llm_provider": settings.llm_provider.value,
    }


@router.get("/ready")
async def readiness_check():
    """Readiness check endpoint"""
    # Add checks for dependencies (Redis, DB, etc.)
    return {
        "status": "ready",
    }

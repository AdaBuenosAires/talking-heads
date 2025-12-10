"""
Bizzer Agents - FastAPI Application
Smart Agents with RAG for automated customer service
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.api.routes import chat, knowledge, health


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print(f"Starting {settings.app_name}...")
    print(f"LLM Provider: {settings.llm_provider}")

    yield

    # Shutdown
    print(f"Shutting down {settings.app_name}...")


app = FastAPI(
    title=settings.app_name,
    description="Smart Agents with RAG for Bizzer",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["Health"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(knowledge.router, prefix="/knowledge", tags=["Knowledge"])


@app.get("/")
async def root():
    return {
        "name": settings.app_name,
        "version": "1.0.0",
        "llm_provider": settings.llm_provider.value,
    }

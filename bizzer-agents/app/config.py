"""
Configuration for Bizzer Agents
"""

import os
from enum import Enum
from pydantic_settings import BaseSettings
from functools import lru_cache


class LLMProvider(str, Enum):
    OLLAMA = "ollama"
    CLAUDE = "claude"
    OPENAI = "openai"


class Settings(BaseSettings):
    # App
    app_name: str = "Bizzer Agents"
    debug: bool = False

    # LLM Configuration
    llm_provider: LLMProvider = LLMProvider.OLLAMA

    # Ollama (default - free)
    ollama_base_url: str = "http://ollama:11434"
    ollama_model: str = "gemma2:2b"

    # Claude (paid)
    anthropic_api_key: str = ""
    claude_model: str = "claude-sonnet-4-20250514"

    # OpenAI (paid)
    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    # Vector DB
    vector_db_type: str = "chroma"
    chroma_persist_dir: str = "/app/data/chroma"

    # Redis
    redis_url: str = "redis://redis:6379/1"

    # Database
    database_url: str = "postgresql://bizzer:password@db:5432/bizzer_agents"

    # Auth (shared with website)
    jwt_secret: str = ""
    jwt_algorithm: str = "HS256"

    # Knowledge base
    knowledge_base_dir: str = "/app/knowledge_base"

    # Rate limiting
    rate_limit_requests: int = 100
    rate_limit_window: int = 60

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

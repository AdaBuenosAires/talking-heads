"""
LLM Factory for Bizzer Agents
Provides a unified interface for different LLM providers
"""

from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

from app.config import settings, LLMProvider


class BaseLLMClient(ABC):
    """Abstract base class for LLM clients"""

    @abstractmethod
    async def generate(
        self,
        system_prompt: str,
        user_message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        **kwargs,
    ) -> str:
        """Generate a response from the LLM"""
        pass

    @abstractmethod
    async def embed(self, text: str) -> List[float]:
        """Generate embeddings for text"""
        pass


class LLMFactory:
    """Factory for creating LLM clients"""

    @staticmethod
    def get_client() -> BaseLLMClient:
        """Get the appropriate LLM client based on configuration"""
        if settings.llm_provider == LLMProvider.OLLAMA:
            from app.llm.ollama_client import OllamaClient
            return OllamaClient(
                base_url=settings.ollama_base_url,
                model=settings.ollama_model,
            )
        elif settings.llm_provider == LLMProvider.CLAUDE:
            from app.llm.claude_client import ClaudeClient
            return ClaudeClient(
                api_key=settings.anthropic_api_key,
                model=settings.claude_model,
            )
        elif settings.llm_provider == LLMProvider.OPENAI:
            from app.llm.openai_client import OpenAIClient
            return OpenAIClient(
                api_key=settings.openai_api_key,
                model=settings.openai_model,
            )
        else:
            raise ValueError(f"Unknown LLM provider: {settings.llm_provider}")

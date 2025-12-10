"""
Ollama Client for Bizzer Agents
"""

import httpx
from typing import List, Dict, Optional
from app.llm.llm_factory import BaseLLMClient


class OllamaClient(BaseLLMClient):
    """Client for Ollama API (local LLMs)"""

    def __init__(self, base_url: str, model: str):
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.timeout = 120.0

    async def generate(
        self,
        system_prompt: str,
        user_message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        **kwargs,
    ) -> str:
        """Generate a response using Ollama"""
        # Build messages
        messages = []

        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})

        # Add conversation history
        if conversation_history:
            messages.extend(conversation_history)

        # Add current message
        messages.append({"role": "user", "content": user_message})

        # Make request
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": messages,
                    "stream": False,
                },
            )
            response.raise_for_status()
            data = response.json()

            return data.get("message", {}).get("content", "")

    async def embed(self, text: str) -> List[float]:
        """Generate embeddings using Ollama"""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/api/embeddings",
                json={
                    "model": self.model,
                    "prompt": text,
                },
            )
            response.raise_for_status()
            data = response.json()

            return data.get("embedding", [])

    async def health_check(self) -> bool:
        """Check if Ollama is available"""
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                response = await client.get(f"{self.base_url}/api/tags")
                return response.status_code == 200
        except:
            return False

"""
OpenAI Client for Bizzer Agents
"""

import httpx
from typing import List, Dict, Optional
from app.llm.llm_factory import BaseLLMClient


class OpenAIClient(BaseLLMClient):
    """Client for OpenAI API"""

    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://api.openai.com/v1"
        self.timeout = 120.0
        self.embedding_model = "text-embedding-3-small"

    async def generate(
        self,
        system_prompt: str,
        user_message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        **kwargs,
    ) -> str:
        """Generate a response using OpenAI"""
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
                f"{self.base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.model,
                    "messages": messages,
                    "max_tokens": 4096,
                },
            )
            response.raise_for_status()
            data = response.json()

            choices = data.get("choices", [])
            if choices and len(choices) > 0:
                return choices[0].get("message", {}).get("content", "")
            return ""

    async def embed(self, text: str) -> List[float]:
        """Generate embeddings using OpenAI"""
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/embeddings",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": self.embedding_model,
                    "input": text,
                },
            )
            response.raise_for_status()
            data = response.json()

            embeddings = data.get("data", [])
            if embeddings and len(embeddings) > 0:
                return embeddings[0].get("embedding", [])
            return []

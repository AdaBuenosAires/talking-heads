"""
Claude Client for Bizzer Agents
"""

import httpx
from typing import List, Dict, Optional
from app.llm.llm_factory import BaseLLMClient


class ClaudeClient(BaseLLMClient):
    """Client for Anthropic Claude API"""

    def __init__(self, api_key: str, model: str):
        self.api_key = api_key
        self.model = model
        self.base_url = "https://api.anthropic.com/v1"
        self.timeout = 120.0

    async def generate(
        self,
        system_prompt: str,
        user_message: str,
        conversation_history: Optional[List[Dict[str, str]]] = None,
        **kwargs,
    ) -> str:
        """Generate a response using Claude"""
        # Build messages
        messages = []

        # Add conversation history
        if conversation_history:
            messages.extend(conversation_history)

        # Add current message
        messages.append({"role": "user", "content": user_message})

        # Make request
        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/messages",
                headers={
                    "x-api-key": self.api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": self.model,
                    "max_tokens": 4096,
                    "system": system_prompt,
                    "messages": messages,
                },
            )
            response.raise_for_status()
            data = response.json()

            # Extract text from response
            content = data.get("content", [])
            if content and len(content) > 0:
                return content[0].get("text", "")
            return ""

    async def embed(self, text: str) -> List[float]:
        """
        Claude doesn't have a native embedding API.
        Use a fallback or return empty for now.
        """
        # In production, you would use a separate embedding service
        # like Voyage AI or OpenAI embeddings
        return []

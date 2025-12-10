"""
Base Agent Class
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, Optional, List


class BaseAgent(ABC):
    """Abstract base class for agents"""

    @abstractmethod
    async def chat(
        self,
        user_id: str,
        session_id: str,
        message: str,
        user_context: Optional[Dict[str, Any]] = None,
    ) -> str:
        """Process a chat message and return a response"""
        pass

    @abstractmethod
    def _build_system_prompt(
        self,
        user_context: Dict[str, Any],
        relevant_docs: List[str],
    ) -> str:
        """Build the system prompt for the LLM"""
        pass

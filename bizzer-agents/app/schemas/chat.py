"""
Chat Schemas
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


class ChatHistory(BaseModel):
    session_id: str
    messages: List[ChatMessage]

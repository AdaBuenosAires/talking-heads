"""
Chat Routes for Bizzer Agents
"""

import uuid
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List

from app.api.dependencies import get_current_user, get_user_context
from app.agents.bizzer_agent import BizzerAgent
from app.memory.session_manager import SessionManager
from app.schemas.chat import ChatRequest, ChatResponse, ChatMessage

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    user_id: str = Depends(get_current_user),
    user_context: dict = Depends(get_user_context),
):
    """
    Chat endpoint for communicating with Bizzer Agent
    """
    # Get or create session
    session_id = request.session_id or str(uuid.uuid4())

    # Initialize agent
    agent = BizzerAgent()

    # Generate response
    try:
        response = await agent.chat(
            user_id=user_id,
            session_id=session_id,
            message=request.message,
            user_context=user_context,
        )

        return ChatResponse(
            response=response,
            session_id=session_id,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/history/{session_id}")
async def get_chat_history(
    session_id: str,
    user_id: str = Depends(get_current_user),
):
    """
    Get chat history for a session
    """
    session_manager = SessionManager()
    history = await session_manager.get_conversation_history(session_id)

    return {
        "session_id": session_id,
        "messages": history,
    }


@router.delete("/history/{session_id}")
async def clear_chat_history(
    session_id: str,
    user_id: str = Depends(get_current_user),
):
    """
    Clear chat history for a session
    """
    session_manager = SessionManager()
    await session_manager.clear_history(session_id)

    return {"status": "cleared"}

"""
Session Manager with Redis
"""

import json
from typing import Dict, List, Optional
from datetime import timedelta
import redis.asyncio as redis
from app.config import settings


class SessionManager:
    """Manages chat sessions using Redis"""

    def __init__(self):
        self.redis = redis.from_url(settings.redis_url)
        self.session_ttl = timedelta(hours=24)

    async def get_session(self, session_id: str) -> Dict:
        """Get session data"""
        data = await self.redis.get(f"session:{session_id}")
        return json.loads(data) if data else {}

    async def set_session(self, session_id: str, data: Dict):
        """Set session data"""
        await self.redis.setex(
            f"session:{session_id}",
            self.session_ttl,
            json.dumps(data),
        )

    async def update_session(self, session_id: str, updates: Dict):
        """Update session data"""
        current = await self.get_session(session_id)
        current.update(updates)
        await self.set_session(session_id, current)

    async def delete_session(self, session_id: str):
        """Delete a session"""
        await self.redis.delete(f"session:{session_id}")

    async def get_conversation_history(self, session_id: str) -> List[Dict]:
        """Get conversation history for a session"""
        data = await self.redis.lrange(f"history:{session_id}", 0, -1)
        return [json.loads(item) for item in data]

    async def add_to_history(self, session_id: str, message: Dict):
        """Add a message to conversation history"""
        await self.redis.rpush(f"history:{session_id}", json.dumps(message))
        await self.redis.expire(f"history:{session_id}", self.session_ttl)

    async def clear_history(self, session_id: str):
        """Clear conversation history"""
        await self.redis.delete(f"history:{session_id}")

    async def close(self):
        """Close Redis connection"""
        await self.redis.close()

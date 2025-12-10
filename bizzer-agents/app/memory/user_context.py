"""
User Context Manager
"""

import json
from typing import Dict, Optional
from datetime import timedelta
import redis.asyncio as redis
from app.config import settings


class UserContextManager:
    """Manages user context for personalized responses"""

    def __init__(self):
        self.redis = redis.from_url(settings.redis_url)
        self.context_ttl = timedelta(hours=24)

    async def get_context(self, user_id: str) -> Optional[Dict]:
        """Get user context from cache"""
        data = await self.redis.get(f"user_context:{user_id}")
        if data:
            return json.loads(data)
        return None

    async def set_context(self, user_id: str, context: Dict):
        """Set user context in cache"""
        await self.redis.setex(
            f"user_context:{user_id}",
            self.context_ttl,
            json.dumps(context),
        )

    async def update_context(self, user_id: str, updates: Dict):
        """Update user context"""
        current = await self.get_context(user_id) or {}
        current.update(updates)
        await self.set_context(user_id, current)

    async def delete_context(self, user_id: str):
        """Delete user context"""
        await self.redis.delete(f"user_context:{user_id}")

    async def get_or_fetch_context(self, user_id: str, fetch_func) -> Dict:
        """Get context from cache or fetch from external source"""
        context = await self.get_context(user_id)
        if context:
            return context

        # Fetch from external source
        context = await fetch_func(user_id)
        if context:
            await self.set_context(user_id, context)

        return context or {}

    async def close(self):
        """Close Redis connection"""
        await self.redis.close()

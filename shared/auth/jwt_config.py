"""
Shared JWT Configuration for Bizzer Network Stack
This configuration is used by both bizzer-website and bizzer-agents
"""

import os
from datetime import timedelta

# JWT Settings shared across services
JWT_CONFIG = {
    "SECRET_KEY": os.getenv("SECRET_KEY", "your-secret-key-change-in-production"),
    "ALGORITHM": "HS256",
    "ACCESS_TOKEN_LIFETIME": timedelta(
        minutes=int(os.getenv("JWT_ACCESS_TOKEN_LIFETIME_MINUTES", 60))
    ),
    "REFRESH_TOKEN_LIFETIME": timedelta(
        days=int(os.getenv("JWT_REFRESH_TOKEN_LIFETIME_DAYS", 7))
    ),
    "AUTH_HEADER_TYPE": "Bearer",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

# Token types
TOKEN_TYPE_ACCESS = "access"
TOKEN_TYPE_REFRESH = "refresh"


def get_jwt_secret() -> str:
    """Get JWT secret from environment"""
    secret = os.getenv("SECRET_KEY")
    if not secret:
        raise ValueError("SECRET_KEY environment variable is not set")
    return secret


def get_jwt_algorithm() -> str:
    """Get JWT algorithm"""
    return JWT_CONFIG["ALGORITHM"]

"""Database dependency wiring for FastAPI endpoints."""
from __future__ import annotations

from typing import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession

from ...core.database import get_session


async def get_db_session() -> AsyncIterator[AsyncSession]:
    async with get_session() as session:
        yield session

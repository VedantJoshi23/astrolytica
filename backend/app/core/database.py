"""Database session management for PostgreSQL (SQLAlchemy) and MongoDB."""
from __future__ import annotations

from contextlib import asynccontextmanager
from typing import AsyncIterator

from motor.motor_asyncio import AsyncIOMotorClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from .config import settings

ASYNC_DATABASE_URL = settings.postgres_dsn.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(ASYNC_DATABASE_URL, echo=False, future=True)
SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)

mongo_client = AsyncIOMotorClient(settings.mongo_dsn)
mongo_db = mongo_client.get_default_database()


@asynccontextmanager
async def get_session() -> AsyncIterator[AsyncSession]:
    """Provide a transaction-aware SQLAlchemy session."""

    async with SessionLocal() as session:  # pragma: no cover - session manager
        try:
            yield session
        finally:
            await session.close()


async def get_mongo_db():
    """FastAPI dependency to access MongoDB database."""

    return mongo_db

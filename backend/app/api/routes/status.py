"""Health and readiness endpoints."""
from __future__ import annotations

from fastapi import APIRouter

from ...core.config import settings

router = APIRouter()


@router.get("/health", summary="Service health probe")
async def healthcheck() -> dict[str, str]:
    """Return service health information."""

    return {"status": "ok", "service": settings.project_name}

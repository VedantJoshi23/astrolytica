"""Aggregate API routers."""
from fastapi import APIRouter

from ...core.config import settings
from .datasets import router as datasets_router
from .inference import router as inference_router
from .status import router as status_router

router = APIRouter(prefix=settings.api_v1_prefix)
router.include_router(status_router, prefix="/status", tags=["status"])
router.include_router(datasets_router, prefix="/datasets", tags=["datasets"])
router.include_router(inference_router, prefix="/inference", tags=["inference"])

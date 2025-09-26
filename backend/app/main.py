"""FastAPI application entrypoint for the Astronomical Object and Anomaly Detection System."""
from __future__ import annotations

from fastapi import FastAPI

from .api.routes import router as api_router
from .core.config import settings


def create_app() -> FastAPI:
    """Create and configure the FastAPI application instance."""
    app = FastAPI(
        title=settings.project_name,
        version=settings.version,
        description="Astronomical Object and Anomaly Detection System backend",
    )

    app.include_router(api_router)

    return app


app = create_app()

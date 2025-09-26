"""Celery application configuration for asynchronous tasks."""
from __future__ import annotations

from celery import Celery

from ..core.config import settings

celery_app = Celery(
    "astro_backend",
    broker=settings.rabbitmq_url,
    backend=settings.redis_url,
)

celery_app.conf.update(
    task_routes={
        "workers.tasks.ingest_dataset": {"queue": "ingestion"},
        "workers.tasks.run_inference": {"queue": "inference"},
    },
    result_expires=3600,
    task_default_queue="default",
)

"""Celery task definitions."""
from __future__ import annotations

import asyncio
from typing import Any, Dict

from .celery_app import celery_app
from ..services.inference import InferenceService
from ..services.ingestion import DatasetIngestionService


@celery_app.task(name="workers.tasks.ingest_dataset")
def ingest_dataset_task(dataset_uri: str, metadata: Dict[str, Any] | None = None) -> Dict[str, Any]:
    """Trigger dataset ingestion asynchronously."""

    service = DatasetIngestionService()
    return asyncio.run(service.ingest(dataset_uri=dataset_uri, metadata=metadata))


@celery_app.task(name="workers.tasks.run_inference")
def run_inference_task(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Run inference asynchronously and return the results."""

    service = InferenceService()
    return asyncio.run(service.run_inference(payload))

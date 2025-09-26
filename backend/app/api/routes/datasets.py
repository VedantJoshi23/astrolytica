"""Dataset related API endpoints."""
from __future__ import annotations

from fastapi import APIRouter

from ...core.schemas import DatasetIngestionRequest, DatasetIngestionResponse
from ...services.ingestion import DatasetIngestionService

router = APIRouter()


@router.post("/ingest", response_model=DatasetIngestionResponse)
async def ingest_dataset(request: DatasetIngestionRequest) -> DatasetIngestionResponse:
    """Ingest a dataset into the system."""

    service = DatasetIngestionService()
    result = await service.ingest(dataset_uri=request.dataset_uri, metadata=request.metadata)
    return DatasetIngestionResponse(**result)

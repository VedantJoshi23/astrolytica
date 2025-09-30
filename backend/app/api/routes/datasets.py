"""Dataset related API endpoints."""
from __future__ import annotations
from typing import List

from fastapi import APIRouter

from ...core.schemas import Dataset, DatasetIngestionRequest, DatasetIngestionResponse
from ...services.ingestion import DatasetIngestionService

router = APIRouter()


@router.get("/", response_model=List[Dataset])
async def get_datasets() -> List[Dataset]:
    """Get all available datasets."""
    
    # Mock data for now - in production this would query the database
    mock_datasets = [
        Dataset(
            id="sdss-dr17",
            name="SDSS DR17",
            source="Sloan Digital Sky Survey",
            description="Large-scale survey containing deep multi-color images of one third of the sky"
        ),
        Dataset(
            id="panstarrs-dr2",
            name="Pan-STARRS DR2",
            source="Panoramic Survey Telescope",
            description="Multi-epoch optical and near-infrared survey of the entire northern sky"
        ),
        Dataset(
            id="gaia-edr3",
            name="Gaia EDR3",
            source="European Space Agency",
            description="Precise astrometric measurements of over 1.8 billion stars"
        ),
        Dataset(
            id="hubble-archive",
            name="Hubble Legacy Archive",
            source="Space Telescope Science Institute",
            description="Deep field observations and high-resolution imagery from Hubble Space Telescope"
        )
    ]
    
    return mock_datasets


@router.post("/ingest", response_model=DatasetIngestionResponse)
async def ingest_dataset(request: DatasetIngestionRequest) -> DatasetIngestionResponse:
    """Ingest a dataset into the system."""

    service = DatasetIngestionService()
    result = await service.ingest(dataset_uri=request.dataset_uri, metadata=request.metadata)
    return DatasetIngestionResponse(**result)

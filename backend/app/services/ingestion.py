"""Dataset ingestion services."""
from __future__ import annotations

from pathlib import Path
from typing import Any, Dict

import aiohttp

from ..core.schemas import DatasetIngestionRequest, DatasetIngestionResponse


class DatasetIngestionService:
    """Service orchestrating ingestion from remote datasets into storage."""

    async def ingest(self, dataset_uri: str, metadata: Dict[str, Any] | None = None) -> Dict[str, Any]:
        """Ingest dataset from a URI into local storage and metadata catalog."""

        request = DatasetIngestionRequest(dataset_uri=dataset_uri, metadata=metadata or {})
        local_path = await self._download(request.dataset_uri)

        response = DatasetIngestionResponse(
            dataset_uri=dataset_uri,
            local_path=str(local_path),
            metadata=request.metadata,
        )
        return response.model_dump()

    async def _download(self, uri: str) -> Path:
        """Download resource asynchronously."""

        target_path = Path("/tmp") / Path(uri).name
        target_path.parent.mkdir(parents=True, exist_ok=True)
        async with aiohttp.ClientSession() as session:
            async with session.get(uri) as response:
                response.raise_for_status()
                content = await response.read()
                target_path.write_bytes(content)
        return target_path

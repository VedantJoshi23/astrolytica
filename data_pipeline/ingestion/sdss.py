"""Data ingestion utilities for SDSS and Pan-STARRS datasets."""
from __future__ import annotations

from typing import Iterable

import aiohttp


async def fetch_manifest(manifest_url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(manifest_url) as response:
            response.raise_for_status()
            return await response.json()


async def download_files(urls: Iterable[str], target_dir: str) -> None:
    async with aiohttp.ClientSession() as session:
        for url in urls:
            async with session.get(url) as response:
                response.raise_for_status()
                content = await response.read()
                filename = target_dir + "/" + url.split("/")[-1]
                with open(filename, "wb") as fh:
                    fh.write(content)

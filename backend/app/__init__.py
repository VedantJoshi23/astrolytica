"""Backend application package initialization."""

from __future__ import annotations

from typing import Any

__all__ = ["create_app"]


def __getattr__(name: str) -> Any:
	if name == "create_app":
		from .main import create_app as _create_app

		return _create_app
	raise AttributeError(name)

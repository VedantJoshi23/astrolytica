#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)

pushd "$PROJECT_ROOT/infrastructure/docker" >/dev/null

docker compose build

docker compose up -d

popd >/dev/null

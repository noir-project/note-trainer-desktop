#!/usr/bin/env bash
# CI check script: run lint and typecheck, count failures, and exit non-zero if any issues found.
# This script runs all checks so you can see every failure in one run.

set -euo pipefail

# Determine repository root and cd there so npm/git behave consistently
if git rev-parse --show-toplevel >/dev/null 2>&1; then
  REPO_ROOT=$(git rev-parse --show-toplevel)
else
  REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi
cd "$REPO_ROOT"

echo "1) Running lint (fail on warnings)..."
# Pass --max-warnings=0 to make eslint exit non-zero on warnings
if npm run lint --silent -- --max-warnings=0; then
  echo "lint: OK"
else
  echo "lint: FAILED" >&2
fi

echo
echo "2) Running typecheck..."
# Run the project's typecheck script. Treat any non-zero exit as failure.
if npm run typecheck --silent; then
  echo "typecheck: OK"
else
  echo "typecheck: FAILED" >&2
fi

#!/usr/bin/env bash
# Runs clean-build.sh and clean-node-modules.sh, deleting every untracked
# build/cache and dependency folder in the workspace.
# Pass -n / --dry-run to preview without deleting anything.
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

bash "$script_dir/clean-build.sh" "$@"
echo ""
bash "$script_dir/clean-node-modules.sh" "$@"

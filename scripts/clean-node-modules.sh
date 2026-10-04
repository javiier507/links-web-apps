#!/usr/bin/env bash
# Deletes all node_modules folders (root, apps/*, packages/*).
# Pass -n / --dry-run to preview without deleting anything.
set -euo pipefail

DRY_RUN=false
for arg in "$@"; do
	case "$arg" in
	-n | --dry-run) DRY_RUN=true ;;
	esac
done

cd "$(git rev-parse --show-toplevel)"

deleted=0

remove_dir() {
	local dir="$1"
	if [ ! -d "$dir" ]; then
		return
	fi
	if [ "$DRY_RUN" = true ]; then
		echo "Would delete $dir"
	else
		echo "Deleting $dir..."
		rm -rf "$dir"
		echo "Deleted $dir"
	fi
	deleted=$((deleted + 1))
}

echo "Cleaning node_modules folders..."

remove_dir "./node_modules"

for workspace_dir in ./apps ./packages; do
	[ -d "$workspace_dir" ] || continue
	for item in "$workspace_dir"/*/; do
		[ -d "$item" ] || continue
		remove_dir "${item}node_modules"
	done
done

echo ""
if [ "$DRY_RUN" = true ]; then
	echo "Would delete $deleted node_modules folder(s). Run without --dry-run to apply."
else
	echo "Deleted $deleted node_modules folder(s)."
	echo "Run 'pnpm install' to reinstall dependencies."
fi

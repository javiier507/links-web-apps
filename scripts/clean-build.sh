#!/usr/bin/env bash
# Deletes build output and local cache folders that are never committed to git:
# .turbo, .next, .vercel, out, build, dist, dist-ssr, coverage
# and *.tsbuildinfo files, across the root, apps/* and packages/*.
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

remove_path() {
	local path="$1"
	if [ ! -e "$path" ]; then
		return
	fi
	if [ "$DRY_RUN" = true ]; then
		echo "Would delete $path"
	else
		echo "Deleting $path..."
		rm -rf "$path"
		echo "Deleted $path"
	fi
	deleted=$((deleted + 1))
}

# Folders and files to remove inside a workspace member (relative to its root).
ARTIFACTS=(
	".turbo"
	".next"
	".vercel"
	"out"
	"build"
	"dist"
	"dist-ssr"
	"coverage"
)

echo "Cleaning build output and cache folders..."

remove_path "./.turbo"

for workspace_dir in ./apps ./packages; do
	[ -d "$workspace_dir" ] || continue
	for item in "$workspace_dir"/*/; do
		[ -d "$item" ] || continue
		for artifact in "${ARTIFACTS[@]}"; do
			remove_path "${item}${artifact}"
		done
		while IFS= read -r -d '' tsbuildinfo; do
			remove_path "$tsbuildinfo"
		done < <(find "$item" -maxdepth 1 -name "*.tsbuildinfo" -print0)
	done
done

echo ""
if [ "$DRY_RUN" = true ]; then
	echo "Would delete $deleted item(s). Run without --dry-run to apply."
else
	echo "Deleted $deleted item(s)."
fi

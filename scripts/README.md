# Cleanup scripts

Scripts to remove build output, caches, and dependency folders that are never
committed to git (they're all covered by a `.gitignore`). Each script has a
bash version (`.sh`) and a PowerShell version (`.ps1`) with identical
behavior.

## Commands

### clean:build

Deletes build output and local cache folders: `.turbo` (root), and inside
each `apps/*` / `packages/*` member: `.next`, `.vercel`, `out`, `build`,
`dist`, `dist-ssr`, `coverage`, and any `*.tsbuildinfo` file.

```bash
./scripts/clean-build.sh
pnpm run clean:build
```

### clean:all

Runs `clean-build`, then also deletes every `node_modules` folder (root,
`apps/*`, `packages/*`) via `clean-node-modules.sh` internally.

```bash
./scripts/clean-all.sh
pnpm run clean:all
```

## Dry run

Every script accepts a dry-run flag to preview what would be deleted without
deleting anything:

```bash
./scripts/clean-all.sh --dry-run
```

```powershell
./scripts/clean-all.ps1 -DryRun
```

## When to use each command

- **clean:build** — when Turbo, Next.js, or Vite caches are causing
  stale-build issues, or to free disk space without losing installed
  dependencies.
- **clean:all** — full workspace reset (build output, caches, and
  `node_modules`), e.g. before switching branches with very different
  dependency trees, or to force a clean `pnpm install`.

After `clean:all`, reinstall dependencies with `pnpm install`.

## What these scripts never touch

Only folders/files matched by the project's `.gitignore` rules above are
removed. Environment files (`.env*`) and any tracked or
otherwise non-ignored file are never deleted.

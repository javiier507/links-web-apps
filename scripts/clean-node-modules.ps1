<#
.SYNOPSIS
Deletes all node_modules folders (root, apps/*, packages/*).

.PARAMETER DryRun
Preview what would be deleted without deleting anything.
#>
param(
	[switch]$DryRun
)

$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel)
Set-Location $repoRoot

$deleted = 0

function Remove-TargetDir {
	param([string]$Path)

	if (-not (Test-Path $Path -PathType Container)) {
		return
	}

	if ($DryRun) {
		Write-Host "Would delete $Path"
	} else {
		Write-Host "Deleting $Path..."
		Remove-Item -Path $Path -Recurse -Force
		Write-Host "Deleted $Path"
	}
	$script:deleted++
}

Write-Host "Cleaning node_modules folders..."

Remove-TargetDir -Path "./node_modules"

foreach ($workspaceDir in @("./apps", "./packages")) {
	if (-not (Test-Path $workspaceDir -PathType Container)) {
		continue
	}
	Get-ChildItem -Path $workspaceDir -Directory | ForEach-Object {
		Remove-TargetDir -Path (Join-Path $_.FullName "node_modules")
	}
}

Write-Host ""
if ($DryRun) {
	Write-Host "Would delete $deleted node_modules folder(s). Run without -DryRun to apply."
} else {
	Write-Host "Deleted $deleted node_modules folder(s)."
	Write-Host "Run 'pnpm install' to reinstall dependencies."
}

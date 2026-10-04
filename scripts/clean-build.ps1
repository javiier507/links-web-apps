<#
.SYNOPSIS
Deletes build output and local cache folders that are never committed to git:
.turbo, .next, .vercel, out, build, dist, dist-ssr, coverage
and *.tsbuildinfo files, across the root, apps/* and packages/*.

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

$artifacts = @(
	".turbo",
	".next",
	".vercel",
	"out",
	"build",
	"dist",
	"dist-ssr",
	"coverage"
)

function Remove-TargetPath {
	param([string]$Path)

	if (-not (Test-Path $Path)) {
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

Write-Host "Cleaning build output and cache folders..."

Remove-TargetPath -Path "./.turbo"

foreach ($workspaceDir in @("./apps", "./packages")) {
	if (-not (Test-Path $workspaceDir -PathType Container)) {
		continue
	}
	Get-ChildItem -Path $workspaceDir -Directory | ForEach-Object {
		$item = $_.FullName
		foreach ($artifact in $artifacts) {
			Remove-TargetPath -Path (Join-Path $item $artifact)
		}
		Get-ChildItem -Path $item -Filter "*.tsbuildinfo" -File -ErrorAction SilentlyContinue | ForEach-Object {
			Remove-TargetPath -Path $_.FullName
		}
	}
}

Write-Host ""
if ($DryRun) {
	Write-Host "Would delete $deleted item(s). Run without -DryRun to apply."
} else {
	Write-Host "Deleted $deleted item(s)."
}

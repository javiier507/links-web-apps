<#
.SYNOPSIS
Runs clean-build.ps1 and clean-node-modules.ps1, deleting every untracked
build/cache and dependency folder in the workspace.

.PARAMETER DryRun
Preview what would be deleted without deleting anything.
#>
param(
	[switch]$DryRun
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

& "$scriptDir/clean-build.ps1" -DryRun:$DryRun
Write-Host ""
& "$scriptDir/clean-node-modules.ps1" -DryRun:$DryRun

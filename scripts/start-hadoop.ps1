[CmdletBinding()]
param(
    [ValidateSet('up', 'restart')]
    [string]$Action = 'up'
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$ComposeFile = Join-Path $Root 'docker\hadoop\docker-compose.yml'
$Compose = Get-Command docker -ErrorAction SilentlyContinue
if (-not $Compose) {
    throw 'Docker is not installed or is not available on PATH.'
}

Push-Location $Root
try {
    if ($Action -eq 'up') {
        & docker compose -f $ComposeFile up -d --build
    }
    else {
        & docker compose -f $ComposeFile down -v
        & docker compose -f $ComposeFile up -d --build
    }
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally { Pop-Location }

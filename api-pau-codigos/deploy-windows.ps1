# Script de despliegue para Windows - PAU Códigos API
# Ejecutar como: powershell -ExecutionPolicy Bypass -File deploy-windows.ps1

Write-Host "=== Iniciando configuración local de PAU Códigos API ===" -ForegroundColor Green

# Configuración
$APP_DIR = "C:\pau-codigos-api"
$PORT = 8000
$APP_ENTRY = "main:app"

# Crear directorio si no existe
Write-Host "Creando directorio en $APP_DIR" -ForegroundColor Yellow
if (!(Test-Path $APP_DIR)) {
    New-Item -ItemType Directory -Path $APP_DIR -Force
}

# Copiar archivos del proyecto
Write-Host "Copiando archivos del proyecto..." -ForegroundColor Yellow
$currentDir = Get-Location
Copy-Item -Path "$currentDir\*" -Destination $APP_DIR -Recurse -Force

# Cambiar al directorio de la aplicación
Set-Location $APP_DIR

# Crear entorno virtual
Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
python -m venv venv

# Activar entorno virtual
Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
& ".\venv\Scripts\Activate.ps1"

# Actualizar pip
Write-Host "Actualizando pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt
} else {
    pip install fastapi uvicorn gunicorn
}

# Crear script de inicio para Windows
Write-Host "Creando scripts de inicio..." -ForegroundColor Yellow

# Script de inicio en modo desarrollo
$devScript = @"
@echo off
echo Iniciando PAU Códigos API en modo desarrollo...
call venv\Scripts\activate.bat
uvicorn main:app --host 0.0.0.0 --port $PORT --reload
pause
"@

$devScript | Out-File -FilePath "start-dev.bat" -Encoding ASCII

# Script de inicio en modo producción
$prodScript = @"
@echo off
echo Iniciando PAU Códigos API en modo producción...
call venv\Scripts\activate.bat
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
pause
"@

$prodScript | Out-File -FilePath "start-prod.bat" -Encoding ASCII

# Script de parada
$stopScript = @"
@echo off
echo Deteniendo PAU Códigos API...
taskkill /f /im python.exe 2>nul
taskkill /f /im uvicorn.exe 2>nul
taskkill /f /im gunicorn.exe 2>nul
echo API detenida.
pause
"@

$stopScript | Out-File -FilePath "stop-server.bat" -Encoding ASCII

# Script PowerShell para desarrollo
$psDevScript = @"
# Script PowerShell para iniciar en modo desarrollo
Write-Host "Iniciando PAU Códigos API en modo desarrollo..." -ForegroundColor Green
Set-Location "$APP_DIR"
& ".\venv\Scripts\Activate.ps1"
uvicorn main:app --host 0.0.0.0 --port $PORT --reload
"@

$psDevScript | Out-File -FilePath "start-dev.ps1" -Encoding UTF8

# Crear archivo de configuración
$configContent = @"
# Configuración de la aplicación PAU Códigos
APP_NAME=pau-codigos-api
APP_DIR=$APP_DIR
PORT=$PORT
APP_ENTRY=$APP_ENTRY
PYTHON_PATH=$APP_DIR\venv\Scripts\python.exe
"@

$configContent | Out-File -FilePath "config.env" -Encoding UTF8

Write-Host ""
Write-Host "=== ¡Configuración completada! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Scripts disponibles:" -ForegroundColor Cyan
Write-Host "  • Modo desarrollo (BAT): start-dev.bat" -ForegroundColor White
Write-Host "  • Modo desarrollo (PS1): start-dev.ps1" -ForegroundColor White
Write-Host "  • Modo producción: start-prod.bat" -ForegroundColor White
Write-Host "  • Detener servidor: stop-server.bat" -ForegroundColor White
Write-Host ""
Write-Host "La API estará disponible en: http://localhost:$PORT" -ForegroundColor Yellow
Write-Host "Documentación automática en: http://localhost:$PORT/docs" -ForegroundColor Yellow
Write-Host ""
Write-Host "Para iniciar ahora en modo desarrollo, ejecuta:" -ForegroundColor Cyan
Write-Host "  .\start-dev.bat" -ForegroundColor White
Write-Host ""
Write-Host "Para el servidor Linux, usa el archivo deploy.sh" -ForegroundColor Magenta

# Preguntar si quiere iniciar ahora
$response = Read-Host "¿Quieres iniciar la API ahora en modo desarrollo? (s/n)"
if ($response -eq "s" -or $response -eq "S" -or $response -eq "y" -or $response -eq "Y") {
    Write-Host "Iniciando API..." -ForegroundColor Green
    & ".\start-dev.bat"
}

Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
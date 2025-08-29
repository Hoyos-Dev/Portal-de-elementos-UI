# PAU Códigos API - Script de Desarrollo para Windows
# Ejecutar como: powershell -ExecutionPolicy Bypass -File start-dev.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PAU Códigos API - Modo Desarrollo" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python detectado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Error: Python no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Instala Python desde: https://www.python.org/downloads/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar/crear entorno virtual
if (!(Test-Path "venv")) {
    Write-Host "Creando entorno virtual..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "✓ Entorno virtual creado" -ForegroundColor Green
} else {
    Write-Host "✓ Entorno virtual encontrado" -ForegroundColor Green
}

# Activar entorno virtual
Write-Host "Activando entorno virtual..." -ForegroundColor Yellow
try {
    & ".\venv\Scripts\Activate.ps1"
    Write-Host "✓ Entorno virtual activado" -ForegroundColor Green
} catch {
    Write-Host "✗ Error al activar entorno virtual" -ForegroundColor Red
    Write-Host "Ejecuta: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Actualizar pip
Write-Host "Actualizando pip..." -ForegroundColor Yellow
python -m pip install --upgrade pip --quiet

# Instalar/verificar dependencias
Write-Host "Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    pip install -r requirements.txt --quiet
    Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "✗ Archivo requirements.txt no encontrado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar archivo main.py
if (!(Test-Path "main.py")) {
    Write-Host "✗ Archivo main.py no encontrado" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host ""
Write-Host "🚀 Iniciando PAU Códigos API en modo desarrollo..." -ForegroundColor Green
Write-Host "📍 API disponible en: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📚 Documentación en: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "📖 Redoc en: http://localhost:8000/redoc" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Iniciar servidor
try {
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
} catch {
    Write-Host ""
    Write-Host "✗ Error al iniciar el servidor" -ForegroundColor Red
    Write-Host "Verifica que todas las dependencias estén instaladas correctamente" -ForegroundColor Yellow
} finally {
    Write-Host ""
    Write-Host "🛑 Servidor detenido" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
}
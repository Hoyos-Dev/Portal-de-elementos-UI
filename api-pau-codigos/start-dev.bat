@echo off
echo ========================================
echo   PAU Codigos API - Modo Desarrollo
echo ========================================
echo.

echo Verificando entorno virtual...
if not exist "venv" (
    echo Creando entorno virtual...
    python -m venv venv
    echo Entorno virtual creado.
)

echo Activando entorno virtual...
call venv\Scripts\activate.bat

echo Verificando dependencias...
pip install -r requirements.txt --quiet

echo.
echo Iniciando PAU Codigos API en modo desarrollo...
echo API disponible en: http://localhost:8000
echo Documentacion en: http://localhost:8000/docs
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

uvicorn main:app --host 0.0.0.0 --port 8000 --reload

echo.
echo Servidor detenido.
pause
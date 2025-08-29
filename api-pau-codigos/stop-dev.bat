@echo off
echo ========================================
echo   Deteniendo PAU Codigos API
echo ========================================
echo.

echo Buscando procesos de la API...

REM Detener procesos de Python/Uvicorn
tasklist /FI "IMAGENAME eq python.exe" 2>NUL | find /I "python.exe" >NUL
if "%ERRORLEVEL%" EQU "0" (
    echo Deteniendo procesos de Python...
    taskkill /F /IM python.exe /T 2>NUL
    echo Procesos de Python detenidos.
) else (
    echo No se encontraron procesos de Python ejecutandose.
)

tasklist /FI "IMAGENAME eq uvicorn.exe" 2>NUL | find /I "uvicorn.exe" >NUL
if "%ERRORLEVEL%" EQU "0" (
    echo Deteniendo procesos de Uvicorn...
    taskkill /F /IM uvicorn.exe /T 2>NUL
    echo Procesos de Uvicorn detenidos.
) else (
    echo No se encontraron procesos de Uvicorn ejecutandose.
)

REM Verificar puertos
echo.
echo Verificando puerto 8000...
netstat -ano | findstr :8000 >NUL
if "%ERRORLEVEL%" EQU "0" (
    echo Puerto 8000 aun en uso. Intentando liberar...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do (
        taskkill /F /PID %%a 2>NUL
    )
    echo Puerto liberado.
) else (
    echo Puerto 8000 libre.
)

echo.
echo ========================================
echo   API detenida correctamente
echo ========================================
pause
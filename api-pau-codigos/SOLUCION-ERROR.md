# Solución al Error de Ejecución - PAU Códigos API

## Problema Identificado
Estás intentando ejecutar `start-dev.bat` desde un directorio incorrecto. El archivo no existe en la ubicación actual.

## Soluciones Disponibles

### Opción 1: Usar el Script de Despliegue Automático (Recomendado)

1. **Abre PowerShell como Administrador** en el directorio del proyecto:
   ```powershell
   cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"
   ```

2. **Ejecuta el script de despliegue**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File deploy-windows.ps1
   ```

3. **El script automáticamente**:
   - Creará el directorio `C:\pau-codigos-api`
   - Copiará todos los archivos
   - Creará el entorno virtual
   - Instalará las dependencias
   - Creará los scripts de inicio (`start-dev.bat`, `start-prod.bat`, etc.)

4. **Cuando termine, podrás ejecutar**:
   ```cmd
   cd C:\pau-codigos-api
   start-dev.bat
   ```

### Opción 2: Ejecución Manual desde el Directorio Actual

1. **Navega al directorio correcto**:
   ```powershell
   cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"
   ```

2. **Crea y activa el entorno virtual**:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Instala las dependencias**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Ejecuta la API directamente**:
   ```powershell
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

### Opción 3: Crear Script de Desarrollo Rápido

Si prefieres un script simple en el directorio actual:

```powershell
# Crear start-dev.bat en el directorio actual
@echo off
echo Iniciando PAU Códigos API en modo desarrollo...
call venv\Scripts\activate.bat
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
pause
```

## URLs de Prueba

Una vez que la API esté ejecutándose:
- **API Base**: http://localhost:8000
- **Documentación**: http://localhost:8000/docs
- **Redoc**: http://localhost:8000/redoc

## Comandos de Verificación

```powershell
# Verificar que Python está instalado
python --version

# Verificar que pip está actualizado
python -m pip install --upgrade pip

# Verificar que las dependencias están instaladas
pip list
```

## Notas Importantes

1. **PowerShell vs CMD**: En Windows, es mejor usar PowerShell para estos comandos
2. **Permisos**: Algunos comandos pueden requerir permisos de administrador
3. **Puerto**: La API se ejecuta en el puerto 8000 por defecto
4. **Entorno Virtual**: Siempre activa el entorno virtual antes de ejecutar la API

## Solución Rápida para tu Caso Actual

Basado en tu error, ejecuta estos comandos:

```powershell
# 1. Ir al directorio correcto
cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"

# 2. Activar el entorno virtual (si ya existe)
.\venv\Scripts\Activate.ps1

# 3. Ejecutar la API directamente
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

¡Esto debería solucionar tu problema inmediatamente!
# Guía de Prueba Local - PAU Códigos API

## 🎯 Objetivo
Probar la API localmente en tu máquina Windows antes de desplegarla en MobaXtreme.

## 📋 Requisitos
- ✅ Python 3.8 o superior
- ✅ PowerShell
- ✅ Navegador web

## 🚀 Método 1: Scripts de Desarrollo Rápido (Recomendado)

### Paso 1: Usar Scripts de Desarrollo Directo
```cmd
# Opción A: Script BAT (más simple)
start-dev.bat

# Opción B: Script PowerShell (más características)
powershell -ExecutionPolicy Bypass -File start-dev.ps1
```

**¿Qué hacen estos scripts?**
- Verifican/crean el entorno virtual automáticamente
- Instalan las dependencias
- Inician la API en modo desarrollo
- Muestran las URLs de acceso

### Paso 2: Para Detener la API
```cmd
# Presiona Ctrl+C en la consola, o ejecuta:
stop-dev.bat
```

## 🔧 Método 2: Configuración Automática Completa

### Paso 1: Ejecutar Script de Despliegue
```powershell
# Abrir PowerShell como Administrador en el directorio del proyecto
powershell -ExecutionPolicy Bypass -File deploy-windows.ps1
```

**¿Qué hace este script?**
- Crea el directorio `C:\pau-codigos-api`
- Copia todos los archivos
- Crea entorno virtual automáticamente
- Instala todas las dependencias
- Genera scripts de inicio

### Paso 2: Iniciar la API
```cmd
cd C:\pau-codigos-api
start-dev.bat
```

### Paso 3: Verificar Funcionamiento
**En tu navegador, abrir:**
- 🌐 **Documentación**: http://localhost:8000/docs
- 🌐 **API Principal**: http://localhost:8000/codigos
- 🌐 **ReDoc**: http://localhost:8000/redoc

## 🔧 Método 3: Manual (Paso a Paso)

### Paso 1: Crear Entorno Virtual
```powershell
# Navegar al directorio del proyecto
cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
.\venv\Scripts\Activate.ps1
```

### Paso 2: Instalar Dependencias
```powershell
# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias del proyecto
pip install -r requirements.txt
```

### Paso 3: Ejecutar la API
```powershell
# Iniciar servidor de desarrollo
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 🧪 Pruebas de Funcionamiento

### 1. Probar desde el Navegador
```
# Documentación interactiva
http://localhost:8000/docs

# Listar todos los componentes
http://localhost:8000/codigos

# Obtener un componente específico
http://localhost:8000/codigos/button
http://localhost:8000/codigos/card
http://localhost:8000/codigos/alert
```

### 2. Probar desde PowerShell
```powershell
# Probar endpoint principal
Invoke-RestMethod -Uri "http://localhost:8000/codigos" -Method GET

# Probar componente específico
Invoke-RestMethod -Uri "http://localhost:8000/codigos/button" -Method GET

# O usando curl (si lo tienes instalado)
curl http://localhost:8000/codigos
curl http://localhost:8000/codigos/button
```

### 3. Probar desde la Documentación
1. Ir a http://localhost:8000/docs
2. Expandir el endpoint `GET /codigos`
3. Hacer clic en "Try it out"
4. Hacer clic en "Execute"
5. Ver la respuesta

## 📊 Respuestas Esperadas

### GET /codigos
```json
[
  "alert",
  "button",
  "card",
  "input",
  "table"
]
```

### GET /codigos/button
```json
{
  "component": "button",
  "html": "<button class=\"pau-button\">...",
  "scss": ".pau-button { ... }",
  "ts": "export class ButtonComponent { ... }",
  "icons": {
    "icon1": "<svg>...</svg>"
  }
}
```

## 🛠️ Comandos Útiles

### Gestión del Servidor
```powershell
# Detener servidor (Ctrl+C en la terminal donde corre)
# O cerrar la ventana de PowerShell

# Ver procesos Python corriendo
Get-Process python

# Matar proceso específico (si es necesario)
Stop-Process -Name "python" -Force
```

### Verificar Puerto
```powershell
# Ver qué usa el puerto 8000
netstat -ano | findstr :8000

# O usar PowerShell nativo
Get-NetTCPConnection -LocalPort 8000
```

## ⚠️ Solución a Errores Comunes

### Error: "start-dev.bat no encontrado"
Si obtienes este error, significa que estás en el directorio incorrecto o el archivo no existe.

**Solución rápida:**
```cmd
# Navegar al directorio correcto
cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"

# Usar los nuevos scripts de desarrollo
start-dev.bat
```

### Error: "No se encuentra el módulo main"
Esto ocurre cuando ejecutas desde un directorio incorrecto.

**Solución:**
```powershell
# Asegúrate de estar en el directorio del proyecto
cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"

# Verifica que existe main.py
ls main.py

# Ejecuta directamente
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Error: "Remove-Item: No se encuentra ningún parámetro"
Esto ocurre al usar comandos de CMD en PowerShell.

**Solución:**
```powershell
# En lugar de: rmdir /s /q venv
# Usa: 
Remove-Item -Recurse -Force venv
```

## 🆘 Solución de Problemas

### Error: "Puerto ya en uso"
```powershell
# Encontrar proceso que usa el puerto 8000
netstat -ano | findstr :8000

# Matar el proceso (reemplazar PID)
Stop-Process -Id <PID> -Force

# O cambiar puerto
uvicorn main:app --reload --port 8001
```

### Error: "Python no encontrado"
```powershell
# Verificar instalación de Python
python --version

# Si no funciona, usar:
py --version

# O instalar Python desde Microsoft Store
```

### Error: "Módulo no encontrado"
```powershell
# Asegurarse de que el entorno virtual esté activado
.\venv\Scripts\Activate.ps1

# Reinstalar dependencias
pip install -r requirements.txt
```

### Error: "Archivo no encontrado"
```powershell
# Verificar que estés en la carpeta correcta
Get-Location

# Listar archivos
Get-ChildItem

# Debe mostrar: main.py, app/, codigos/, etc.
```

## 🔄 Flujo de Desarrollo

### Para hacer cambios y probar:
1. **Detener** el servidor (Ctrl+C)
2. **Modificar** el código
3. **Reiniciar** el servidor
4. **Probar** los cambios

### Modo auto-reload (recomendado):
```powershell
# Con --reload, los cambios se aplican automáticamente
uvicorn main:app --reload
```

## 📝 Checklist de Pruebas

- [ ] ✅ Script automático ejecutado sin errores
- [ ] ✅ Servidor inicia en puerto 8000
- [ ] ✅ http://localhost:8000/docs carga correctamente
- [ ] ✅ GET /codigos devuelve lista de componentes
- [ ] ✅ GET /codigos/button devuelve datos del botón
- [ ] ✅ Documentación interactiva funciona
- [ ] ✅ No hay errores en la consola
- [ ] ✅ API responde en menos de 1 segundo

## 🎉 ¡Listo para Producción!

Si todas las pruebas locales funcionan correctamente, tu API está lista para ser desplegada en MobaXtreme usando la guía `DESPLIEGUE-MOBAXTREME.md`.

## 🔗 Próximos Pasos

1. ✅ **Prueba local completada**
2. 🚀 **Desplegar en MobaXtreme** (usar `DESPLIEGUE-MOBAXTREME.md`)
3. 🔗 **Integrar con frontend Angular**
4. 📊 **Monitorear en producción**

---

**💡 Tip**: Mantén la API corriendo localmente mientras desarrollas tu frontend Angular para hacer pruebas de integración.
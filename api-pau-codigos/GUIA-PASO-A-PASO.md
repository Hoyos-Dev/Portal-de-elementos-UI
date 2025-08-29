# 🚀 Guía Paso a Paso - Probar API en Local (Para Principiantes)

¡Hola! Esta guía te ayudará a probar tu API de PAU Códigos en tu computadora local de forma súper fácil, sin necesidad de ser experto en backend.

## 📋 Requisitos Previos

Antes de empezar, necesitas tener instalado:

### 1. Python
- Ve a: https://www.python.org/downloads/
- Descarga Python 3.8 o superior
- **IMPORTANTE**: Durante la instalación, marca la casilla "Add Python to PATH"

### 2. Verificar que Python está instalado
Abre PowerShell (busca "PowerShell" en el menú inicio) y escribe:
```powershell
python --version
```
Deberías ver algo como: `Python 3.11.x`

## 🛠️ Pasos para Probar la API

### Paso 1: Abrir PowerShell en tu proyecto
1. Abre el Explorador de archivos
2. Navega a: `C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos`
3. Haz clic derecho en una zona vacía de la carpeta
4. Selecciona "Abrir en Terminal" o "Open PowerShell window here"

### Paso 2: Ejecutar el script automático
En PowerShell, copia y pega este comando:
```powershell
powershell -ExecutionPolicy Bypass -File deploy-windows.ps1
```

**¿Qué hace este comando?**
- Crea un entorno virtual (como una caja separada para tu proyecto)
- Instala todas las dependencias necesarias
- Te pregunta si quieres iniciar la API automáticamente

### Paso 3: Si el script automático no funciona (Plan B)
Si tienes problemas con el script, puedes hacerlo manualmente:

```powershell
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno virtual
venv\Scripts\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Iniciar la API
uvicorn main:app --reload
```

### Paso 4: ¡Verificar que funciona!
Si todo salió bien, verás algo como:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## 🌐 Probar tu API

### Opción 1: En el navegador
Abre tu navegador favorito y ve a estas URLs:

1. **Documentación automática**: http://localhost:8000/docs
   - Aquí puedes ver y probar todos los endpoints
   - Es como un manual interactivo de tu API

2. **Lista de componentes**: http://localhost:8000/codigos
   - Te muestra todos los componentes disponibles

3. **Un componente específico**: http://localhost:8000/codigos/nombre-del-componente
   - Reemplaza "nombre-del-componente" por uno real

### Opción 2: Usando PowerShell (para los más aventureros)
```powershell
# Probar que la API responde
curl http://localhost:8000/codigos

# O si curl no funciona, usa Invoke-WebRequest
Invoke-WebRequest -Uri "http://localhost:8000/codigos"
```

## 🎯 ¿Qué deberías ver?

### En /docs
- Una interfaz bonita con documentación
- Botones para probar cada endpoint
- Ejemplos de respuestas

### En /codigos
Algo como:
```json
{
  "components": [
    "button-primary",
    "card-basic",
    "alert-success"
  ]
}
```

### En /codigos/button-primary (ejemplo)
```json
{
  "component": "button-primary",
  "html": "<button class='btn-primary'>Click me</button>",
  "scss": ".btn-primary { background: blue; }",
  "ts": "// TypeScript code here"
}
```

## 🚨 Solución de Problemas Comunes

### Error: "python no se reconoce como comando"
**Solución**: Python no está en el PATH
1. Reinstala Python marcando "Add Python to PATH"
2. O reinicia tu computadora después de la instalación

### Error: "No se puede ejecutar scripts"
**Solución**: Política de ejecución de PowerShell
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "ModuleNotFoundError"
**Solución**: Entorno virtual no activado
1. Asegúrate de que ves `(venv)` al inicio de tu línea de comandos
2. Si no lo ves, ejecuta: `venv\Scripts\activate`

### Error: "Port 8000 is already in use"
**Solución**: El puerto está ocupado
1. Cierra cualquier otra aplicación que use el puerto 8000
2. O usa otro puerto: `uvicorn main:app --reload --port 8001`

### La API no responde
**Verificaciones**:
1. ¿Ves el mensaje "Uvicorn running on..."?
2. ¿Hay errores en rojo en la consola?
3. ¿Estás usando la URL correcta? (http://localhost:8000)

## 🔄 Comandos Útiles

### Detener la API
En PowerShell donde está corriendo, presiona: `Ctrl + C`

### Reiniciar la API
```powershell
# Si hiciste cambios en el código
uvicorn main:app --reload
```

### Desactivar entorno virtual
```powershell
deactivate
```

### Activar entorno virtual (si ya lo creaste antes)
```powershell
venv\Scripts\activate
```

## 📱 Probar desde tu Frontend

Si quieres conectar tu frontend Angular:

1. **En tu código Angular**, usa esta URL base:
   ```typescript
   const API_URL = 'http://localhost:8000';
   ```

2. **Ejemplo de llamada**:
   ```typescript
   // En tu servicio Angular
   getComponents() {
     return this.http.get(`${API_URL}/codigos`);
   }
   
   getComponent(name: string) {
     return this.http.get(`${API_URL}/codigos/${name}`);
   }
   ```

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, ¡ya tienes tu API corriendo en local! 

### Próximos pasos:
1. **Prueba todos los endpoints** en http://localhost:8000/docs
2. **Conecta tu frontend** Angular para ver la integración completa
3. **Cuando esté todo listo**, usa los scripts de despliegue para subirlo al servidor

## 🆘 ¿Necesitas ayuda?

Si algo no funciona:
1. **Lee los mensajes de error** - a menudo te dicen exactamente qué está mal
2. **Verifica los requisitos previos** - ¿Python está instalado correctamente?
3. **Revisa esta guía paso a paso** - ¿te saltaste algún paso?
4. **Consulta con tu compañera** - ella ya tiene experiencia con esto

---

**💡 Tip**: Guarda esta guía como favorito, la vas a necesitar cada vez que quieras probar cambios en tu API.

**🔥 Tip Pro**: Una vez que domines esto, puedes explorar las otras opciones de despliegue como Docker para casos más avanzados.
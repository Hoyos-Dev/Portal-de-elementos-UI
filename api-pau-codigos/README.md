# PAU Códigos API - Versión Liviana

API REST liviana para servir ejemplos de código de componentes PAU. Esta API está optimizada para servidores con recursos limitados y proporciona endpoints eficientes para obtener código HTML, SCSS, TypeScript e iconos.

## Características

- ✅ API REST con FastAPI (configuración mínima)
- ✅ Documentación automática (Swagger/OpenAPI)
- ✅ CORS configurado para desarrollo
- ✅ Estructura modular y escalable
- ✅ Scripts de despliegue automatizados y livianos
- ✅ Configuración optimizada con Uvicorn
- ✅ Ideal para servidores pequeños
- ✅ Dependencias mínimas

## 📁 Estructura del Proyecto

```
api-pau-codigos/
├── app/
│   ├── __init__.py
│   ├── models.py          # Modelos Pydantic
│   ├── routes.py          # Rutas de la API
│   ├── services.py        # Lógica de negocio
│   └── utils.py           # Utilidades
├── codigos/               # Archivos JSON con ejemplos
├── main.py                # Punto de entrada
├── requirements.txt       # Dependencias
├── deploy.sh             # Script de despliegue Linux
├── deploy-windows.ps1    # Script de despliegue Windows
├── check-deployment.sh   # Verificación de despliegue
├── Dockerfile            # Imagen Docker
├── docker-compose.yml    # Orquestación Docker
└── DEPLOYMENT.md         # Guía detallada de despliegue
```

## 🛠️ Instalación y Uso

### Opción 1: Windows (Desarrollo Local)

#### Requisitos
- Python 3.8 o superior
- PowerShell

#### Pasos
1. **Ejecutar el script de despliegue**:
   ```powershell
   .\deploy-windows.ps1
   ```

2. **Iniciar la API**:
   ```powershell
   # Modo desarrollo (con auto-reload)
   .\start-dev.bat
   
   # Modo producción
   .\start-prod.bat
   ```

3. **Verificar funcionamiento**:
   - API: http://localhost:8000
   - Documentación: http://localhost:8000/docs

### Opción 2: Linux/Mac (Servidor Liviano)

#### Requisitos
- Python 3.8 o superior
- pip
- Acceso sudo (para instalación en /opt)

#### Pasos
1. **Ejecutar el script de despliegue liviano**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. **Copiar el código al servidor**:
   ```bash
   sudo cp -r . /opt/pau-api/
   sudo chown -R $USER:$USER /opt/pau-api/
   ```

3. **Iniciar la API**:
   ```bash
   # Iniciar API (configuración liviana)
   /opt/pau-api/start_api.sh
   ```

4. **Gestionar la API**:
   ```bash
   # Detener
   /opt/pau-api/stop_api.sh
   
   # Reiniciar
   /opt/pau-api/restart_api.sh
   ```

## 📋 Verificación del Despliegue

Antes de desplegar, ejecuta el script de verificación:

```bash
chmod +x check-deployment.sh
./check-deployment.sh
```

## 🌐 Endpoints Disponibles

- `GET /codigos` - Lista todos los componentes
- `GET /codigos/{component}` - Obtiene código de un componente
- `GET /docs` - Documentación Swagger UI
- `GET /redoc` - Documentación ReDoc

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
# Aplicación
APP_NAME="PAU Códigos API"
APP_VERSION="1.0.0"
DEBUG=false

# Servidor
HOST=0.0.0.0
PORT=8000

# Uvicorn (Configuración Liviana)
WORKERS=2
WORKER_CLASS=uvicorn.workers.UvicornWorker

# CORS
ALLOWED_ORIGINS=http://localhost:4200,https://tu-dominio.com

# Logging
LOG_LEVEL=info

# Archivos
CODIGOS_DIR=./codigos
MAX_FILE_SIZE=5242880

# Seguridad
SECRET_KEY=tu-clave-secreta-muy-segura
```

### CORS

Para producción, modifica `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tu-dominio.com"],  # Especifica dominios
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)
```
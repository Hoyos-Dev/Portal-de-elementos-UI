# Guía de Despliegue Liviano - PAU Códigos API

## Descripción
Esta guía te ayudará a desplegar la API de PAU Códigos en un servidor con recursos limitados usando una configuración liviana y eficiente.

## Estructura del Proyecto
```
api-pau-codigos/
├── app/
│   ├── __init__.py
│   ├── models.py          # Modelos Pydantic
│   ├── routes.py          # Rutas de la API
│   ├── services.py        # Lógica de negocio
│   └── utils.py           # Utilidades
├── codigos/               # Archivos JSON con ejemplos de código
├── main.py                # Punto de entrada de la aplicación
├── requirements.txt       # Dependencias mínimas
├── deploy.sh             # Script de despliegue liviano
└── DEPLOYMENT.md         # Esta guía
```

## Pasos para el Despliegue

### 1. Preparación del Servidor
Asegúrate de que el servidor tenga:
- Python 3.8 o superior
- pip instalado
- Permisos sudo (para crear directorios en /opt)

### 2. Subir el Código al Servidor
```bash
# Opción 1: Usando scp
scp -r api-pau-codigos/ usuario@servidor:/tmp/

# Opción 2: Usando git (recomendado)
git clone tu-repositorio.git
cd tu-repositorio/api-pau-codigos
```

### 3. Ejecutar el Script de Despliegue Liviano
```bash
# Dar permisos de ejecución
chmod +x deploy.sh

# Ejecutar el script
./deploy.sh
```

### 4. Copiar el Código al Directorio de Producción
```bash
# Copiar todos los archivos al directorio de la aplicación
sudo cp -r . /opt/pau-api/
sudo chown -R $USER:$USER /opt/pau-api/
```

### 5. Iniciar la Aplicación
```bash
# Iniciar la API
/opt/pau-api/start_api.sh
```

## Scripts Disponibles

### `start_api.sh`
- **Propósito**: Iniciar la API de forma liviana
- **Características**: 
  - 2 workers (optimizado para recursos limitados)
  - Configuración mínima
  - Ideal para servidores pequeños

### `stop_api.sh`
- **Propósito**: Detener todos los procesos de la API
- **Uso**: `./stop_api.sh`

### `restart_api.sh`
- **Propósito**: Reiniciar la API (detener y volver a iniciar)
- **Uso**: `./restart_api.sh`

## Configuración

### Puerto
Por defecto, la API se ejecuta en el puerto **8000**. Para cambiarlo:
1. Edita la variable `PORT` en `deploy.sh`
2. Vuelve a ejecutar el script de despliegue

### Workers (Uvicorn)
- **Por defecto**: 2 workers (configuración liviana)
- **Modificar**: Editar `start_api.sh`
- **Recomendación**: Para servidores pequeños, mantener en 1-2 workers

### CORS
La configuración actual permite todos los orígenes (`allow_origins=["*"]`). Para producción, modifica `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tu-dominio.com"],  # Cambia esto
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## Endpoints Disponibles

- `GET /codigos` - Lista todos los componentes disponibles
- `GET /codigos/{component}` - Obtiene el código de un componente específico
- `GET /docs` - Documentación automática de la API (Swagger)
- `GET /redoc` - Documentación alternativa (ReDoc)

## Verificación del Despliegue

### 1. Verificar que la API está ejecutándose
```bash
curl http://localhost:8000/codigos
```

### 2. Verificar los logs
```bash
# Ver procesos activos
ps aux | grep uvicorn

# Ver logs en tiempo real
tail -f /var/log/syslog | grep uvicorn
```

### 3. Acceder a la documentación
Abre en tu navegador: `http://tu-servidor:8000/docs`

## Solución de Problemas

### La API no inicia
1. Verifica que Python 3 esté instalado: `python3 --version`
2. Verifica que el entorno virtual esté activado
3. Revisa los logs de error

### Error de permisos
```bash
sudo chown -R $USER:$USER /opt/fastapi-pau-codigos/
chmod +x /opt/fastapi-pau-codigos/*.sh
```

### Puerto ocupado
```bash
# Verificar qué proceso usa el puerto 8000
sudo lsof -i :8000

# Matar el proceso si es necesario
sudo kill -9 PID
```

## Mantenimiento

### Actualizar la aplicación
1. Detener el servidor: `./stop_api.sh`
2. Actualizar el código
3. Reiniciar: `./restart_api.sh`

### Actualizar dependencias
```bash
source /opt/pau-api/venv/bin/activate
pip install --upgrade -r requirements.txt
```

## Configuración como Servicio del Sistema (Opcional)

Para que la API se inicie automáticamente al arrancar el servidor:

```bash
sudo nano /etc/systemd/system/pau-codigos-api.service
```

Contenido del archivo:
```ini
[Unit]
Description=PAU Códigos FastAPI
After=network.target

[Service]
User=tu-usuario
Group=tu-grupo
WorkingDirectory=/opt/pau-api
ExecStart=/opt/pau-api/start_api.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

Activar el servicio:
```bash
sudo systemctl daemon-reload
sudo systemctl enable pau-codigos-api
sudo systemctl start pau-codigos-api
```

## Contacto
Si tienes problemas con el despliegue, revisa esta guía o consulta con el equipo de desarrollo.
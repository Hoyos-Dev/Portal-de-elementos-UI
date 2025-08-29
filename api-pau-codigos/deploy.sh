#!/bin/bash

# Script de despliegue liviano para API FastAPI - PAU Códigos
# Configuración
APP_DIR="/opt/pau-api"
PYTHON_VERSION="python3"
APP_ENTRY="main:app"
PORT=8000
APP_NAME="pau-api"

echo "=== Despliegue Liviano - PAU Códigos API ==="

# Crear directorio si no existe
echo "Configurando directorio en $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR
cd $APP_DIR

# Crear entorno virtual liviano
echo "Creando entorno virtual..."
$PYTHON_VERSION -m venv venv --without-pip
source venv/bin/activate

# Instalar pip manualmente para control de versión
echo "Configurando pip..."
curl https://bootstrap.pypa.io/get-pip.py | python

# Instalar solo dependencias esenciales
echo "Instalando dependencias mínimas..."
pip install --no-cache-dir fastapi==0.104.1 uvicorn==0.24.0

# Instalar requirements si existe
if [ -f requirements.txt ]; then
    echo "Instalando desde requirements.txt..."
    pip install --no-cache-dir -r requirements.txt
fi

# Crear script de inicio liviano
echo "Creando script de inicio..."
cat <<EOF > start_api.sh
#!/bin/bash
# Script de inicio liviano para PAU API
echo "Iniciando $APP_NAME..."
source $APP_DIR/venv/bin/activate
cd $APP_DIR
uvicorn $APP_ENTRY --host 0.0.0.0 --port $PORT --workers 2
EOF

chmod +x start_api.sh

# Crear script de parada
echo "Creando script de parada..."
cat <<EOF > stop_api.sh
#!/bin/bash
echo "Deteniendo $APP_NAME..."
pkill -f "uvicorn.*$APP_ENTRY" || echo "No hay procesos ejecutándose"
EOF

chmod +x stop_api.sh

# Crear script de reinicio
echo "Creando script de reinicio..."
cat <<EOF > restart_api.sh
#!/bin/bash
echo "Reiniciando $APP_NAME..."
$APP_DIR/stop_api.sh
sleep 3
$APP_DIR/start_api.sh
EOF

chmod +x restart_api.sh

echo ""
echo "=== ¡Despliegue Liviano Completado! ==="
echo ""
echo "Scripts disponibles:"
echo "  • Iniciar API: $APP_DIR/start_api.sh"
echo "  • Detener API: $APP_DIR/stop_api.sh"
echo "  • Reiniciar API: $APP_DIR/restart_api.sh"
echo ""
echo "La API estará disponible en: http://localhost:$PORT"
echo "Documentación: http://localhost:$PORT/docs"
echo ""
echo "Pasos finales:"
echo "  1. Copia tu código: sudo cp -r . $APP_DIR/"
echo "  2. Ajusta permisos: sudo chown -R \$USER:\$USER $APP_DIR/"
echo "  3. Inicia la API: $APP_DIR/start_api.sh"
echo ""
echo "Configuración liviana - Ideal para servidores con recursos limitados"
echo ""
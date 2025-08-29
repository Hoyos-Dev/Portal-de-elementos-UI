# Guía de Despliegue Liviano - PAU Códigos API

## ¿Por qué una versión liviana?

Esta configuración está optimizada para:
- ✅ Servidores con recursos limitados
- ✅ VPS pequeños (1GB RAM o menos)
- ✅ Hosting compartido
- ✅ Desarrollo local eficiente
- ✅ Despliegues rápidos

## Diferencias con la versión completa

| Aspecto | Versión Liviana | Versión Completa |
|---------|----------------|------------------|
| **Servidor** | Uvicorn (2 workers) | Gunicorn (4+ workers) |
| **Dependencias** | 3 paquetes básicos | 6+ paquetes |
| **RAM requerida** | ~100-200MB | ~500MB+ |
| **Docker** | ❌ No incluido | ✅ Incluido |
| **Nginx** | ❌ No incluido | ✅ Incluido |
| **Logs** | Básicos | Avanzados |
| **Ideal para** | Desarrollo, VPS pequeños | Producción enterprise |

## Instalación Rápida

### Linux/Mac
```bash
# 1. Clonar y preparar
git clone <tu-repo>
cd api-pau-codigos

# 2. Ejecutar script liviano
chmod +x deploy.sh
./deploy.sh

# 3. Copiar código
sudo cp -r . /opt/pau-api/
sudo chown -R $USER:$USER /opt/pau-api/

# 4. Iniciar
/opt/pau-api/start_api.sh
```

### Windows
```powershell
# 1. Ejecutar script
.\deploy-windows.ps1

# 2. Iniciar desarrollo
.\start-dev.bat
```

## Scripts Disponibles

### `start_api.sh`
```bash
#!/bin/bash
cd /opt/pau-api
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 2 &
echo $! > api.pid
echo "API iniciada en puerto 8000"
```

### `stop_api.sh`
```bash
#!/bin/bash
if [ -f /opt/pau-api/api.pid ]; then
    kill $(cat /opt/pau-api/api.pid)
    rm /opt/pau-api/api.pid
    echo "API detenida"
else
    echo "No se encontró proceso activo"
fi
```

### `restart_api.sh`
```bash
#!/bin/bash
/opt/pau-api/stop_api.sh
sleep 2
/opt/pau-api/start_api.sh
```

## Monitoreo Simple

### Verificar estado
```bash
# Ver si está corriendo
ps aux | grep uvicorn

# Probar endpoint
curl http://localhost:8000/codigos

# Ver uso de recursos
top -p $(pgrep -f uvicorn)
```

### Logs básicos
```bash
# Logs del sistema
journalctl -f | grep uvicorn

# Logs de Python
python -c "import logging; logging.basicConfig(level=logging.INFO)"
```

## Optimizaciones para Servidores Pequeños

### 1. Reducir workers si es necesario
Edita `start_api.sh`:
```bash
# Para servidores muy pequeños (512MB RAM)
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1
```

### 2. Configurar swap (si no tienes)
```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### 3. Limpiar cache regularmente
```bash
# Agregar a crontab
echo "0 2 * * * find /tmp -type f -atime +7 -delete" | crontab -
```

## Solución de Problemas

### Error: Puerto ocupado
```bash
# Encontrar proceso
sudo lsof -i :8000

# Matar proceso
sudo kill -9 <PID>
```

### Error: Sin memoria
```bash
# Verificar memoria
free -h

# Reducir workers a 1
# Editar start_api.sh
```

### Error: Permisos
```bash
# Arreglar permisos
sudo chown -R $USER:$USER /opt/pau-api/
chmod +x /opt/pau-api/*.sh
```

## Actualización Rápida

```bash
# 1. Detener
/opt/pau-api/stop_api.sh

# 2. Actualizar código
cd /ruta/original
git pull
sudo cp -r . /opt/pau-api/

# 3. Reiniciar
/opt/pau-api/start_api.sh
```

## Configuración como Servicio (Opcional)

Para que inicie automáticamente:

```bash
# Crear servicio
sudo tee /etc/systemd/system/pau-api.service > /dev/null <<EOF
[Unit]
Description=PAU Códigos API
After=network.target

[Service]
Type=forking
User=$USER
WorkingDirectory=/opt/pau-api
ExecStart=/opt/pau-api/start_api.sh
ExecStop=/opt/pau-api/stop_api.sh
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Habilitar
sudo systemctl enable pau-api
sudo systemctl start pau-api
```

## Ventajas de esta Configuración

- 🚀 **Rápido**: Inicia en segundos
- 💾 **Eficiente**: Usa mínima RAM
- 🔧 **Simple**: Fácil de mantener
- 📦 **Portable**: Funciona en cualquier servidor
- 💰 **Económico**: Ideal para VPS baratos
- 🛠️ **Flexible**: Fácil de modificar

## Próximos Pasos

1. **Probar localmente** con `deploy-windows.ps1`
2. **Subir a servidor** usando `deploy.sh`
3. **Configurar dominio** (opcional)
4. **Configurar SSL** con Let's Encrypt (opcional)
5. **Monitorear** con herramientas básicas

¡Tu API liviana está lista para funcionar en cualquier servidor! 🎉
# Comandos Útiles para el Servidor - PAU Códigos API (Versión Liviana)

Esta guía contiene comandos útiles para administrar la API en el servidor de producción en su versión liviana.

## 🚀 Gestión del Servicio

### Iniciar/Detener/Reiniciar
```bash
# Iniciar la API
/opt/pau-api/start_api.sh

# Detener la API
/opt/pau-api/stop_api.sh

# Reiniciar la API
/opt/pau-api/restart_api.sh
```

### Verificar Estado
```bash
# Ver procesos de la API
ps aux | grep uvicorn

# Ver puertos en uso
sudo lsof -i :8000
netstat -tuln | grep :8000

# Verificar que la API responde
curl http://localhost:8000/codigos
curl -I http://localhost:8000/docs
```

## 📊 Monitoreo y Logs

### Ver Logs
```bash
# Logs del sistema (Uvicorn)
journalctl -f | grep uvicorn

# Logs de Python
tail -f /var/log/syslog | grep python

# Logs básicos del proceso
ps aux | grep uvicorn

# Logs de Nginx (si usas proxy)
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Monitoreo de Recursos
```bash
# Uso de CPU y memoria
top -p $(pgrep -f uvicorn)
htop -p $(pgrep -f uvicorn)

# Uso de disco
df -h /opt/pau-api
du -sh /opt/pau-api/*

# Memoria total del sistema
free -h

# Conexiones de red
ss -tuln | grep :8000
```

## 🔄 Actualización de la Aplicación

### Actualización Manual
```bash
# 1. Detener la API
/opt/pau-api/stop_api.sh

# 2. Hacer backup (opcional)
cp -r /opt/pau-api /opt/pau-api-backup-$(date +%Y%m%d)

# 3. Actualizar código desde tu repositorio local
cd /ruta/a/tu/codigo/local
git pull origin main  # Si usas Git
sudo cp -r . /opt/pau-api/
sudo chown -R $USER:$USER /opt/pau-api/

# 4. Actualizar dependencias (si es necesario)
cd /opt/pau-api
source venv/bin/activate
pip install --upgrade -r requirements.txt

# 5. Reiniciar la API
/opt/pau-api/start_api.sh
```

### Actualización con Git (si el código está en el servidor)
```bash
# 1. Detener la API
/opt/pau-api/stop_api.sh

# 2. Actualizar código
cd /opt/pau-api
git pull origin main

# 3. Actualizar dependencias
source venv/bin/activate
pip install --upgrade -r requirements.txt

# 4. Reiniciar
/opt/pau-api/start_api.sh
```

### Actualización Rápida (sin dependencias)
```bash
# Script de una línea para actualizaciones menores
/opt/pau-api/stop_api.sh && cd /ruta/codigo && git pull && sudo cp -r . /opt/pau-api/ && /opt/pau-api/start_api.sh
```

## 🧹 Mantenimiento del Sistema

### Limpieza de Logs
```bash
# Limpiar logs del sistema
sudo journalctl --vacuum-time=30d

# Limpiar archivos temporales
sudo find /tmp -type f -atime +7 -delete

# Limpiar cache de Python
find /opt/pau-api -name "__pycache__" -type d -exec rm -rf {} +
```

### Backup
```bash
# Backup completo
sudo tar -czf /backup/pau-api-$(date +%Y%m%d).tar.gz /opt/pau-api

# Backup solo del código (sin venv)
sudo tar -czf /backup/pau-code-$(date +%Y%m%d).tar.gz /opt/pau-api --exclude=venv

# Backup de configuración
cp /opt/pau-api/.env /backup/pau-config-$(date +%Y%m%d).env
```

## 🔒 Seguridad

### Verificar Permisos
```bash
# Verificar propietario de archivos
ls -la /opt/fastapi-pau-codigos/

# Corregir permisos si es necesario
sudo chown -R $USER:$USER /opt/fastapi-pau-codigos/
chmod +x /opt/fastapi-pau-codigos/*.sh
```

### Firewall
```bash
# Verificar reglas del firewall
sudo ufw status

# Permitir puerto 8000 (si es necesario)
sudo ufw allow 8000

# Permitir solo desde IPs específicas
sudo ufw allow from 192.168.1.0/24 to any port 8000
```

## 🚨 Solución de Problemas

### API no responde
```bash
# Verificar si el proceso está ejecutándose
ps aux | grep -E "(gunicorn|uvicorn)"

# Verificar puerto
sudo lsof -i :8000

# Verificar logs de error
tail -f /var/log/syslog | grep -E "(gunicorn|uvicorn|python)"

# Reiniciar completamente
/opt/fastapi-pau-codigos/stop_server.sh
sleep 5
/opt/fastapi-pau-codigos/gunicorn_start.sh
```

### Error de memoria
```bash
# Verificar uso de memoria
free -h
top -o %MEM

# Reducir workers si es necesario (editar gunicorn_start.sh)
# Cambiar --workers 4 por --workers 2
```

### Error de permisos
```bash
# Corregir propietario
sudo chown -R $USER:$USER /opt/fastapi-pau-codigos/

# Corregir permisos de ejecución
chmod +x /opt/fastapi-pau-codigos/*.sh

# Verificar permisos del directorio de códigos
ls -la /opt/fastapi-pau-codigos/codigos/
```

## 📈 Optimización

### Ajustar Workers
```bash
# Editar configuración de Gunicorn
nano /opt/fastapi-pau-codigos/gunicorn_start.sh

# Fórmula recomendada: (2 x CPU cores) + 1
# Para 2 cores: --workers 5
# Para 4 cores: --workers 9
```

### Configurar Cache (futuro)
```bash
# Si decides agregar Redis
sudo apt install redis-server
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

## 📞 Contactos de Emergencia

- **Desarrollador**: [Tu nombre/email]
- **Administrador del servidor**: [Contacto del admin]
- **Documentación**: Ver DEPLOYMENT.md

---

**Nota**: Guarda este archivo en el servidor para referencia rápida:
```bash
sudo cp server-commands.md /opt/fastapi-pau-codigos/
```
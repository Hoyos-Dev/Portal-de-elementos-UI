# Guía de Despliegue en MobaXtreme (Linux) - PAU Códigos API

## 📋 Requisitos Previos

### En tu máquina local (Windows)
- ✅ Código de la API listo
- ✅ MobaXterm instalado
- ✅ Acceso SSH a tu servidor MobaXtreme

### En el servidor MobaXtreme
- ✅ Ubuntu/Debian/CentOS
- ✅ Python 3.8 o superior
- ✅ Acceso sudo
- ✅ Al menos 512MB RAM disponible

## 🚀 Paso a Paso Completo

### Paso 1: Conectar al Servidor
```bash
# Desde MobaXterm, conectar por SSH
ssh usuario@tu-servidor-mobaxtreme.com

# O si tienes IP directa
ssh usuario@192.168.1.100
```

### Paso 2: Preparar el Servidor
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Python y herramientas necesarias
sudo apt install python3 python3-pip python3-venv git curl -y

# Verificar versión de Python
python3 --version
```

### Paso 3: Subir el Código al Servidor

#### Opción A: Usando SCP desde MobaXterm
```bash
# En tu máquina local (terminal de MobaXterm)
cd "C:\Users\chsalazar\Documents\plantilla-pau\api-pau-codigos"
scp -r . usuario@tu-servidor:/tmp/pau-api-upload/
```

#### Opción B: Usando Git (recomendado)
```bash
# En el servidor
cd /tmp
git clone https://github.com/tu-usuario/api-pau-codigos.git pau-api-upload
# O si ya tienes el repo:
# git clone <URL-de-tu-repositorio> pau-api-upload
```

#### Opción C: Usando el explorador de archivos de MobaXterm
1. En MobaXterm, usar el panel izquierdo para navegar
2. Arrastrar la carpeta `api-pau-codigos` al servidor
3. Colocarla en `/tmp/pau-api-upload/`

### Paso 4: Ejecutar el Script de Despliegue
```bash
# Ir al directorio subido
cd /tmp/pau-api-upload

# Dar permisos al script
chmod +x deploy.sh

# Ejecutar el despliegue liviano
./deploy.sh
```

**¡El script hará todo automáticamente!**
- Creará el directorio `/opt/pau-api/`
- Instalará el entorno virtual
- Instalará las dependencias mínimas
- Creará los scripts de gestión

### Paso 5: Copiar el Código al Directorio Final
```bash
# Copiar todo el código
sudo cp -r /tmp/pau-api-upload/* /opt/pau-api/

# Ajustar permisos
sudo chown -R $USER:$USER /opt/pau-api/

# Dar permisos de ejecución a los scripts
chmod +x /opt/pau-api/*.sh
```

### Paso 6: Iniciar la API
```bash
# Iniciar la API
/opt/pau-api/start_api.sh

# Verificar que esté corriendo
ps aux | grep uvicorn
```

### Paso 7: Verificar el Funcionamiento
```bash
# Probar la API localmente
curl http://localhost:8000/codigos

# Probar un componente específico
curl http://localhost:8000/codigos/button

# Ver el estado del proceso
ps aux | grep uvicorn
```

### Paso 8: Configurar Firewall (si es necesario)
```bash
# Permitir el puerto 8000
sudo ufw allow 8000

# O si usas iptables
sudo iptables -A INPUT -p tcp --dport 8000 -j ACCEPT
```

### Paso 9: Probar desde tu Navegador
```
# Abrir en tu navegador
http://tu-servidor-mobaxtreme.com:8000/docs

# O con IP
http://192.168.1.100:8000/docs
```

## 🎯 Comandos de Gestión

### Controlar la API
```bash
# Iniciar
/opt/pau-api/start_api.sh

# Detener
/opt/pau-api/stop_api.sh

# Reiniciar
/opt/pau-api/restart_api.sh

# Ver estado
ps aux | grep uvicorn
```

### Monitoreo Básico
```bash
# Ver logs en tiempo real
journalctl -f | grep uvicorn

# Ver uso de recursos
top -p $(pgrep -f uvicorn)

# Ver memoria disponible
free -h
```

## 🔄 Actualizar la API

### Método rápido
```bash
# 1. Detener
/opt/pau-api/stop_api.sh

# 2. Subir nuevo código a /tmp/pau-update/
# (usar SCP, Git, o explorador de MobaXterm)

# 3. Copiar archivos
sudo cp -r /tmp/pau-update/* /opt/pau-api/

# 4. Reiniciar
/opt/pau-api/start_api.sh
```

## 🆘 Solución de Problemas

### Error: Puerto ocupado
```bash
# Ver qué usa el puerto 8000
sudo lsof -i :8000

# Matar proceso si es necesario
sudo kill -9 <PID>
```

### Error: Sin memoria
```bash
# Verificar memoria
free -h

# Si es muy poca, editar start_api.sh para usar 1 worker:
# uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1
```

### Error: Permisos
```bash
# Arreglar permisos
sudo chown -R $USER:$USER /opt/pau-api/
chmod +x /opt/pau-api/*.sh
```

### La API no responde
```bash
# Verificar que esté corriendo
ps aux | grep uvicorn

# Si no está, revisar errores
/opt/pau-api/start_api.sh

# Ver logs de errores
journalctl -f
```

## 🔧 Configuración Opcional

### Configurar como servicio del sistema
```bash
# Crear archivo de servicio
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

# Habilitar y iniciar
sudo systemctl enable pau-api
sudo systemctl start pau-api

# Verificar estado
sudo systemctl status pau-api
```

### Configurar dominio (opcional)
Si tienes un dominio apuntando a tu servidor:
```bash
# La API estará disponible en:
http://tu-dominio.com:8000/docs
```

## 📊 URLs Importantes

Una vez desplegado, tendrás acceso a:

- **API Principal**: `http://tu-servidor:8000/codigos`
- **Documentación**: `http://tu-servidor:8000/docs`
- **Documentación Alt**: `http://tu-servidor:8000/redoc`
- **Componente específico**: `http://tu-servidor:8000/codigos/button`

## ✅ Checklist Final

- [ ] Servidor actualizado
- [ ] Python 3.8+ instalado
- [ ] Código subido al servidor
- [ ] Script de despliegue ejecutado
- [ ] API iniciada correctamente
- [ ] Puerto 8000 abierto en firewall
- [ ] API responde desde navegador
- [ ] Documentación accesible

## 🎉 ¡Listo!

Tu API de PAU Códigos está ahora corriendo en MobaXtreme con una configuración liviana y eficiente. La API consume mínimos recursos y es perfecta para servidores pequeños.

**Próximos pasos sugeridos:**
1. Probar todos los endpoints desde `/docs`
2. Integrar con tu frontend Angular
3. Configurar backup automático
4. Monitorear el uso de recursos

¡Tu API está lista para producción! 🚀
#!/bin/bash

# Script de verificación para el despliegue de PAU Códigos API
# Este script verifica que todo esté configurado correctamente

echo "=== Verificación de Despliegue - PAU Códigos API ==="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar estado
show_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Función para mostrar advertencia
show_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Función para mostrar información
show_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

echo "1. Verificando requisitos del sistema..."
echo "----------------------------------------"

# Verificar Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | cut -d' ' -f2)
    show_status 0 "Python 3 instalado (versión: $PYTHON_VERSION)"
else
    show_status 1 "Python 3 no encontrado"
    echo "   Instala Python 3.8 o superior"
fi

# Verificar pip
if command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version 2>&1 | cut -d' ' -f2)
    show_status 0 "pip instalado (versión: $PIP_VERSION)"
else
    show_status 1 "pip no encontrado"
fi

# Verificar git (opcional)
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version 2>&1 | cut -d' ' -f3)
    show_status 0 "Git instalado (versión: $GIT_VERSION)"
else
    show_warning "Git no encontrado (opcional para despliegue)"
fi

echo ""
echo "2. Verificando estructura del proyecto..."
echo "----------------------------------------"

# Verificar archivos principales
files_to_check=("main.py" "requirements.txt" "app/routes.py" "app/services.py" "app/models.py")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        show_status 0 "$file existe"
    else
        show_status 1 "$file no encontrado"
    fi
done

# Verificar directorio de códigos
if [ -d "codigos" ]; then
    CODE_COUNT=$(find codigos -name "*.json" | wc -l)
    show_status 0 "Directorio 'codigos' existe ($CODE_COUNT archivos JSON)"
else
    show_status 1 "Directorio 'codigos' no encontrado"
fi

echo ""
echo "3. Verificando configuración..."
echo "------------------------------"

# Verificar requirements.txt
if [ -f "requirements.txt" ]; then
    REQ_COUNT=$(wc -l < requirements.txt)
    show_status 0 "requirements.txt tiene $REQ_COUNT dependencias"
    
    # Mostrar dependencias
    show_info "Dependencias encontradas:"
    while IFS= read -r line; do
        if [[ ! -z "$line" && ! "$line" =~ ^#.* ]]; then
            echo "     - $line"
        fi
    done < requirements.txt
else
    show_status 1 "requirements.txt no encontrado"
fi

echo ""
echo "4. Verificando scripts de despliegue..."
echo "--------------------------------------"

# Verificar scripts
scripts_to_check=("deploy.sh" "deploy-windows.ps1")

for script in "${scripts_to_check[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            show_status 0 "$script existe y es ejecutable"
        else
            show_warning "$script existe pero no es ejecutable (ejecuta: chmod +x $script)"
        fi
    else
        show_status 1 "$script no encontrado"
    fi
done

echo ""
echo "5. Verificando entorno virtual (si existe)..."
echo "--------------------------------------------"

if [ -d "venv" ]; then
    show_status 0 "Entorno virtual 'venv' encontrado"
    
    if [ -f "venv/bin/activate" ]; then
        show_status 0 "Script de activación encontrado"
    elif [ -f "venv/Scripts/activate.bat" ]; then
        show_status 0 "Script de activación de Windows encontrado"
    else
        show_status 1 "Script de activación no encontrado"
    fi
else
    show_warning "Entorno virtual no encontrado (se creará durante el despliegue)"
fi

echo ""
echo "6. Verificando puertos..."
echo "------------------------"

# Verificar si el puerto 8000 está en uso
if command -v lsof &> /dev/null; then
    if lsof -i :8000 &> /dev/null; then
        show_warning "Puerto 8000 está en uso"
        echo "   Procesos usando el puerto 8000:"
        lsof -i :8000 | grep -v COMMAND
    else
        show_status 0 "Puerto 8000 está disponible"
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tuln | grep :8000 &> /dev/null; then
        show_warning "Puerto 8000 está en uso"
    else
        show_status 0 "Puerto 8000 está disponible"
    fi
else
    show_warning "No se puede verificar el estado del puerto (lsof/netstat no disponible)"
fi

echo ""
echo "7. Verificando permisos..."
echo "--------------------------"

# Verificar permisos de escritura en /opt (para Linux)
if [ -d "/opt" ]; then
    if [ -w "/opt" ]; then
        show_status 0 "Permisos de escritura en /opt"
    else
        show_warning "Sin permisos de escritura en /opt (necesitarás sudo)"
    fi
else
    show_info "Directorio /opt no existe (normal en algunos sistemas)"
fi

echo ""
echo "8. Prueba rápida de sintaxis..."
echo "------------------------------"

# Verificar sintaxis de Python
if [ -f "main.py" ]; then
    if python3 -m py_compile main.py 2>/dev/null; then
        show_status 0 "Sintaxis de main.py es correcta"
    else
        show_status 1 "Error de sintaxis en main.py"
        python3 -m py_compile main.py
    fi
fi

echo ""
echo "=== Resumen de la Verificación ==="
echo ""
show_info "Si todos los elementos marcados con ✓ están presentes, el despliegue debería funcionar correctamente."
show_info "Los elementos marcados con ⚠ son advertencias que deberías revisar."
show_info "Los elementos marcados con ✗ deben corregirse antes del despliegue."
echo ""
echo "Próximos pasos:"
echo "1. Corrige cualquier problema marcado con ✗"
echo "2. Ejecuta el script de despliegue apropiado:"
echo "   - Linux/Mac: ./deploy.sh"
echo "   - Windows: .\\deploy-windows.ps1"
echo "3. Copia tu código al directorio de producción"
echo "4. Inicia la aplicación"
echo ""
echo "Para más información, consulta DEPLOYMENT.md"
echo ""
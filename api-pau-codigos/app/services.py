import os
import json
from typing import List
from fastapi import HTTPException
from .models import CodeExample
from .utils import is_valid_component_name

CODE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "codigos")

def find_code_file(component: str) -> str:
    filename = f"{component}.json"
    for root, dirs, files in os.walk(CODE_DIR):
        if filename in files:
            return os.path.join(root, filename)
    return None

def get_code_example(component: str) -> CodeExample:
    if not is_valid_component_name(component):
        raise HTTPException(status_code=400, detail="Nombre de componente inválido")
    file_path = find_code_file(component)
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Componente no encontrado")
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return CodeExample(**data)

def list_components() -> List[str]:
    if not os.path.exists(CODE_DIR):
        return []
    components = []
    for root, dirs, files in os.walk(CODE_DIR):
        for f in files:
            if f.endswith(".json"):
                components.append(f[:-5])
    return components
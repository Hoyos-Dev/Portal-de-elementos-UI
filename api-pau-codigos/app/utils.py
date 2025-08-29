import re

def is_valid_component_name(name: str) -> bool:
    # Permite letras, números, guiones, guiones bajos y slashes
    return re.match(r'^[a-zA-Z0-9_/-]+$', name) is not None
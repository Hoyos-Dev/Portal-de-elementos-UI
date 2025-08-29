from fastapi import APIRouter
from fastapi.responses import JSONResponse
from .services import get_code_example, list_components

router = APIRouter()

@router.get("/codigos/{component}")
def get_code(component: str):
    code = get_code_example(component)
    return JSONResponse(content=code.dict())

@router.get("/codigos")
def get_all_components():
    return {"components": list_components()}
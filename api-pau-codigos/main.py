from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI()

# Configuración de CORS (ajusta los orígenes en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto por los orígenes permitidos en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas de la app
app.include_router(router)


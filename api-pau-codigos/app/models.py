from pydantic import BaseModel
from typing import Optional, Dict

class CodeExample(BaseModel):
    component: str
    html: Optional[str] = None
    scss: Optional[str] = None
    ts: Optional[str] = None
    icons: Optional[Dict[str, str]] = None
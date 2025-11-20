"""API FastAPI simple para el gestor de tareas empresarial."""
from typing import List
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Gestor de Tareas Empresarial")


class Tarea(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    titulo: str
    descripcion: str
    estado: str = "pendiente"
    prioridad: str = "media"


db: List[Tarea] = []


@app.get("/health")
def health_check() -> dict:
    """Endpoint simple para monitoreo del backend."""
    return {"status": "ok", "total_tareas": len(db)}


@app.get("/tareas", response_model=List[Tarea])
def listar_tareas() -> List[Tarea]:
    """Devuelve todas las tareas almacenadas en memoria."""
    return db


@app.post("/tareas", response_model=Tarea, status_code=201)
def crear_tarea(payload: Tarea) -> Tarea:
    """Agrega una nueva tarea al listado."""
    db.append(payload)
    return payload


@app.put("/tareas/{tarea_id}", response_model=Tarea)
def actualizar_tarea(tarea_id: str, payload: Tarea) -> Tarea:
    for index, tarea in enumerate(db):
        if tarea.id == tarea_id:
            db[index] = payload
            return payload
    raise HTTPException(status_code=404, detail="Tarea no encontrada")


@app.delete("/tareas/{tarea_id}", status_code=204)
def eliminar_tarea(tarea_id: str) -> None:
    for tarea in db:
        if tarea.id == tarea_id:
            db.remove(tarea)
            return
    raise HTTPException(status_code=404, detail="Tarea no encontrada")

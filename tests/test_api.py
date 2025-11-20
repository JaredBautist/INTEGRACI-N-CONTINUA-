from fastapi.testclient import TestClient
import pytest

from app.main import app, db

client = TestClient(app)


@pytest.fixture(autouse=True)
def limpiar_db():
    """Restablece el estado de la lista en memoria antes de cada prueba."""
    db.clear()
    yield
    db.clear()


def test_listado_inicial_vacio():
    resp = client.get("/tareas")
    assert resp.status_code == 200
    assert resp.json() == []

def test_health_check_reporta_conteo():
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok", "total_tareas": 0}


def test_crear_y_listar_tareas():
    payload = {"titulo": "Reunión", "descripcion": "Planificar Q2"}
    resp = client.post("/tareas", json=payload)
    assert resp.status_code == 201
    tarea = resp.json()
    assert tarea["estado"] == "pendiente"
    assert tarea["prioridad"] == "media"

    listado = client.get("/tareas").json()
    assert tarea in listado
    assert len(listado) == 1


def test_actualizar_tarea():
    tarea = client.post("/tareas", json={"titulo": "Bugfix", "descripcion": "API"}).json()
    tarea["estado"] = "listo"
    tarea["prioridad"] = "alta"
    resp = client.put(f"/tareas/{tarea['id']}", json=tarea)
    assert resp.status_code == 200
    assert resp.json()["estado"] == "listo"
    assert resp.json()["prioridad"] == "alta"


def test_actualizar_tarea_inexistente():
    tarea = {"id": "no-existe", "titulo": "Nada", "descripcion": "NA", "estado": "pendiente", "prioridad": "media"}
    resp = client.put("/tareas/no-existe", json=tarea)
    assert resp.status_code == 404
    assert resp.json()["detail"] == "Tarea no encontrada"


def test_eliminar_tarea():
    tarea = client.post("/tareas", json={"titulo": "Demo", "descripcion": "Cliente"}).json()
    resp = client.delete(f"/tareas/{tarea['id']}")
    assert resp.status_code == 204
    listado = client.get("/tareas").json()
    assert tarea not in listado


def test_eliminar_tarea_inexistente():
    resp = client.delete("/tareas/no-existe")
    assert resp.status_code == 404
    assert resp.json()["detail"] == "Tarea no encontrada"

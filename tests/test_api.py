from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_crear_y_listar_tareas():
    payload = {"titulo": "Reunión", "descripcion": "Planificar Q2"}
    resp = client.post("/tareas", json=payload)
    assert resp.status_code == 201
    tarea = resp.json()
    listado = client.get("/tareas").json()
    assert tarea in listado


def test_actualizar_tarea():
    tarea = client.post("/tareas", json={"titulo": "Bugfix", "descripcion": "API"}).json()
    tarea["estado"] = "listo"
    resp = client.put(f"/tareas/{tarea['id']}", json=tarea)
    assert resp.status_code == 200
    assert resp.json()["estado"] == "listo"


def test_eliminar_tarea():
    tarea = client.post("/tareas", json={"titulo": "Demo", "descripcion": "Cliente"}).json()
    resp = client.delete(f"/tareas/{tarea['id']}")
    assert resp.status_code == 204
    listado = client.get("/tareas").json()
    assert tarea not in listado

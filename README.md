# Proyecto Caso Testigo - CI/CD

Implementación rápida para las actividades de las diapositivas 3 y 4.

## Backend FastAPI

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Pruebas:

```bash
pytest -q
```

## Docker Compose

```bash
docker compose up -d
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Pruebas React/Redux:

```bash
npm test
```

## Pipeline CI

Archivo `.github/workflows/ci.yml` listo para copiar al repositorio remoto.

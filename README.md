# Proyecto Caso Testigo – CI/CD completo

Implementación de un flujo CI/CD que responde a las actividades descritas en las diapositivas 3 y 4 del material **INTEGRACIÓN CONTINUA Y PROYECTO FINAL**. El objetivo es entregar un repositorio autocontenido con backend FastAPI, frontend React, pruebas automatizadas, Docker y pipeline GitHub Actions.

---

## 1. Arquitectura y stack

| Capa | Tecnologías | Descripción |
| --- | --- | --- |
| Backend | FastAPI, Uvicorn, SQLAlchemy (lista en memoria por defecto) | API REST de gestión de tareas con endpoints CRUD y pruebas unitarias |
| Base de datos | PostgreSQL (Docker) | Servicio `db` en `docker-compose.yml`; la API puede apuntar a él mediante `DATABASE_URL` |
| Frontend | React + Vite + Redux Toolkit + Axios | SPA ligera con 5 componentes principales, consumo de la API y estado global |
| Testing | Pytest + pytest-cov, Vitest + Testing Library, Playwright (opcional) | Cobertura mínima >80 % en backend, pruebas de componentes y opción E2E |
| CI/CD | GitHub Actions | Workflow `.github/workflows/ci.yml` con instalación, pruebas y cobertura |

Estructura relevante:
```
app/                # FastAPI
tests/              # Pytest con cobertura
frontend/           # SPA Vite + React
.github/workflows/  # Pipeline CI
docker-compose.yml  # Servicios API + PostgreSQL
```

---

## 2. Requisitos previos

- **Python 3.11+** (recomendado usar `py -3.11` en Windows para compatibilidad total)
- **Node.js 18+** y npm
- **Docker Desktop** (para correr PostgreSQL y/o empaquetar la API)
- **Git** para manejo de repositorio
- (Opcional) **Playwright** para pruebas E2E (`npx playwright install`)

---

## 3. Backend FastAPI

### Instalación (Windows PowerShell)
```powershell
cd "C:\Users\dylam\OneDrive\Desktop\CI Y CD\proyecto-caso-testigo-apellidos"
py -3.11 -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt
```
Linux/macOS:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Ejecutar la API
```bash
uvicorn app.main:app --reload
```
La documentación interactiva queda disponible en `http://localhost:8000/docs`.

### Pruebas y cobertura
```bash
pytest --cov=app --cov-report=term-missing
```
Este comando debe mostrar una cobertura ≥ 80 %. Adjunta la salida como evidencia en la entrega final (captura o badge).

---

## 4. Docker Compose

`docker-compose.yml` crea dos servicios:
- `api`: construye la imagen del backend (`Dockerfile`) y expone el puerto `8000`.
- `db`: contenedor PostgreSQL 15 con credenciales `admin/admin`.

Comandos:
```bash
docker compose up --build
# detener
docker compose down
```
Si solo necesitas la base de datos, ejecuta `docker compose up -d db`.

---

## 5. Frontend React + Redux

Instalación y servidor de desarrollo:
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

Pruebas unitarias y de cobertura:
```bash
npm test
npm run test:coverage
```
(Vitest hace uso de `@vitest/coverage-v8` para generar el reporte).

Conexión al backend: el archivo `src/api.ts` apunta por defecto a `http://localhost:8000`. Para ambientes distintos, crea un `.env` con `VITE_API_URL=https://tu-api`.

---

## 6. Pipeline CI/CD (GitHub Actions)

El workflow `CI` realiza:
1. Checkout del repositorio.
2. Instalación de Python 3.11 y dependencias (`pip install -r requirements.txt`).
3. Ejecución de `pytest -q`.

Variables relevantes:
- `PYTHONPATH=${{ github.workspace }}` para que los imports funcionen sin ajustes.

Para cumplir con “historial de al menos 10 builds exitosos”:
1. Realiza commits frecuentes (documentación, mejoras menores).
2. Verifica en la pestaña **Actions** que cada push genere un build verde.
3. Toma captura del listado de 10+ ejecuciones exitosas como evidencia.

---

## 7. Entregables de la rúbrica

| Entregable | Estado / cómo cumplir |
| --- | --- |
| Repositorio GitHub con código documentado | ✅ Este repo contiene backend, frontend, Docker, CI. Mantén actualizado el README y comentarios clave. |
| Pipeline CI/CD (≥10 builds verdes) | ⚙️ Sigue empujando commits menores hasta acumular mínimo 10 ejecuciones exitosas en GitHub Actions. |
| Suite de pruebas con cobertura >80 % | ⚙️ Ejecuta `pytest --cov=app` y `npm run test:coverage`, adjunta reporte/capturas. Añade pruebas adicionales si el porcentaje cae. |
| Documentación técnica en README | ✅ Secciones 1–6 documentan arquitectura, instalación, pruebas y CI. Agrega detalles específicos de tu entorno si cambias algo. |
| Video demostración (10 min) | ⚙️ Graba con OBS/Zoom mostrando: 1) API y pruebas, 2) Frontend, 3) Docker, 4) Pipeline en GitHub Actions. Comparte enlace en el README o plataforma. |
| Presentación ejecutiva (10 slides) | ⚙️ Prepara deck con: objetivos, arquitectura, pipeline, métricas (cobertura, builds), riesgos y lecciones aprendidas. Incluye enlace/referencia aquí cuando lo tengas. |

Sugerencia: crea una sección “Evidencias” al final del README con enlaces a la grabación y la presentación, más capturas de cobertura y de los builds.

### Evidencias (en preparación)

- [ ] Reporte de cobertura backend (`pytest --cov=app --cov-report=term-missing`) adjunto como captura en `docs/`.
- [ ] Reporte de cobertura frontend (`npm run test:coverage`) adjunto como captura en `docs/`.
- [ ] Historial GitHub Actions con ≥10 ejecuciones verdes (captura listada en `docs/`).
- [ ] Enlace al video final de 10 minutos.
- [ ] Enlace a la presentación ejecutiva (HTML/PDF).

---

## 8. Comandos rápidos (resumen)

```bash
# Backend
py -3.11 -m venv .venv && .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
pytest --cov=app --cov-report=term-missing

# Docker
docker compose up --build
docker compose down

# Frontend
cd frontend
npm install
npm run dev
npm test
npm run test:coverage

# CI local (opcional)
pytest -q && cd frontend && npm test
```

---

## 9. Próximos pasos sugeridos
1. Ejecutar los comandos de cobertura y guardar los artefactos (logs/capturas) en la carpeta `docs/` o subidos al README.
2. Preparar el video y la presentación ejecutiva con base en los resultados.
3. Completar las 10 ejecuciones exitosas del pipeline antes de entregar.

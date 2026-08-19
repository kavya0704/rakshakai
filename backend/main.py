from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import init_db
from routers import (
    auth,
    events,
    incidents,
    patrols,
    equipment,
    reports,
    simulation,
    ai,
    websocket
)

app = FastAPI(
    title="Rakshak AI — Core Intelligence API",
    description="Operational Intelligence, Event Correlation & Decision Support Layer for Border Operations",
    version="1.0.0"
)

# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all domain routers
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(incidents.router)
app.include_router(patrols.router)
app.include_router(equipment.router)
app.include_router(reports.router)
app.include_router(simulation.router)
app.include_router(ai.router)
app.include_router(websocket.router)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/health", tags=["system"])
async def health_check():
    return {
        "status": "healthy",
        "service": "Rakshak AI Core Engine",
        "version": "1.0.0",
        "model": settings.GROQ_MODEL,
        "env": settings.APP_ENV
    }

@app.get("/", tags=["system"])
async def root():
    return {
        "name": "Rakshak AI API",
        "status": "active",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

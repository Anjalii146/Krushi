from fastapi import FastAPI
from routers import health
from api.v1 import scan

app = FastAPI(
    title="Krushi API",
    description="High-performance backend for Krushi — offline-first precision agriculture platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.include_router(health.router)
app.include_router(scan.router)

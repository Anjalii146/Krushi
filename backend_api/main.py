from fastapi import FastAPI
from routers import health

app = FastAPI(title="Krushi API", description="Backend API for Krushi")

app.include_router(health.router)

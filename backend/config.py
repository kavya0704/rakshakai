from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_ENV: str = "development"
    APP_SECRET_KEY: str = "rakshak_ai_secret_key_change_in_prod"
    JWT_SECRET: str = "rakshak_jwt_secret_key_sih_2026"
    JWT_EXPIRE_HOURS: int = 8

    # Groq Cloud LLM
    GROQ_API_KEY: str = "gsk_demo_groq_api_key_placeholder"
    GROQ_MODEL: str = "llama3-70b-8192"
    GROQ_TIMEOUT_SECONDS: int = 10

    # Database URL
    DATABASE_URL: str = "sqlite+aiosqlite:///./rakshak_ai.db"

    # CORS
    FRONTEND_ORIGIN: str = "http://localhost:3000"

    # Simulation Defaults
    SIMULATION_AUTO_START: bool = False
    SIMULATION_INTERVAL_SECONDS: int = 30
    CORRELATION_TIME_WINDOW_SECONDS: int = 600
    CORRELATION_MIN_SOURCES: int = 2

    # CV
    CV_ENABLED: bool = False
    CV_CONFIDENCE_THRESHOLD: float = 0.5

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

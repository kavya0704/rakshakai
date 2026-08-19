@echo off
title RAKSHAK AI - Launcher
echo ========================================================
echo   RAKSHAK AI: OPERATIONAL INTELLIGENCE PLATFORM (SIH 2026)
echo ========================================================
echo.
echo [1/3] Starting Backend API & Groq LPU Bus on Port 8000...
start "Rakshak AI Backend" /min cmd /k "cd /d e:\rakshak ai\backend && .\venv\Scripts\python.exe -m uvicorn main:app --host 0.0.0.0 --port 8000"

echo [2/3] Starting Frontend Command Console on Port 3000...
start "Rakshak AI Frontend" /min cmd /k "cd /d e:\rakshak ai\frontend && npm run start"

echo [3/3] Waiting for services to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Launching Command Center in default browser...
start http://localhost:3000
echo.
echo ========================================================
echo   RAKSHAK AI IS RUNNING LIVE!
echo   Frontend : http://localhost:3000
echo   Backend  : http://localhost:8000/docs
echo ========================================================
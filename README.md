# RAKSHAK AI 🛡️
### AI-Powered Multi-Source Operational Intelligence, Event Correlation & Decision-Support Layer for Border Security

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH%202026-SIH--1642-blue?style=for-the-badge&logo=shield)](https://sih.gov.in)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js 14](https://img.shields.io/badge/Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Groq LPU](https://img.shields.io/badge/Groq%20LPU-LLaMA--3%2070B-orange?style=for-the-badge)](https://groq.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

---

## 📌 Executive Overview

> **"From fragmented observations to unified operational intelligence — AI Recommends, Human Decides."**

**Rakshak AI** is an AI-powered operational intelligence, event-correlation, risk-assessment, and decision-support layer designed for high-altitude border security operations (e.g. Indo-Tibetan Border Police in Ladakh, Sikkim, and Uttarakhand).

### ⚠️ System Boundaries & Positioning
- **Rakshak AI is NOT an anti-drone weapon, missile interception system, or kinetic attack platform.**
- **Rakshak AI is NOT a replacement for existing Indian defence/C4ISR systems.**
- **Rakshak AI IS an intelligence correlation layer** that fuses fragmented observations (ground seismic sensors, thermal optical masts, drone observers, weather telemetry, vehicle condition) into an explainable, prioritized operational picture.
- **Human-in-the-Loop Enforced**: Person detected $\ne$ Threat detected. AI calculates transparent risk scores ($0–100$) and recommends patrol responses, but all tactical dispatch actions strictly require human officer authorization.

---

## 🏛️ System Architecture

```
                                  MULTI-SOURCE OBSERVATION FEEDS
    [ Ground Seismic Sensors ]  [ Long-Range Thermal Masts ]  [ Drone Recon UAVs ]  [ Weather Telemetry ]
               │                            │                          │                       │
               └────────────────────────────┼──────────────────────────┴───────────────────────┘
                                            ▼
                    ┌───────────────────────────────────────────────────────────┐
                    │       SPATIO-TEMPORAL EVENT CORRELATION CORE              │
                    │   • Sliding Window (ΔT ≤ 600s)                            │
                    │   • Sector Geofenced Spatial Proximity (~120m tolerance)  │
                    │   • Multi-Source Cross-Corroboration Threshold (≥2 Feeds) │
                    └─────────────────────────────┬─────────────────────────────┘
                                                  ▼
                    ┌───────────────────────────────────────────────────────────┐
                    │            EXPLAINABLE RISK SCORING ENGINE (0-100)        │
                    │   • Source Count (+25)   • Sensitive Sector (+20)         │
                    │   • Time Persistence (+17) • Night Surveillance (+10)     │
                    │   • Detection Confidence (+10) • Cold/Blizzard (+8)       │
                    └─────────────────────────────┬─────────────────────────────┘
                                                  ▼
                    ┌───────────────────────────────────────────────────────────┐
                    │             GROQ LPU LLaMA-3 (70B) SYNTHESIS             │
                    │   • Sub-0.4s Natural Language Situation Briefs            │
                    │   • Transparent "Why Prioritized" Rationale               │
                    └─────────────────────────────┬─────────────────────────────┘
                                                  ▼
                    ┌───────────────────────────────────────────────────────────┐
                    │             TERRAIN-AWARE PATROL ROUTING ENGINE           │
                    │   • Haversine Distance × High-Altitude Terrain Multiplier  │
                    │   • Resource Recommendation: Unit T03 (Charlie-3, 08 min) │
                    └─────────────────────────────┬─────────────────────────────┘
                                                  ▼
                    ┌───────────────────────────────────────────────────────────┐
                    │          HUMAN-IN-THE-LOOP COMMAND & CONTROL UI           │
                    │  [ Approve Recommendation ]   [ Request Info ]   [ Dismiss ]
                    └───────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Modules & UI Features

1. **Operational Overview (`/dashboard`)**: 6 Live KPI metric cards (Active Incidents: 07, High Priority: 02, Monitored Sources: 28, Available Patrols: 14, Equipment Alerts: 04, System Health: 98.6%).
2. **Live Situation Map (`/map`)**: Dark Matter Leaflet tactical map with sector polygon boundaries, pulsing threat radius, and floating **Picture-in-Picture Thermal Infrared Video Stream** with target bounding boxes.
3. **Active Correlated Incidents (`/incidents`)**: Incident #1042 chronometer timeline, circular Risk 82/100 gauge with 5 transparent contributing factor bars, and human decision action buttons.
4. **Signature Event Correlation Graph (`/correlation`)**: Vector visual graph demonstrating multi-sensor fusion.
5. **Rakshak AI Intelligence Assistant (`/ai`)**: Conversational tactical assistant powered by **Groq LPU LLaMA-3 (70B)** with real-time operational context.
6. **Response Resource Routing (`/patrols`)**: Real-time status and terrain-factored ETAs for Unit T01, Unit T02, and Unit T03 (Charlie-3 - RECOMMENDED).
7. **Equipment Health & Telemetry (`/equipment`)**: Condition monitoring for Tatra 8x8 Transport V12 and Netra UAVs with Recharts historical area charts.
8. **Data Sources Monitoring (`/sources`)**: Health status of 5 feed categories + **Manual Drone Operator Observation Form** for field intelligence input.
9. **After-Action Reports (`/reports`)**: Formal ITBP-style 4-section after-action reports with live Groq AI generation and 1-click printable export.
10. **System Audit Log (`/audit`)**: Cryptographically timestamped action logs for military accountability.
11. **Simulation Control Center (`/simulation`)**: Judge Evaluation Console with 5 anomaly triggers and an automated **7-Stage Cascading SIH Demo Sequence**.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, Recharts, React-Leaflet, Zustand.
- **Backend API**: Python 3.11+, FastAPI (Async Core), Pydantic v2, Uvicorn.
- **Database & ORM**: SQLAlchemy 2.0 (Async), SQLite / PostgreSQL.
- **AI & LLM Inference**: Groq Cloud API (LPU Inference Engine running LLaMA-3 70B).
- **Authentication**: Native bcrypt password hashing + JWT Access Tokens with role-based authorization (`Commander`, `Officer`, `Observer`).

---

## ⚡ Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd "rakshak ai"
```

### 2. Configure Environment Variables
Copy `.env.example` to `backend/.env` and insert your Groq API key:
```bash
cp .env.example backend/.env
```

### 3. One-Click Windows Launcher
Double-click **`run_rakshak.bat`** in the root directory!

---

### Manual Launch (Terminal by Terminal)

#### Terminal 1 — Backend API (:8000)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python seed/seed_data.py
python -m uvicorn main:app --reload --port 8000
```

#### Terminal 2 — Frontend UI (:3000)
```bash
cd frontend
npm install
npm run dev
```

Open [**http://localhost:3000**](http://localhost:3000) in your browser.

---

## 🔑 Demo Evaluation Credentials

| Role | Operator Identifier | Passcode | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Command Operator** | `commander` | `demo123` | Full tactical authority, simulation triggers, dispatch override |
| **Duty Officer** | `officer1` | `demo123` | Live monitoring, patrol assignment, incident review & reports |
| **Recon Observer** | `observer` | `demo123` | Read-only operational overview & equipment telemetry |

*(Or simply use the 1-Click Evaluation Login buttons on `/login`!)*

---

## 📄 License & Disclaimer
Developed for **Smart India Hackathon 2026 (SIH-2026-DEF-1642)** by **Team InnoVortex**.  
*Disclaimer: All geographic coordinates, sectors, telemetry readings, and incidents are simulated for demonstration purposes.*
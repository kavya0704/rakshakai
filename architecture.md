# Rakshak AI — System Architecture

> **Project:** Rakshak AI — SIH Prototype  
> **Classification:** Simulated Data Only | Not connected to real ITBP infrastructure  
> **Architecture Style:** Modular Monorepo · REST API · Event-Driven Simulation · Human-in-the-Loop

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [High-Level System Diagram](#2-high-level-system-diagram)
3. [Monorepo Folder Structure](#3-monorepo-folder-structure)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Backend Architecture](#5-backend-architecture)
6. [Database Architecture](#6-database-architecture)
7. [AI & ML Architecture](#7-ai--ml-architecture)
8. [Authentication & Authorization](#8-authentication--authorization)
9. [Real-Time Communication](#9-real-time-communication)
10. [Environment Configuration](#10-environment-configuration)
11. [API Reference Overview](#11-api-reference-overview)
12. [Data Flow — End-to-End Demo Scenario](#12-data-flow--end-to-end-demo-scenario)
13. [Module Interaction Map](#13-module-interaction-map)
14. [Security Architecture](#14-security-architecture)
15. [Deployment Architecture](#15-deployment-architecture)
16. [Scalability & Extensibility](#16-scalability--extensibility)
17. [Technology Decision Summary](#17-technology-decision-summary)

---

## 1. Architecture Overview

Rakshak AI follows a **3-tier client-server architecture** with a dedicated AI/ML service layer and a real-time WebSocket channel for live dashboard updates.

```
+------------------+        HTTPS / WebSocket        +------------------+
|                  | <------------------------------> |                  |
|    FRONTEND      |                                  |    BACKEND       |
|  Next.js/React   |         REST API (JSON)          |  Python/FastAPI  |
|  TypeScript      | <------------------------------> |                  |
|  Tailwind CSS    |                                  |  Services Layer  |
|                  |                                  |  AI Engines      |
+------------------+                                  +--------+---------+
                                                               |
                              +--------------------------------+
                              |                |               |
                    +---------+------+  +------+------+  +----+-------+
                    |                |  |             |  |            |
                    |   DATABASE     |  |  GROQ API   |  |  CV ENGINE |
                    | Firebase /     |  | (LLM Cloud) |  | OpenCV /   |
                    | PostgreSQL     |  |             |  | YOLO       |
                    +----------------+  +-------------+  +------------+
```

### Core Design Principles

| Principle | Implementation |
|---|---|
| **Human-in-the-Loop** | No autonomous action; every state change requires officer confirmation |
| **Modular Services** | Each engine (correlation, risk, patrol, equipment) is an independent service |
| **Graceful Degradation** | System works without Groq AI using rule-based fallbacks |
| **Simulated Data Layer** | Simulation engine replaces real sensor feeds for the SIH prototype |
| **Transparent AI** | All AI outputs include source data and contributing factors |
| **Prototype Boundaries** | Fictional locations, synthetic data, clearly labeled as demo |

---

## 2. High-Level System Diagram

```
+=========================================================================+
|                          RAKSHAK AI SYSTEM                              |
+=========================================================================+

  [SIMULATED DATA SOURCES]
  +----------+  +----------+  +----------+  +----------+  +----------+
  | Camera   |  | Drone    |  | Ground   |  | Patrol   |  | Weather  |
  | Feed Sim |  | Feed Sim |  | Sensor   |  | Reports  |  | Data     |
  +----+-----+  +----+-----+  +----+-----+  +----+-----+  +----+-----+
       |              |              |              |              |
       +------+-------+--------------+--------------+--------------+
              |
              v
  +------------------------------+
  |    SIMULATION ENGINE         |  <-- Generates synthetic events
  |    (Python background tasks) |
  +-------------+----------------+
                |
                v
  +------------------------------+
  |    EVENT INGESTION API       |  POST /api/events
  +-------------+----------------+
                |
                v
  +------------------------------+
  |    EVENT STORE (DB)          |  All raw events persisted
  +-------------+----------------+
                |
                v
  +------------------------------+
  |  EVENT CORRELATION ENGINE    |  Groups events by location +
  |                              |  time window + source type
  +-------------+----------------+
                |
                v
  +------------------------------+
  |    RISK SCORING ENGINE       |  0-100 score w/ explainable factors
  +-------------+----------------+
                |
           +----+----+
           |         |
           v         v
  +----------+   +------------------+
  | GROQ AI  |   | PATROL           |
  | SUMMARY  |   | RECOMMENDATION   |
  | SERVICE  |   | ENGINE           |
  +----+-----+   +--------+---------+
       |                  |
       +--------+---------+
                |
                v
  +------------------------------+
  |     INCIDENT RECORD (DB)     |  Full audit trail
  +-------------+----------------+
                |
                v
  +------------------------------+
  |   WEBSOCKET BROADCAST        |  Pushes live updates to dashboard
  +-------------+----------------+
                |
                v
  +------------------------------+
  |    NEXT.JS DASHBOARD         |  Officer sees: alert, score,
  |    (React Frontend)          |  AI summary, patrol recommendation
  +-------------+----------------+
                |
      [OFFICER ACTION REQUIRED]
                |
                v
  +------------------------------+
  |   INCIDENT MANAGEMENT API    |  POST /api/incidents/{id}/assign
  |                              |  POST /api/incidents/{id}/resolve
  +-------------+----------------+
                |
                v
  +------------------------------+
  |   REPORT GENERATION          |  Groq converts record to report
  +------------------------------+
```

---

## 3. Monorepo Folder Structure

```
rakshak-ai/
|
+-- frontend/                        # Next.js / React Application
|   +-- app/
|   |   +-- (auth)/
|   |   |   +-- login/
|   |   |       +-- page.tsx
|   |   +-- (dashboard)/
|   |       +-- layout.tsx           # Shared sidebar + topbar
|   |       +-- page.tsx             # Command Center
|   |       +-- map/
|   |       |   +-- page.tsx         # Live Situational Map
|   |       +-- incidents/
|   |       |   +-- page.tsx         # Incidents list
|   |       |   +-- [id]/page.tsx    # Incident detail
|   |       +-- equipment/
|   |       |   +-- page.tsx         # Equipment Health
|   |       |   +-- [id]/page.tsx    # Asset detail
|   |       +-- intelligence/
|   |       |   +-- page.tsx         # AI Intelligence + Assistant
|   |       +-- reports/
|   |       |   +-- page.tsx         # Reports
|   |       +-- simulation/
|   |           +-- page.tsx         # Simulation Control Panel
|   |
|   +-- components/
|   |   +-- dashboard/
|   |   |   +-- MetricsBar.tsx
|   |   |   +-- IncidentFeed.tsx
|   |   |   +-- SystemStatus.tsx
|   |   |   +-- AISummaryPanel.tsx
|   |   +-- map/
|   |   |   +-- OperationalMap.tsx
|   |   |   +-- SectorLayer.tsx
|   |   |   +-- IncidentMarker.tsx
|   |   |   +-- PatrolMarker.tsx
|   |   +-- incidents/
|   |   |   +-- IncidentCard.tsx
|   |   |   +-- IncidentDetail.tsx
|   |   |   +-- RiskScoreBar.tsx
|   |   |   +-- ContributingFactors.tsx
|   |   |   +-- PatrolRecommendation.tsx
|   |   |   +-- OfficerActionPanel.tsx
|   |   +-- equipment/
|   |   |   +-- AssetCard.tsx
|   |   |   +-- TelemetryDisplay.tsx
|   |   |   +-- HealthGauge.tsx
|   |   |   +-- MaintenanceHistory.tsx
|   |   +-- intelligence/
|   |   |   +-- AIAssistant.tsx
|   |   |   +-- SituationSummary.tsx
|   |   +-- simulation/
|   |   |   +-- SimulationControls.tsx
|   |   +-- shared/
|   |       +-- SeverityBadge.tsx
|   |       +-- StatusIndicator.tsx
|   |       +-- Loader.tsx
|   |       +-- ErrorBoundary.tsx
|   |       +-- ConfirmDialog.tsx
|   |
|   +-- hooks/
|   |   +-- useWebSocket.ts
|   |   +-- useIncidents.ts
|   |   +-- useEquipment.ts
|   |   +-- usePatrols.ts
|   |   +-- useSimulation.ts
|   |
|   +-- lib/
|   |   +-- api.ts                   # Axios API client
|   |   +-- auth.ts
|   |   +-- formatters.ts
|   |
|   +-- types/
|   |   +-- incident.ts
|   |   +-- event.ts
|   |   +-- patrol.ts
|   |   +-- asset.ts
|   |   +-- telemetry.ts
|   |
|   +-- .env.local
|   +-- next.config.ts
|   +-- tailwind.config.ts
|   +-- tsconfig.json
|   +-- package.json
|
+-- backend/                         # Python / FastAPI Application
|   +-- main.py                      # App entry point
|   +-- config.py                    # Settings from env vars
|   +-- database.py                  # DB connection
|   |
|   +-- routers/
|   |   +-- events.py
|   |   +-- incidents.py
|   |   +-- patrols.py
|   |   +-- equipment.py
|   |   +-- reports.py
|   |   +-- simulation.py
|   |   +-- ai.py
|   |   +-- auth.py
|   |   +-- websocket.py
|   |
|   +-- services/
|   |   +-- groq_service.py          # All Groq API calls
|   |   +-- correlation_engine.py
|   |   +-- risk_engine.py
|   |   +-- patrol_engine.py
|   |   +-- equipment_engine.py
|   |   +-- report_service.py
|   |   +-- notification_service.py  # WebSocket broadcast manager
|   |
|   +-- simulation/
|   |   +-- engine.py
|   |   +-- generators/
|   |   |   +-- sensor_generator.py
|   |   |   +-- camera_generator.py
|   |   |   +-- drone_generator.py
|   |   |   +-- weather_generator.py
|   |   |   +-- patrol_generator.py
|   |   |   +-- telemetry_generator.py
|   |   +-- scenarios/
|   |       +-- correlated_incident.py
|   |       +-- equipment_degradation.py
|   |
|   +-- models/
|   |   +-- event.py
|   |   +-- incident.py
|   |   +-- patrol.py
|   |   +-- asset.py
|   |   +-- telemetry.py
|   |   +-- report.py
|   |   +-- user.py
|   |
|   +-- cv/
|   |   +-- detector.py              # YOLO + OpenCV wrapper
|   |   +-- context_evaluator.py
|   |   +-- demo_stream.py
|   |
|   +-- ml/
|   |   +-- equipment_health_model.py
|   |   +-- train.py
|   |   +-- artifacts/               # Saved .pkl model files
|   |
|   +-- seed/
|   |   +-- seed_data.py
|   |   +-- data/
|   |       +-- patrols.json
|   |       +-- assets.json
|   |       +-- sectors.json
|   |
|   +-- tests/
|   |   +-- test_correlation.py
|   |   +-- test_risk_engine.py
|   |   +-- test_patrol_engine.py
|   |   +-- test_equipment_engine.py
|   |   +-- test_groq_service.py
|   |
|   +-- .env
|   +-- requirements.txt
|   +-- Dockerfile
|
+-- docs/
|   +-- architecture.md              # This file
|   +-- Rakshak_AI_Detailed_Problem_Statement.md
|   +-- api_reference.md
|   +-- demo_script.md
|
+-- docker-compose.yml
+-- README.md
+-- .gitignore
+-- .env.example
```

---

## 4. Frontend Architecture

### 4.1 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14+ (App Router) | Full-stack React framework, SSR, routing |
| React | 18+ | UI component library |
| TypeScript | 5+ | Static typing, code safety |
| Tailwind CSS | 3+ | Utility-first styling |
| shadcn/ui | Latest | Accessible component primitives |
| Leaflet.js | 1.9+ | Interactive operational map |
| Recharts | 2+ | Telemetry charts, risk trends |
| Axios | 1+ | HTTP client for REST API |
| SWR | 2+ | Data fetching, caching, revalidation |
| Zustand | 4+ | Global state management |

### 4.2 Page Routing

```
/login                      Public — demo login page
/                           Protected — redirects to /dashboard
/dashboard                  Command Center (default)
/dashboard/map              Live Situational Map
/dashboard/incidents        Incidents list
/dashboard/incidents/[id]   Incident detail + officer action panel
/dashboard/equipment        Equipment health overview
/dashboard/equipment/[id]   Asset detail + telemetry history
/dashboard/intelligence     AI summaries + AI assistant chat
/dashboard/reports          Reports
/dashboard/simulation       Simulation control panel
```

### 4.3 Component Hierarchy

```
app/layout.tsx (Root)
+-- AuthProvider
+-- WebSocketProvider        <- Manages live WS connection
+-- (dashboard)/layout.tsx
    +-- Sidebar
    |   +-- NavItems
    |   +-- SystemStatusBar
    +-- Topbar
    |   +-- ActiveIncidentCount (live badge)
    |   +-- UserBadge + Role
    +-- page.tsx (Command Center)
        +-- MetricsBar
        |   +-- MetricCard (x5)
        +-- TwoColumnGrid
            +-- OperationalMap
            |   +-- SectorLayer
            |   +-- IncidentMarker[]
            |   +-- PatrolMarker[]
            +-- RightPanel
                +-- AISummaryPanel
                +-- RecentIncidentFeed
                    +-- IncidentCard[]
```

### 4.4 State Management (Zustand Stores)

```
useIncidentStore
  incidents[]        All loaded incidents
  activeIncident     Currently viewed incident
  filters            Active / Review / Resolved

useEquipmentStore
  assets[]
  telemetryHistory{} Keyed by asset ID

usePatrolStore
  units[]
  selectedUnit

useSimulationStore
  isSimulating
  lastSimulatedEvent

useAuthStore
  user
  role               commander | officer | observer
  token
```

### 4.5 Real-Time WebSocket Updates

```
useWebSocket hook  ->  ws://backend/ws/dashboard

On message type received:
  "incident_created"  -> add to store + toast alert (CRITICAL = audible)
  "incident_updated"  -> update incident in store
  "event_detected"    -> update event feed
  "patrol_updated"    -> refresh patrol positions on map
  "equipment_alert"   -> badge on equipment nav item

Auto-reconnect: exponential backoff (1s -> 2s -> 4s -> 8s)
Heartbeat ping: every 30 seconds
```

---

## 5. Backend Architecture

### 5.1 Tech Stack

| Technology | Purpose |
|---|---|
| Python 3.11+ | Primary backend language |
| FastAPI 0.110+ | Async REST API + WebSocket |
| Pydantic v2 | Data validation and serialization |
| uvicorn | ASGI server |
| firebase-admin | Firestore SDK |
| SQLAlchemy 2+ | ORM (PostgreSQL option) |
| APScheduler | Background simulation tasks |
| python-jose | JWT authentication |
| httpx | Async HTTP client (Groq API calls) |
| opencv-python | Computer vision |
| ultralytics (YOLOv8) | Object detection |
| scikit-learn | Equipment health ML model |
| pandas + numpy | Data processing |

### 5.2 API Router Layout

```
main.py
+-- CORS middleware (frontend origin only)
+-- Auth middleware (JWT on protected routes)
+-- Exception handlers
+-- Routers:
    /api/auth        -> auth.py
    /api/events      -> events.py
    /api/incidents   -> incidents.py
    /api/patrols     -> patrols.py
    /api/equipment   -> equipment.py
    /api/reports     -> reports.py
    /api/simulate    -> simulation.py
    /api/ai          -> ai.py
    /ws/dashboard    -> websocket.py  (WebSocket endpoint)
```

### 5.3 Service Layer

```
GroqService
  summarize_incident(data)  -> str
  explain_risk(data)        -> str
  generate_report(data)     -> str
  answer_query(q, context)  -> str
  _fallback_summary(data)   -> str   (Groq unavailable fallback)

CorrelationEngine
  ingest_event(event)       -> None
  find_correlations(event)  -> List[Group]
  create_incident(group)    -> Incident
  _time_window_match(e1,e2) -> bool
  _location_match(e1,e2)    -> bool

RiskEngine
  score_incident(incident)      -> RiskScore
  _factor_source_count(events)  -> int
  _factor_zone_sensitivity(s)   -> int
  _factor_time_context(ts)      -> int
  _factor_weather(conditions)   -> int
  _factor_repetition(events)    -> int
  _factor_confidence(events)    -> int
  _factor_history(sector)       -> int

PatrolEngine
  recommend(incident)           -> PatrolRecommendation
  _calculate_eta(unit, loc)     -> float
  _apply_terrain_factor(dist)   -> float
  get_available_units()         -> List[PatrolUnit]

EquipmentEngine
  assess_asset(asset_id)        -> HealthAssessment
  compute_health_score(tel)     -> int
  classify_risk(score)          -> str
  recommend_action(assessment)  -> str
  _check_thresholds(telemetry)  -> List[ThresholdBreach]

ReportService
  generate(incident_id)         -> Report
  _build_timeline(events)       -> List[TimelineEntry]

NotificationService
  broadcast(event_type, payload) -> None
  register_client(ws)            -> None
  deregister_client(ws)          -> None
```

### 5.4 Simulation Engine

```
SimulationEngine
  trigger_sensor_anomaly(sector?)           -> Event
  trigger_camera_detection(sector?)         -> Event
  trigger_drone_detection(sector?)          -> Event
  trigger_weather_alert()                   -> Event
  trigger_equipment_degradation(asset_id?)  -> TelemetryUpdate
  trigger_correlated_incident()             -> List[Event]  [MAIN DEMO]

Correlated Incident Sequence:
  T+0.0s  sensor anomaly   (sector B12)  -> ingest -> no match yet
  T+2.0s  camera motion    (sector B12)  -> ingest -> 2 sources matched
                                                    -> draft incident created
  T+4.0s  drone detection  (sector B12)  -> ingest -> 3 sources matched
                                                    -> HIGH confidence
                                                    -> risk scored
                                                    -> Groq summary
                                                    -> patrol recommended
                                                    -> broadcast to dashboard
```

### 5.5 Event Correlation Algorithm

```
Time Window:     600 seconds (configurable via env)
Location Match:  Same sector code (e.g., "B12")
Source Match:    Must be different source types
Threshold:       >= 2 sources -> create incident
                 >= 3 sources -> HIGH confidence

Algorithm:
  on ingest_event(new_event):
    for each buffered_event in event_buffer:
      if same_sector AND within_time_window AND different_source:
        add both to correlation group
    if group.size >= THRESHOLD:
      create_or_update_incident(group)
```

### 5.6 Risk Scoring Formula

```
Factor                              Max Points  Calculation
----------------------------------  ----------  ----------------------------
Multiple independent sources           +25      Linear: 2 sources=+15, 3+=+25
Sensitive / restricted zone            +20      Zone sensitivity lookup table
Repeated or sustained detections       +17      Count of events per source
Unusual timing (22:00 - 05:00)         +10      Hour-of-day check
High detection confidence (avg)        +10      avg_confidence * 10
Adverse weather conditions             +8       Weather severity enum (0-3)
Historical incidents in sector         +10      past_incidents / 10 (capped)

Total Score = sum of factors (capped at 100)

Thresholds:
  0-30   -> LOW
  31-60  -> MEDIUM
  61-80  -> HIGH
  81-100 -> CRITICAL
```

### 5.7 Patrol Recommendation Algorithm

```
1. Fetch patrol units with status = AVAILABLE
2. For each unit:
   a. distance_km = haversine(unit.location, incident.location)
   b. terrain_factor = sector_terrain_map[unit.sector]
   c. eta_minutes = (distance_km / 40.0) * 60 * terrain_factor
3. Sort ascending by eta_minutes
4. Return top 3; flag index 0 as RECOMMENDED

Terrain Factors:
  plains:     x1.0
  hills:      x1.4
  mountains:  x2.0
  snowbound:  x2.5
```

### 5.8 Equipment Health Algorithm

```
def compute_health_score(telemetry, maintenance):
    score = 100

    # Engine temperature
    if telemetry.engine_temp > 90:    score -= 20
    elif telemetry.engine_temp > 85:  score -= 10

    # Vibration
    if telemetry.vibration > 4.0:     score -= 20
    elif telemetry.vibration > 3.5:   score -= 10

    # Oil pressure
    if telemetry.oil_pressure < 30:   score -= 25
    elif telemetry.oil_pressure < 35: score -= 15

    # Battery voltage
    if telemetry.battery_voltage < 11.5: score -= 15

    # Overdue service
    overdue = max(0, maintenance.hours_since_service - SERVICE_INTERVAL)
    score -= min(20, (overdue / SERVICE_INTERVAL) * 20)

    # Fault codes
    score -= len(telemetry.fault_codes) * 8

    return max(0, score)

Risk Classification:
  80-100 -> LOW
  60-79  -> MEDIUM
  40-59  -> HIGH
  0-39   -> CRITICAL
```

### 5.9 Groq AI Service Design

```python
# backend/services/groq_service.py  (structure)

SYSTEM_PROMPT = """
You are Rakshak AI, an operational intelligence assistant for border security 
decision support. You receive structured incident data and produce concise, 
factual operational summaries. You do not speculate beyond the provided data.
You do not make autonomous tactical decisions. All summaries recommend 
human officer review.
"""

# Input: structured JSON (never raw system access)
# Output: plain-text 2-4 sentence summary
# Fallback: deterministic template when Groq is unavailable
# Timeout: 10 seconds
# Model: llama3-70b-8192 or mixtral-8x7b-32768
```

---

## 6. Database Architecture

### 6.1 Schema

```
events
  id, source, event_type, timestamp, sector, lat, lon,
  confidence, severity, raw_data, correlation_id

incidents
  id, created_at, sector, related_event_ids[], data_sources[],
  risk_score, severity, confidence, contributing_factors[],
  ai_summary, recommended_action, patrol_recommended,
  officer_action, assigned_unit, status, resolved_at,
  resolution_notes, officer_id

patrol_units
  id, name, sector, lat, lon, status, current_assignment,
  simulated_eta_minutes, last_updated

assets
  id, type, name, sector, status, health_score,
  maintenance_risk, last_assessed

equipment_telemetry
  equipment_id, timestamp, engine_temp, vibration,
  oil_pressure, battery_voltage, operating_hours,
  last_service_hours_ago, fault_codes[]

maintenance_records
  asset_id, service_date, service_type, technician,
  hours_at_service, notes, next_due_hours

reports
  id, incident_id, generated_at, generated_by,
  content_json, ai_text, officer_notes

users
  id, username, role, hashed_password, last_login

audit_log  [append-only — no updates/deletes]
  id, timestamp, user_id, action, entity_type, entity_id, details
```

### 6.2 Data Write Path

```
Simulation -> events -> CorrelationEngine -> incidents (create)
                                          -> RiskEngine (update score)
                                          -> GroqService (update summary)
                                          -> PatrolEngine (update recommendation)
                                          -> NotificationService (broadcast)
                                          -> Officer action
                                          -> incidents (update status)
                                          -> audit_log (append)
                                          -> ReportService -> reports (create)
```

---

## 7. AI & ML Architecture

### 7.1 Groq LLM Integration

```
Flow:
  Frontend (never calls Groq)
      |
      v  HTTPS
  Backend /api/ai/* routes
      |
      v
  GroqService
      |  HTTPS (server-side only)
      v
  api.groq.com

Security:
  - GROQ_API_KEY: env var, backend only, never in browser
  - Rate limit handling: exponential backoff
  - Timeout: 10 seconds
  - Fallback: deterministic template
```

**Prompt Design:**
```
[SYSTEM]  Rakshak AI operational assistant. Answer only from provided data.

[USER]
{
  "task": "summarize_incident",
  "sector": "B12",
  "risk_score": 82,
  "risk_severity": "CRITICAL",
  "events": ["sensor anomaly", "camera motion", "drone detection"],
  "weather": "low visibility",
  "nearest_patrol": "P03",
  "patrol_eta": 8
}

[OUTPUT]  2-4 sentence factual operational summary.
```

### 7.2 Computer Vision Pipeline

```
Demo video stream (mp4 / webcam)
    |
    v
OpenCV frame capture
    |
    v
YOLOv8 inference
    Detected: person | vehicle | unknown object
    |
    v
context_evaluator.py
    Is location in restricted_zones[]?    +1 flag
    Is time in 22:00-05:00 window?        +1 flag
    Is visibility currently LOW?          +1 flag
    Other source reporting same sector?   +1 flag
    |
    v
Risk classification:
    0-2 flags -> LOW   (log only)
    3 flags   -> MEDIUM (create observation event)
    4 flags   -> HIGH  (create event -> ingested to correlation engine)
```

### 7.3 Equipment ML Model

```
Model: RandomForestClassifier (scikit-learn)
Purpose: Secondary layer — classifies maintenance risk from telemetry

Features:
  engine_temp_normalized, vibration_normalized,
  oil_pressure_normalized, battery_voltage_normalized,
  hours_since_service_normalized, fault_code_count

Output classes: LOW | MEDIUM | HIGH | CRITICAL

Artifacts:
  backend/ml/artifacts/equipment_health_model.pkl
  backend/ml/artifacts/scaler.pkl

Note: Rule-based thresholds are the primary method.
      ML model is a supplementary demonstrator.
```

---

## 8. Authentication & Authorization

```
Auth Flow:
  1. POST /api/auth/login { username, password }
  2. Backend validates against seeded demo users
  3. Returns: { access_token (JWT, 8hr expiry), role }
  4. Frontend stores token in React memory (NOT localStorage)
  5. All requests: Authorization: Bearer <token>
  6. FastAPI dependency validates JWT on every protected route

Demo Users (from seed data):
  commander / demo123   -> Full access + simulation controls
  officer1  / demo123   -> View + acknowledge/assign/resolve
  observer  / demo123   -> View only (no action buttons rendered)

JWT Payload:
  { user_id, username, role, exp }

Secret: JWT_SECRET from environment variable
```

---

## 9. Real-Time Communication

```
WebSocket endpoint:  /ws/dashboard?token=<jwt>

ConnectionManager:
  active_connections: List[WebSocket]
  connect(ws)    -> validate JWT, add to list
  disconnect(ws) -> remove from list
  broadcast(msg) -> send to all connected clients

Message Schema:
  {
    "type": "incident_created" | "incident_updated" | "event_detected"
            | "patrol_updated" | "equipment_alert" | "ping",
    "payload": { ... },
    "timestamp": "2026-08-18T14:01:00Z"
  }

Frontend:
  - Auto-reconnects with exponential backoff (1s, 2s, 4s, 8s)
  - Heartbeat ping every 30s
  - CRITICAL incidents trigger toast + optional audible alert
  - Updates dispatched to appropriate Zustand store slices
```

---

## 10. Environment Configuration

```bash
# backend/.env  (NEVER commit — add to .gitignore)

APP_ENV=development
APP_SECRET_KEY=your-secret-key
JWT_SECRET=your-jwt-secret
JWT_EXPIRE_HOURS=8

# Groq AI
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama3-70b-8192
GROQ_TIMEOUT_SECONDS=10

# Database (Firebase OR PostgreSQL — pick one)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
# OR
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/rakshak_ai

# CORS
FRONTEND_ORIGIN=http://localhost:3000

# Simulation
SIMULATION_AUTO_START=false
SIMULATION_INTERVAL_SECONDS=30
CORRELATION_TIME_WINDOW_SECONDS=600
CORRELATION_MIN_SOURCES=2

# Computer Vision
CV_ENABLED=true
CV_MODEL_PATH=./cv/models/yolov8n.pt
CV_CONFIDENCE_THRESHOLD=0.5
```

```bash
# frontend/.env.local

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_APP_NAME=Rakshak AI
NEXT_PUBLIC_IS_DEMO=true
```

---

## 11. API Reference Overview

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/refresh` | Bearer | Refresh access token |

### Events

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/events` | Bearer | List events (paginated) |
| POST | `/api/events` | Bearer | Ingest new event |
| GET | `/api/events/{id}` | Bearer | Single event detail |

### Incidents

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/incidents` | Bearer | List incidents (filter: status, severity, sector) |
| GET | `/api/incidents/{id}` | Bearer | Full incident detail |
| POST | `/api/incidents/{id}/acknowledge` | Officer+ | Officer acknowledges |
| POST | `/api/incidents/{id}/assign` | Officer+ | Assign patrol `{unit_id}` |
| POST | `/api/incidents/{id}/resolve` | Officer+ | Resolve `{notes}` |
| POST | `/api/incidents/{id}/dismiss` | Officer+ | Dismiss as false positive |

### Patrols

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/patrols` | Bearer | All patrol units + status |
| GET | `/api/patrols/{id}` | Bearer | Unit detail |

### Equipment

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/equipment` | Bearer | All assets with health scores |
| GET | `/api/equipment/{id}` | Bearer | Asset detail + maintenance |
| GET | `/api/equipment/{id}/telemetry` | Bearer | Latest readings |
| GET | `/api/equipment/{id}/telemetry/history` | Bearer | Historical time range |
| POST | `/api/equipment/{id}/assess` | Officer+ | Re-run health assessment |

### Reports

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/reports` | Bearer | List reports |
| GET | `/api/reports/{id}` | Bearer | Report detail |
| POST | `/api/reports/generate` | Officer+ | Generate for incident `{incident_id}` |

### AI

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/ai/summarize` | Bearer | AI summary for incident |
| POST | `/api/ai/explain-risk` | Bearer | Explain risk score |
| POST | `/api/ai/ask` | Bearer | Natural language query `{question}` |

### Simulation

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/simulate/sensor-anomaly` | Commander | Single sensor event |
| POST | `/api/simulate/camera-detection` | Commander | Single camera event |
| POST | `/api/simulate/drone-detection` | Commander | Single drone event |
| POST | `/api/simulate/weather-alert` | Commander | Weather change |
| POST | `/api/simulate/equipment-degradation` | Commander | Degrade asset |
| POST | `/api/simulate/correlated-incident` | Commander | **Full demo scenario** |
| POST | `/api/simulate/reset` | Commander | Reset to baseline |

### WebSocket

| Protocol | Endpoint | Description |
|---|---|---|
| WS | `/ws/dashboard?token=<jwt>` | Real-time dashboard updates |

---

## 12. Data Flow — End-to-End Demo Scenario

```
STEP 1: Officer clicks [ SIMULATE CORRELATED INCIDENT ]
  -> POST /api/simulate/correlated-incident

STEP 2: simulation/scenarios/correlated_incident.py runs:

  T+0.0s:
    generate Event: sensor_anomaly, sector B12
    -> CorrelationEngine.ingest(event_1)
    -> Buffer: [event_1]  no match yet

  T+2.0s:
    generate Event: camera_motion, sector B12
    -> CorrelationEngine.ingest(event_2)
    -> Match: event_1 (same sector, within window, different source)
    -> Group size = 2 -> THRESHOLD MET
    -> incidents.create({ status: "correlating" })

  T+4.0s:
    generate Event: drone_detection, sector B12
    -> CorrelationEngine.ingest(event_3)
    -> Group size = 3 -> HIGH CONFIDENCE
    ->
       RiskEngine.score()
         risk_score = 82, severity = CRITICAL
         factors = [sources:+25, zone:+20, timing:+10, ...]
       ->
          GroqService.summarize()
            ai_summary = "Multiple correlated observations..."
          ->
             PatrolEngine.recommend()
               recommended = P03 (3km, ETA 8min)
             ->
                incidents.update({
                  risk_score: 82,
                  severity: CRITICAL,
                  ai_summary: "...",
                  patrol_recommended: "P03",
                  status: "new"
                })
                ->
                   audit_log.write(action: "incident_created")
                   ->
                      NotificationService.broadcast({
                        type: "incident_created",
                        payload: incident
                      })

STEP 3: Frontend receives WebSocket message
  -> Toast: "CRITICAL INCIDENT — Sector B12"
  -> useIncidentStore updated
  -> Dashboard metrics refresh
  -> Map shows red incident marker at B12

STEP 4: Officer clicks [ ASSIGN PATROL P03 ]
  -> POST /api/incidents/{id}/assign { unit_id: "P03" }
  -> Backend:
       incident.status = "under_response"
       incident.assigned_unit = "P03"
       patrol_units.P03.status = "en_route"
       audit_log.write(action: "assign_patrol", user_id: officer_id)
       broadcast({ type: "incident_updated" })
       broadcast({ type: "patrol_updated" })
  -> Map: P03 marker moves toward B12
  -> Incident status badge: UNDER RESPONSE

STEP 5: Officer clicks [ MARK RESOLVED ]
  -> POST /api/incidents/{id}/resolve { notes: "Area clear, no threat confirmed." }
  -> Backend:
       incident.status = "resolved"
       incident.resolved_at = now()
       patrol_units.P03.status = "available"
       audit_log.write(action: "resolve")
       ReportService.generate(incident_id)
         -> Groq generates report text
         -> reports.create(report)
       broadcast({ type: "incident_updated" })
  -> Incident status: RESOLVED
  -> Report available in /dashboard/reports
```

---

## 13. Module Interaction Map

```
+------------------+  ingest   +------------------+
|  Simulation      |---------> |  Event Store     |
|  Engine          |           |  (DB)            |
+------------------+           +--------+---------+
                                        |
                                        v
                               +--------+---------+
                               | Correlation      |
                               | Engine           |
                               +--------+---------+
                                        |
                          creates / updates Incident
                                        |
             +-----------+-------------+-----------+
             |           |                         |
             v           v                         v
    +--------+--+  +-----+--------+      +---------+---------+
    |  Risk     |  |  Groq AI     |      |  Patrol Engine    |
    |  Engine   |  |  Service     |      +--------+----------+
    +--------+--+  +-----+--------+               |
             |           |                         |
             +-----------+-------------------------+
                         |
                    writes to
                         |
                         v
             +-----------+----------+
             |   Incident Record    |
             |   (DB)               |
             +-----------+----------+
                         |
                    broadcasts
                         |
                         v
             +-----------+----------+
             |  Notification Svc    |
             |  (WebSocket Manager) |
             +-----------+----------+
                         |
                         v
             +-----------+----------+
             |  Next.js Dashboard   |
             +-----------+----------+
                         |
                  Officer Action
                         |
                         v
             +-----------+----------+
             |  Incident API        |
             |  (assign / resolve)  |
             +-----------+----------+
                         |
              +-----------+-----------+
              |                       |
              v                       v
     +--------+------+     +----------+------+
     | Incident (DB) |     | Audit Log (DB)  |
     | (updated)     |     | (append-only)   |
     +---------------+     +-----------------+
              |
        triggers report
              |
              v
     +--------+------+
     | Report Service|
     | -> reports DB |
     +---------------+
```

---

## 14. Security Architecture

```
Layer 1: NETWORK
  - HTTPS/WSS in production (TLS 1.3)
  - CORS: frontend origin only
  - Rate limiting on /api/auth/* (5 req/min per IP)

Layer 2: AUTHENTICATION
  - JWT tokens (HS256, 8hr expiry)
  - Stored in React memory — NOT localStorage or cookies
  - Validated via FastAPI dependency injection on every protected route

Layer 3: AUTHORIZATION
  Role hierarchy: commander > officer > observer
  - observer:   GET endpoints only
  - officer:    GET + acknowledge/assign/resolve/generate-report
  - commander:  Full access + simulation controls

Layer 4: SECRET MANAGEMENT
  - GROQ_API_KEY:   env var, backend only, never in browser bundle
  - JWT_SECRET:     env var, backend only
  - DB credentials: env var, backend only
  - .env never committed (.gitignore)
  - .env.example committed (template, no real values)

Layer 5: DATA SAFETY
  - All locations: fictional sectors (no real ITBP coordinates)
  - All incidents: synthetic simulation data
  - No PII stored (no real personnel data)
  - UI labeled "PROTOTYPE / DEMO" where appropriate

Layer 6: AUDIT TRAIL
  - Every officer action written to audit_log (append-only)
  - Fields: user_id, role, action, entity_id, timestamp, details
  - No UPDATE or DELETE endpoints for audit_log
```

---

## 15. Deployment Architecture

### Local Development

```bash
# Using Docker Compose (recommended)
docker-compose up

# Services exposed:
#   Frontend  -> http://localhost:3000
#   Backend   -> http://localhost:8000
#   DB        -> localhost:5432  (if using PostgreSQL)
```

```yaml
# docker-compose.yml (simplified)

version: "3.9"
services:

  frontend:
    build: ./frontend
    ports: ["3000:3000"]
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
      - NEXT_PUBLIC_WS_URL=ws://localhost:8000
    depends_on: [backend]

  backend:
    build: ./backend
    ports: ["8000:8000"]
    env_file: ./backend/.env
    volumes: ["./backend:/app"]
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: rakshak_ai
      POSTGRES_USER: rakshak
      POSTGRES_PASSWORD: demo_password
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

volumes:
  pgdata:
```

### Cloud Production (SIH Demo)

```
+------------------+       +------------------+       +------------------+
|  Vercel /        |       |  Railway /       |       |  Firebase /      |
|  Netlify         | <---> |  Render /        | <---> |  Supabase /      |
|                  |       |  Fly.io          |       |  Neon DB         |
|  Frontend        | HTTPS |  Backend         | SDK   |  Database        |
|  (Next.js)       |  WS   |  (FastAPI)       |       |                  |
+------------------+       +--------+---------+       +------------------+
                                    |
                                    | HTTPS
                                    v
                            +-------+-------+
                            |   GROQ API    |
                            |  (Cloud LLM)  |
                            +---------------+
```

---

## 16. Scalability & Extensibility

### Replacing Simulated Sources with Real Data

Each simulation generator is isolated and produces the same normalized `Event` schema.
Replacements are drop-in without touching any other module:

| Simulated Source | Future Real Integration |
|---|---|
| `sensor_generator.py` | Physical IoT sensor MQTT broker |
| `camera_generator.py` | RTSP camera stream / VMS API |
| `drone_generator.py` | Drone telemetry REST API |
| `weather_generator.py` | IMD / OpenWeather API |
| `patrol_generator.py` | ITBP patrol tracking system API |

### Adding New Risk Factors

1. Add `_factor_*()` method to `RiskEngine`
2. Call it in `score_incident()`
3. Add factor label to frontend `ContributingFactors.tsx`

### Adding New Data Sources

1. Create generator in `simulation/generators/`
2. Add source type to `Event.source` enum
3. Include in correlation engine's source-type diversity logic
4. No changes to risk engine, patrol engine, or frontend needed

### Multi-Worker Scaling

```
Current (single process):
  uvicorn main:app --workers 1
  WebSocket broadcast works natively

Future (multi-worker):
  uvicorn main:app --workers N
  Add Redis Pub/Sub for cross-worker WebSocket broadcast
  NotificationService.broadcast() -> publish to Redis channel
  Each worker subscribes to Redis -> forwards to its connected clients
```

---

## 17. Technology Decision Summary

| Decision | Choice | Rationale |
|---|---|---|
| Frontend framework | Next.js 14 (App Router) | SSR, routing, TypeScript-first, Vercel deploy |
| Backend framework | FastAPI | Async, fast, auto OpenAPI docs, native WebSocket |
| LLM provider | Groq | Fast inference, free tier fits SIH demo scale |
| Database | Firebase or PostgreSQL | Firebase: quick setup; PostgreSQL: relational power |
| Real-time layer | Native FastAPI WebSocket | Simple, no extra broker for single-node demo |
| CV model | YOLOv8 (Ultralytics) | Best speed/accuracy, Python-native, easy setup |
| State management | Zustand | Lightweight, no boilerplate, integrates with SWR |
| ML library | scikit-learn | Sufficient for tabular equipment health scoring |
| Authentication | JWT (python-jose) | Stateless, role-aware, standard for REST APIs |
| Styling | Tailwind CSS + shadcn/ui | Professional UI, rapid development, accessible |

---

*Architecture Version: 1.0 | Project: Rakshak AI | SIH Prototype — Simulated Data Only*

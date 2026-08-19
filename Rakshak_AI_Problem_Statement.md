# Rakshak AI — SIH Prototype Problem Statement & Product Specification

## 1. Project Identity

**Project Name:** Rakshak AI

**Tagline:** AI-Powered Operational Intelligence & Decision Support

**Primary Goal:** Build a functional SIH prototype of an AI-powered decision-support platform for ITBP-style border operations. The platform must NOT claim to replace existing ITBP systems, surveillance infrastructure, personnel, or command authority.

Rakshak AI is a software intelligence layer that demonstrates how information from multiple existing/simulated sources can be unified, correlated, prioritized, and converted into useful operational recommendations.

---

# 2. Core Problem Statement

Modern border-security operations can involve many information sources: surveillance feeds, drones, sensors, patrol information, environmental conditions, equipment telemetry, maintenance records, and incident reports.

The challenge is not simply collecting more data. The challenge is helping an officer quickly understand:

1. What is happening?
2. Is the event actually important?
3. How serious is it?
4. Are multiple data sources describing the same situation?
5. Which available resource is appropriate?
6. Does equipment require inspection or maintenance?
7. What action should the officer consider?

Existing systems may already provide individual surveillance, communication, sensing, mapping, or equipment information. Rakshak AI should therefore NOT be positioned as a replacement for those systems.

Instead, Rakshak AI acts as an **AI-powered integration, correlation, prioritization, and decision-support layer** on top of existing or simulated data sources.

---

# 3. Core Concept

The complete Rakshak AI workflow is:

Data Sources
    ↓
Data Integration
    ↓
AI / Rule-Based Analysis
    ↓
Event Correlation
    ↓
Risk Assessment
    ↓
Prioritization
    ↓
Operational Recommendation
    ↓
Human Officer Decision
    ↓
Incident / Action Logging

The most important principle is:

> Rakshak AI should turn raw information into actionable context, while keeping the final decision with the authorized human operator.

---

# 4. What Rakshak AI Is NOT

Do NOT build or describe the system as:

- A replacement for ITBP.
- A replacement for trained personnel.
- A fully autonomous military command system.
- A system that independently authorizes force or tactical action.
- A system requiring installation of expensive sensors on every asset.
- A claim that the prototype is production-ready for real border deployment.
- A source of real classified or operational ITBP information.
- A system that guarantees a vehicle will fail or a threat is genuine.
- Does NOT intercept, jam, spoof GPS of, or take control of any drone
- Does NOT physically neutralize or destroy any threat
- Does NOT replace India's existing counter-drone or anti-drone infrastructure
- Does NOT automatically classify any detected object or entity as a confirmed threat
- Does NOT make tactical decisions autonomously — every action requires human authorization

The prototype must use simulated/demo data unless authorized real data is available.

---

# 5. Main USP

## "From fragmented data to actionable operational intelligence."

Rakshak AI should not merely display alerts.

It should combine information from multiple sources and determine whether apparently separate events may be related.

Example:

Camera:
> Movement detected in Sector B12.

Sensor:
> Abnormal activity detected near B12.

Drone:
> Possible human presence detected.

Weather:
> Low visibility / severe weather.

Patrol:
> Unit P03 available nearby.

Rakshak AI:

> **Potential correlated incident detected in Sector B12.**
>
> Risk Score: 82/100
> Severity: HIGH
> Confidence: 87%
>
> Recommended action:
> Review the incident and consider dispatching the nearest suitable patrol unit.

This cross-source correlation and prioritization should be the central innovation of the prototype.

---

# 6. Primary Modules

Build only features that support the central workflow. Avoid unnecessary features.

## Module A — Command Center Dashboard

Create a professional command-center dashboard.

Display:

- Active incidents
- High-priority alerts
- Anomalies
- Available patrol units
- Equipment health warnings
- Current operational status
- Interactive simulated map
- AI situation summary
- Recent incidents
- System/data-source status

Example top-level metrics:

- Active Incidents: 03
- High Priority: 01
- Anomalies: 07
- Available Patrols: 12
- Equipment at Risk: 04

The dashboard must be functional, not just decorative.

---

# 7. Module B — Multi-Source Event Detection & Anomaly Taxonomy

Create simulated data sources:

1. Camera / video feed
2. Drone feed
3. Ground sensor
4. Patrol report
5. Weather/environment data
6. Equipment telemetry
7. Maintenance records

These are simulated for the SIH prototype.

Do NOT imply that the prototype is connected to real ITBP infrastructure.

## Anomaly Taxonomy

Rakshak AI is designed to handle five categories of operational anomaly:

### A. Aerial Anomalies
- Unidentified or suspicious drone detected by camera, sensor, or observer drone
- Unexpected aerial activity in restricted airspace
- Unusual flight pattern or loitering near sensitive zone
- Aerial object of unknown origin or classification

### B. Ground Anomalies
- Unidentified vehicle detected or tracked
- Unexpected movement detected in a restricted or sensitive zone
- Object detected in an unusual location or time context
- Repeated ground-level activity in the same sector

### C. Human Activity
- Person detected in an area where human presence is unusual (does NOT automatically = threat)
- Movement pattern inconsistent with normal patrol or civilian activity
- Operator-reported suspicious activity

> **Important:** "Person detected" must never automatically become "threat detected." The system evaluates context — zone, time, weather, corroborating sources — before assigning any risk level.

### D. Sensor & System Anomalies
- Unexpected sensor reading (vibration, pressure, proximity, thermal)
- Sensor offline or malfunctioning
- Repeated anomalous readings from a single source without corroboration

### E. Environmental & Operational Anomalies
- Weather severely affecting sensor visibility or capability
- Camera feed unavailable or significantly degraded
- Drone observation asset offline or unavailable
- Communication or data-source disruption affecting situational awareness

---

# 8. Module C — Anomaly Detection & Context Evaluation

Rakshak AI's detection module handles all five anomaly categories — aerial, ground, human, sensor, and environmental — not just human presence. The context evaluation pipeline below applies equally to any detected entity or anomaly type.

For a demo video stream, use computer vision where practical.

Possible implementation:

- Python
- OpenCV
- YOLO or another suitable object-detection model

Detect demo objects such as:

- Person
- Vehicle
- Other configured objects

The system should NOT automatically label every detected person as a threat.

Instead:

Object Detection
    ↓
Context Evaluation
    ↓
Restricted/Sensitive Zone Check
    ↓
Time / environmental context
    ↓
Cross-source correlation
    ↓
Risk assessment

Example:

> Person detected

does NOT automatically mean:

> Threat detected.

It may instead create an observation requiring contextual analysis.

| Example Table | Detection | Automatic Threat? |
|---|---|---|
| Person in open zone, daytime | Observation | No — context required |
| Unidentified drone, restricted airspace | Aerial anomaly | No — officer review required |
| Vehicle at unusual hour, sensitive zone | Ground anomaly | No — risk-scored, officer reviews |

## Drone Workflow — Two Distinct Roles

Drones operate in two distinct modes within Rakshak AI:

### Role A — Drone as Observer (most common)
The drone is an authorized ITBP observation platform:
- Drone provides video feed, GPS-tagged timestamp, and location metadata
- Computer vision processes frames for object/anomaly detection
- Detection results become normalized event objects ingested by the correlation engine

Example event:
```json
{
  "type": "aerial_observation",
  "source": "DRONE_OBSERVER",
  "detected_class": "unidentified_aerial_object",
  "location": "B12",
  "timestamp": "14:32",
  "confidence": 0.87
}
```

### Role B — Drone as Subject (anomaly)
An unidentified or suspicious drone is itself the anomalous event being detected:
- Detected by camera, ground sensor, or observer drone
- Treated as an `aerial_object_detected` event
- Flows through: correlation → risk scoring → AI summary → officer review

> **Critical:** Rakshak AI does NOT intercept, jam, spoof GPS of, take control of, or physically neutralize any drone. It ONLY detects, correlates, risk-scores, and recommends human officer review.

---

# 9. High-Altitude & Remote Environment Considerations

Some ITBP operating environments are remote, high-altitude (Ladakh, Uttarakhand, Sikkim, Arunachal Pradesh border sectors), extremely cold, and difficult to access.

Rakshak AI is NOT designed exclusively around the assumption that suspicious human border crossing is the primary or only threat type.

In remote and high-altitude sectors, the primary anomaly types may include:

- **Unidentified aerial activity** — drones or aerial objects in restricted airspace
- **Vehicle and object anomalies** — at known access points and passes
- **Sensor anomalies** — caused by extreme weather, ice, or hardware stress
- **Environmental/operational anomalies** — blizzards and whiteout conditions affecting data sources

Human activity remains fully supported across all sectors but is NOT the sole focus of the platform.

Rakshak AI adapts to sector-specific threat profiles. Different sectors can have different risk weighting and anomaly type priorities configured through the system.

> Rakshak AI is a **Border Surveillance & Operational Anomaly Intelligence Platform** — a broad, adaptable intelligence layer, not a single-use surveillance tool.

---

# 10. Module D — Event Correlation Engine

This is one of the most important modules.

The system should correlate events by:

- Location
- Time
- Event type
- Source
- Severity
- Repeated occurrences

Example:

10:31 — Ground sensor anomaly in B12

10:33 — Camera movement in B12

10:35 — Drone detects possible human presence in B12

Rakshak AI groups these into:

> **Correlated Incident #1042**

instead of showing three unrelated alerts.

This reduces alert overload and helps an operator focus on important situations.

---

# 11. Module E — Risk Scoring

Create a transparent 0–100 risk score.

Example factors:

- Event type
- Location sensitivity
- Number of independent sources
- Repeated detections
- Time context
- Environmental conditions
- Historical incident context
- Confidence of detection

Example:

Risk Score: 82/100

Severity:

- 0–30 = LOW
- 31–60 = MEDIUM
- 61–80 = HIGH
- 81–100 = CRITICAL

Important:

The score is a **decision-support indicator**, not proof that an event is a real threat.

Show the factors contributing to the score.

Example:

Risk Score: 82

Contributors:
- Multiple independent sources: +25
- Sensitive zone: +20
- Repeated activity: +17
- Unusual timing: +10
- Detection confidence: +10

---

# 12. Module F — AI Situation Summary

Use Groq AI for natural-language summarization and explanation.

The AI should receive structured event information, not uncontrolled raw system access.

Example input:

{
  "sector": "B12",
  "events": [
    "sensor anomaly",
    "camera movement",
    "possible human detection"
  ],
  "weather": "low visibility",
  "nearest_available_patrol": "P03",
  "risk_score": 82
}

Groq AI should generate a concise operational summary such as:

> "Multiple correlated observations were detected in Sector B12 within a short time window. The system has classified the situation as high priority. Patrol P03 is the nearest available unit. Operator review is recommended."

Do not ask the LLM to independently make irreversible decisions.

Use Groq AI primarily for:

- Situation summaries
- Incident explanations
- Natural-language analysis
- Report generation
- Operator Q&A over available structured data

---

# 13. Module G — Patrol Recommendation

This is a recommendation feature, not autonomous dispatch.

For simulated patrol units, store:

- Unit ID
- Current location
- Availability
- Distance to incident
- Estimated travel time
- Simulated terrain difficulty
- Current assignment

When an incident is created, calculate suitable patrol options.

Example:

P01 — 12 km — available
P02 — 7 km — busy
P03 — 3 km — available

Recommendation:

> P03 — Recommended based on availability and simulated proximity.

The officer must still approve the action.

Example UI:

[ REVIEW INCIDENT ]

[ DISPATCH / ASSIGN ]

Do not claim the AI has authority to autonomously deploy real personnel.

---

# 14. Module H — Predictive Equipment Maintenance

This feature should be cost-conscious.

Do NOT design the system around putting expensive new sensors on every piece of equipment.

The prototype should support a combination of:

- Existing telemetry where available
- Maintenance history
- Operating hours
- Fault codes
- Simulated sensor readings
- Optional additional sensor data for selected high-risk assets

Example vehicle data:

Vehicle V12

- Engine temperature: 91°C
- Vibration: 4.8 mm/s
- Oil pressure: 31 PSI
- Operating hours: 4,820
- Last service: 310 hours ago
- Fault codes: 2

Output:

> Maintenance Risk: HIGH

Recommendation:

> Schedule inspection.

Important:

Never state:
> "The vehicle will definitely fail."

Instead say:
> "The vehicle shows indicators associated with increased maintenance risk."

---

# 15. Cost-Efficient Monitoring Strategy

A major design principle is **risk-based monitoring**.

Do not assume every asset needs expensive additional sensors.

Concept:

Existing data
    ↓
Risk analysis
    ↓
Low-risk asset → normal monitoring

High-risk / critical asset
    ↓
Enhanced monitoring recommended

This makes Rakshak AI more scalable and cost-conscious.

The prototype can demonstrate this using simulated equipment data.

---

# 16. Module I — Incident Management

Every significant event should create an incident record.

Incident record should contain:

- Incident ID
- Date/time
- Sector/location
- Source(s)
- Event type
- Risk score
- Confidence
- Contributing factors
- Recommended action
- Officer action
- Status
- Resolution time
- Notes

Example:

INCIDENT #1042

Sector: B12
Risk: 82/100
Sources: Camera + Sensor + Drone
Status: Under Review

Recommended:
Review and consider assigning P03.

---

# 17. Module J — Automated Reporting

Allow the operator to generate a structured incident report.

The report can include:

- Incident summary
- Timeline
- Data sources
- Risk assessment
- Recommended action
- Officer decision
- Resolution

Use Groq AI to convert structured incident data into readable text.

The generated report must clearly distinguish:

- Observed data
- AI-generated interpretation
- Operator decision

---

# 18. Human-in-the-Loop Principle

This must be visible throughout the UI.

Rakshak AI:

Detects → Analyzes → Prioritizes → Recommends

Officer:

Reviews → Approves / Rejects → Acts

The system must not autonomously authorize real-world tactical action.

This makes the prototype safer, more realistic, and easier to defend before judges.

---

# 19. Suggested Technical Architecture

Frontend:

- Next.js / React
- TypeScript
- Tailwind CSS
- Modern component library where useful

Backend:

- Python
- FastAPI

AI:

- Groq API
- A suitable Groq-supported LLM
- Prompted structured analysis
- JSON responses where practical

Computer Vision:

- Python
- OpenCV
- YOLO if feasible

ML:

- Python
- scikit-learn
- pandas
- NumPy

Database:

- Firebase or PostgreSQL

Maps:

- Use a simulated operational map.
- Use fictional/synthetic sectors and coordinates.
- Do not use or expose sensitive real operational locations.

Authentication:

- Role-based demo login if needed.

---

# 20. Groq AI Integration

The application must read the Groq API key from an environment variable.

Example:

GROQ_API_KEY=your_key_here

Never hard-code the key into frontend code.

Never expose the key in client-side JavaScript.

All Groq calls should happen server-side.

Create a clean AI service layer such as:

backend/services/groq_service.py

Use Groq for:

1. Situation summarization
2. Incident explanation
3. Report generation
4. Structured operational Q&A
5. Optional anomaly interpretation

The application should still work when Groq is unavailable.

Implement graceful fallback behavior using deterministic summaries/rules.

---

# 21. AI Assistant

Add an optional "Rakshak AI Assistant" panel.

Example user questions:

> "Summarize active high-priority incidents."

> "Why is Incident #1042 high risk?"

> "Which patrol units are currently available?"

> "Show equipment with high maintenance risk."

> "Generate a summary of today's incidents."

The assistant must answer only from the application's available structured data.

It should not invent operational facts.

If information is unavailable, it must say so.

---

# 22. Simulation Engine

Because real ITBP operational data is unavailable for the prototype, create a simulation layer.

The simulation should generate:

- Sensor events
- Camera detections
- Drone observations
- Patrol positions
- Equipment telemetry
- Weather changes
- Incidents

Provide buttons such as:

[ Simulate Sensor Anomaly ]

[ Simulate Camera Detection ]

[ Simulate Drone Detection ]

[ Simulate Correlated Incident ]

[ Simulate Equipment Degradation ]

[ Simulate Aerial Anomaly ] — Generates an aerial object detection event (unidentified drone/aerial object detected)

[ Simulate Ground Anomaly ] — Generates a vehicle or object detection in a restricted zone

[ Simulate Environmental Anomaly ] — Generates a sensor or camera outage event

The strongest demo should be:

### "Simulate Correlated Incident"

It should trigger the full workflow:

Event 1
→ Event 2
→ Event 3
→ Correlation
→ Risk score
→ AI summary
→ Patrol recommendation
→ Operator decision
→ Incident log

---

# 23. Main SIH Demo Scenario

Create one polished end-to-end scenario.

Initial state:

- No critical incidents
- Patrols available
- Equipment mostly healthy

Then click:

## SIMULATE INCIDENT

System generates:

10:31 — Sensor anomaly in Sector B12

10:33 — Camera detects movement

10:35 — Drone observer detects aerial/ground anomaly in Sector B12

System correlates the events.

Dashboard displays:

> CORRELATED INCIDENT DETECTED

Risk: 82/100

Severity: HIGH

Sources: 3

Groq AI generates:

> "Multiple correlated observations were detected in Sector B12 within a short interval. The system has classified the incident as high priority based on cross-source agreement and contextual factors."

Then:

Nearest suitable simulated patrol:

P03

Officer reviews the recommendation.

Officer clicks:

[ ASSIGN PATROL ]

The map updates.

The incident status changes:

UNDER RESPONSE

Then:

[ MARK RESOLVED ]

The system generates the incident report.

This single flow should demonstrate most of the project's value.

---

# 24. UI / UX Direction

The UI should look like a professional modern command center.

Style:

- Dark professional interface
- High information density but clean layout
- Clear typography
- Subtle glass/modern UI where appropriate
- Maps and data visualizations
- Clear severity indicators
- Smooth but restrained animations
- Responsive design
- No unnecessary flashy effects

Avoid making it look like a gaming website.

The product should feel like:

"Serious operational intelligence software."

---

# 25. Required Main Pages

## 1. Login

- Secure-looking demo login
- Rakshak AI branding

## 2. Command Center

Main dashboard.

## 3. Live Situational Map

- Simulated sectors
- Incidents
- Patrols
- Sensor events

## 4. Incidents

- Active
- Under review
- Resolved
- Incident details

## 5. Equipment Health

- Vehicle/equipment list
- Health score
- Maintenance risk
- Telemetry
- Maintenance history

## 6. AI Intelligence

- Situation summaries
- Correlation insights
- AI assistant

## 7. Reports

- Incident reports
- AI-generated summaries
- Export/print if practical

---

# 26. Data Model

Create realistic but synthetic demo data.

Entities:

### Asset

- id
- type
- name
- location
- status
- health_score
- maintenance_risk

### Patrol

- id
- location
- status
- availability
- simulated_eta

### Event

- id
- source
- event_type
- timestamp
- location
- confidence
- severity

### Incident

- id
- location
- timestamp
- related_events
- risk_score
- status
- recommendation
- operator_action

### EquipmentTelemetry

- equipment_id
- temperature
- vibration
- oil_pressure
- battery_voltage
- operating_hours
- timestamp

---

# 27. Important Security / Privacy Constraints

Because this is an SIH prototype:

- Use fictional locations.
- Use synthetic data.
- Do not request classified ITBP data.
- Do not use real sensitive patrol routes.
- Do not hard-code secrets.
- Keep API keys server-side.
- Do not expose personal information.
- Clearly label the application as a prototype/demo when appropriate.

---

# 28. What Makes This Different

The strongest differentiation is NOT:

"AI surveillance."

The stronger proposition is:

### Multi-source intelligence fusion + event correlation + risk prioritization + decision support.

Rakshak AI should demonstrate:

1. Existing/simulated data ingestion
2. Cross-source event correlation
3. Transparent risk scoring
4. AI-generated situation summaries
5. Resource recommendation
6. Equipment maintenance risk
7. Human approval
8. Automated incident reporting

---

# 29. What NOT to Waste Development Time On

Do not prioritize:

- Hundreds of settings pages
- Unnecessary chatbot features
- Complex social features
- Real hardware deployment
- Real border data
- Real-world tactical automation
- Excessive animations
- Dozens of AI models
- Fake "100% accurate" claims
- Features that do not support the core workflow

Prioritize functionality and a convincing end-to-end demonstration.

---

# 30. Success Criteria

The prototype is successful if a judge can understand the value within 2 minutes.

A judge should be able to see:

1. A simulated event occurs.
2. Multiple data sources report related activity.
3. Rakshak AI correlates the information.
4. A risk score is generated.
5. The system explains why the risk is high.
6. A suitable patrol is recommended.
7. The operator approves/rejects the recommendation.
8. The incident is tracked.
9. Equipment risk can also be demonstrated.
10. A report can be generated.

---

# 31. Core Product Statement

Rakshak AI is:

> **An AI-powered operational intelligence and decision-support platform that integrates heterogeneous data sources, correlates events, prioritizes risks, provides explainable recommendations, monitors equipment health, and helps authorized operators make faster and better-informed decisions.**

It is NOT:

> An autonomous border-security system.

---

# 32. Development Principle

Build a working product, not a static UI.

Every important button should have a meaningful action.

For example:

- Simulate Incident → creates events
- Analyze → calculates risk
- Explain Risk → calls Groq AI
- Recommend Patrol → calculates recommendation
- Assign Patrol → changes state
- Mark Resolved → closes incident
- Generate Report → creates report
- Simulate Equipment Degradation → changes telemetry/risk

Use realistic loading, error, empty, and success states.

---

# 33. Final Implementation Instruction to Antigravity

Build Rakshak AI as a complete, modular, production-quality **SIH prototype** following this specification.

First create the architecture and folder structure.

Then implement:

1. Frontend
2. Backend
3. Database
4. Simulation engine
5. Risk engine
6. Event correlation engine
7. Equipment health module
8. Patrol recommendation engine
9. Groq AI service
10. Incident management
11. Reporting
12. Authentication/demo roles
13. Testing
14. Seed data
15. Full end-to-end demo scenario

Do not build a fake dashboard with placeholder buttons.

All major interactions must work.

Keep the system modular so real data sources could theoretically replace simulated sources later.

Document important technical decisions in the repository.

Include a README explaining:

- Problem
- Solution
- USP
- Architecture
- Tech stack
- AI usage
- Data simulation
- Limitations
- How to run
- Environment variables
- SIH demo flow

Most importantly, keep the central product story visible:

> **Observe → Correlate → Understand → Prioritize → Recommend → Human Decision → Record**

This is the core of Rakshak AI.

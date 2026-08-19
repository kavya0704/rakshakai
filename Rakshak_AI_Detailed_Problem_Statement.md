# Rakshak AI — Detailed Problem Statement

> **Project Classification:** Smart India Hackathon (SIH) Prototype  
> **Domain:** Defence & Border Security | AI/ML | Operational Intelligence  
> **Tagline:** *AI-Powered Operational Intelligence & Decision Support*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Background & Context](#2-background--context)
3. [The Core Problem](#3-the-core-problem)
4. [Pain Points & Stakeholder Challenges](#4-pain-points--stakeholder-challenges)
5. [Problem Decomposition — Seven Critical Questions](#5-problem-decomposition--seven-critical-questions)
6. [What Rakshak AI Is NOT](#6-what-rakshak-ai-is-not)
7. [Proposed Solution](#7-proposed-solution)
8. [System Architecture & Workflow](#8-system-architecture--workflow)
9. [Functional Requirements — Module-by-Module](#9-functional-requirements--module-by-module)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Technical Architecture](#11-technical-architecture)
12. [Data Model](#12-data-model)
13. [Groq AI Integration](#13-groq-ai-integration)
14. [Human-in-the-Loop Principle](#14-human-in-the-loop-principle)
15. [Cost-Efficiency Strategy](#15-cost-efficiency-strategy)
16. [Security & Privacy Constraints](#16-security--privacy-constraints)
17. [UI/UX Design Direction](#17-uiux-design-direction)
18. [Required Application Pages](#18-required-application-pages)
19. [Primary Demo Scenario](#19-primary-demo-scenario)
20. [Success Criteria](#20-success-criteria)
21. [Key Differentiators](#21-key-differentiators)
22. [Out-of-Scope Items](#22-out-of-scope-items)
23. [Core Product Statement](#23-core-product-statement)

---

## 1. Executive Summary

Modern border security forces such as the ITBP (Indo-Tibetan Border Police) operate in some of the world's most challenging environments — remote high-altitude terrain, extreme weather, limited infrastructure, and continuously evolving threats. They rely on an array of data-generating systems: video surveillance cameras, drones, ground-based sensors, vehicle telemetry, patrol reports, and weather monitoring stations. These systems can surface a wide range of anomalies: aerial objects (unidentified drones, unusual flight activity), ground anomalies (vehicles, objects, movement in restricted zones), human activity in unusual contexts, sensor anomalies, and environmental/operational disruptions such as extreme weather or equipment outages.

**The problem is not a lack of data.** The problem is that the data exists in silos. Each system generates its own alerts independently. An officer on duty may simultaneously receive alerts from a camera system, a ground sensor, a drone feed, and a weather station — with no intelligent layer to determine whether these separate signals collectively describe a single, serious, developing situation.

**Rakshak AI** is an AI-powered software intelligence layer designed to solve this problem. It integrates information from multiple heterogeneous data sources, correlates related events, scores risk transparently, generates natural-language situation summaries, recommends appropriate resources, monitors equipment health predictively, and presents everything to a human operator for final decision-making.

Rakshak AI is a **decision-support system**, not an autonomous command system. Every consequential action requires human authorization.

---

## 2. Background & Context

Border security organizations face a distinctive operational challenge:

- **Geographic scale:** Hundreds or thousands of kilometers of border must be monitored simultaneously.
- **Environmental adversity:** Extreme cold, blizzards, high altitude, and poor visibility impair both personnel and sensors.
- **Information volume:** Modern surveillance infrastructure generates enormous volumes of event data every hour.
- **Alert fatigue:** When every motion trigger, sensor reading, and drone observation fires a separate alert, operators become desensitized and critical signals may be missed.
- **Fragmented systems:** Surveillance cameras, drones, sensors, patrol management systems, and equipment monitoring systems are typically separate products from separate vendors with no unified view.
- **Limited connectivity:** Remote outposts may have degraded or intermittent network connectivity, which affects real-time data availability.
- **Human resource constraints:** Shifts, fatigue, and limited staffing mean operators cannot individually monitor every feed at every moment.
- **Environmental & Threat Diversity:** Operating environments range from flat plains to extreme high-altitude terrain (Ladakh, Uttarakhand, Sikkim, Arunachal Pradesh). The threat profile differs by sector: some sectors face primarily aerial anomalies, others vehicle or sensor anomalies. The platform must adapt to diverse operational conditions rather than assume a single threat type.

The result is a situation where **data exists but actionable intelligence does not** — because no current system aggregates, correlates, and prioritizes information for the duty officer.

---

## 3. The Core Problem

> **How can a duty officer, faced with a continuous stream of heterogeneous sensor alerts from multiple systems, quickly determine what is actually happening, whether it is genuinely important, how serious it is, and what action to take?**

This problem has several dimensions:

| Dimension | Description |
|---|---|
| **Volume** | Too many alerts for a human to process individually |
| **Fragmentation** | Alerts come from separate systems with no shared context |
| **Relevance** | Not every alert represents a genuine threat or emergency |
| **Correlation** | Multiple separate alerts may describe the same real-world event |
| **Prioritization** | Some events demand immediate attention; others can wait |
| **Resource allocation** | Which patrol unit or asset is most suitable to respond? |
| **Equipment risk** | Is the responding vehicle or equipment likely to perform reliably? |
| **Documentation** | Incidents must be logged accurately and completely for after-action review |

No single existing system addresses all of these dimensions in an integrated way for the context of border security operations.

---

## 4. Pain Points & Stakeholder Challenges

### 4.1 Duty Officers

- Overwhelmed by alert volume from disparate systems
- Must mentally correlate data from separate consoles
- No AI-assisted prioritization of what needs attention first
- Lack of a natural-language explanation of why a situation is high-risk
- No integrated resource availability view to support dispatch decisions

### 4.2 Field Commanders

- Cannot get a rapid, real-time operational picture across all sectors
- Incident records are manual and prone to inconsistency
- No predictive equipment health indicators before deploying vehicles
- Post-incident reporting is time-consuming

### 4.3 Logistics & Maintenance Teams

- Equipment failures in the field can compromise response capability
- Current maintenance scheduling may rely on fixed intervals rather than actual condition
- No early warning system based on combined telemetry and usage data

### 4.4 Leadership / Intelligence Analysts

- No automated incident summary generation
- Pattern recognition across incidents requires manual analysis
- No unified reporting format for after-action review

---

## 5. Problem Decomposition — Seven Critical Questions

When an event is detected, the system must help an officer answer seven questions:

```
1. WHAT IS HAPPENING?
   What type of event was detected? Where? From which source?

2. IS IT ACTUALLY IMPORTANT?
   Is this sensor noise, a routine observation, or a genuinely anomalous event?

3. HOW SERIOUS IS IT?
   What is the risk level? What factors contribute to that risk?

4. ARE MULTIPLE SOURCES DESCRIBING THE SAME EVENT?
   Has more than one independent data source reported activity in the same area?
   Event correlation is the key to reducing false positives.

5. WHICH RESOURCE IS APPROPRIATE?
   Which patrol unit is available, nearest, and has the fastest estimated arrival?

6. IS THE EQUIPMENT READY?
   Does the vehicle or asset recommended for response show maintenance risk indicators?

7. WHAT ACTION SHOULD THE OFFICER CONSIDER?
   Synthesize all of the above into a clear, human-readable recommendation.
   The officer retains final authority.
```

Rakshak AI is designed to answer all seven questions from integrated data, in near-real-time, with transparent reasoning.

---

## 6. What Rakshak AI Is NOT

To maintain clarity, integrity, and prototype scope, the following boundaries are explicitly defined:

| NOT | IS |
|---|---|
| A replacement for ITBP or its personnel | A software layer that augments human operators |
| A fully autonomous command system | A decision-support system requiring human authorization |
| A system that independently authorizes force or tactical action | A system that recommends actions for officer approval |
| Dependent on expensive new sensors for every asset | Compatible with existing telemetry + supplementary sensors for high-risk assets only |
| Production-ready for live border deployment | A functional, demonstrable SIH prototype using simulated data |
| A source of real classified ITBP operational data | A platform using synthetic, fictional demo data |
| A guarantee of threat authenticity or equipment failure | A probabilistic indicator providing decision support |
| A static UI with non-functional buttons | A working system where every major interaction performs a real action |
| An anti-drone weapon, interception system, or counter-drone platform | A detection, correlation, risk-scoring, and reporting layer only |
| A system that jams, spoofs GPS of, or takes control of drones | A system that detects aerial anomalies and recommends human officer review |
| A replacement for India's existing counter-drone or anti-drone infrastructure | An intelligence layer designed to complement, not replace, existing systems |
| A system that automatically classifies any detected entity as a confirmed threat | A context-evaluation system that requires multiple factors before any risk classification |

---

## 7. Proposed Solution

**Rakshak AI** is an AI-powered integration, correlation, prioritization, and decision-support layer.

### Core Value Proposition

> *"From fragmented data to actionable operational intelligence."*

The system:

1. **Ingests** simulated/real data from multiple heterogeneous sources (cameras, drones, sensors, patrols, weather, equipment telemetry, maintenance records).
2. **Detects** anomalies and events using rule-based logic and computer vision.
3. **Correlates** events from multiple sources that share location, time, and context — reducing alert fragmentation.
4. **Scores** risk transparently on a 0–100 scale with explainable contributing factors.
5. **Summarizes** the situation in natural language using a Large Language Model (Groq API).
6. **Recommends** the most suitable patrol unit based on availability, proximity, and estimated travel time.
7. **Monitors** equipment health predictively using telemetry, usage history, and fault codes.
8. **Presents** everything to a human duty officer who reviews, approves or rejects, and acts.
9. **Logs** every incident, action, and decision for accountability and after-action review.
10. **Reports** incidents as structured, AI-assisted documents.

---

## 8. System Architecture & Workflow

The complete Rakshak AI operational workflow:

```
+-------------------------------------------------------------+
|                        DATA SOURCES                         |
|  Camera Feed | Drone Feed | Ground Sensors | Patrol Reports  |
|  Weather Data | Equipment Telemetry | Maintenance Records   |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                  DATA INTEGRATION LAYER                     |
|       Unified event ingestion, normalization, storage       |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|             AI / RULE-BASED ANALYSIS ENGINE                 |
|  Anomaly Detection | Object Recognition | Threshold Alerts  |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                EVENT CORRELATION ENGINE                     |
|  Groups related events by location, time, type, source     |
|           into unified Correlated Incidents                 |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                  RISK ASSESSMENT ENGINE                     |
|  0-100 risk score with transparent contributing factors    |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|               AI SITUATION SUMMARY (Groq)                  |
|      Natural-language explanation of the situation         |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                 PATROL RECOMMENDATION                       |
|   Best available unit based on proximity and availability  |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                 HUMAN OFFICER DECISION                      |
|        Reviews -> Approves / Rejects -> Acts               |
+-----------------------------+-------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|          INCIDENT LOGGING & REPORT GENERATION              |
|       Full record with timeline, decision, outcome         |
+-------------------------------------------------------------+
```

**Core Operating Principle:**
> Rakshak AI transforms raw information into actionable context while keeping the final decision with the authorized human operator.

---

## 9. Functional Requirements — Module-by-Module

### Module A — Command Center Dashboard

**Purpose:** Provide a unified real-time operational picture to the duty officer.

**Requirements:**

- Display live counts of: Active Incidents, High-Priority Alerts, Anomalies, Available Patrol Units, Equipment at Risk
- Show an interactive simulated operational map with sector overlays, incident markers, patrol positions, and sensor event indicators
- Present an AI-generated situation summary for the current operational state
- List recent incidents with status, severity, and timestamp
- Show system and data-source health status (e.g., "Camera Feed: ACTIVE", "Drone Feed: SIMULATED")
- All displayed metrics must be dynamically computed from live/simulated state — not hardcoded

**Example Top-Level Metrics:**

| Metric | Example Value |
|---|---|
| Active Incidents | 03 |
| High Priority | 01 |
| Anomalies Detected | 07 |
| Available Patrols | 12 |
| Equipment at Risk | 04 |

---

### Module B — Multi-Source Event Detection & Anomaly Taxonomy

**Purpose:** Ingest and normalize events from all simulated data sources into a unified format.

**Simulated Data Sources:**

| # | Source | Event Types Generated |
|---|---|---|
| 1 | Camera / Video Feed | Motion detected, Object detected, Zone breach |
| 2 | Drone Feed | Aerial observation, Possible human presence, Area scan |
| 3 | Ground Sensor | Vibration anomaly, Pressure anomaly, Proximity trigger |
| 4 | Patrol Report | Manual observation submitted, Unit position update |
| 5 | Weather / Environment | Low visibility alert, Storm warning, Temperature extreme |
| 6 | Equipment Telemetry | Temperature spike, Vibration high, Oil pressure low |
| 7 | Maintenance Records | Service overdue, Fault code detected, Inspection due |

**Requirements:**

- Each source must produce normalized event objects with: `source`, `event_type`, `timestamp`, `location`, `confidence`, `severity`
- The prototype must use simulated data; no real ITBP operational data must be used
- The data layer must be modular so simulated sources can be replaced by real integrations in a future production system

#### Anomaly Taxonomy

Rakshak AI handles five categories of operational anomaly:

**A. Aerial Anomalies**
- Unidentified or suspicious drone detected by camera, sensor, or observer drone
- Unexpected aerial activity in restricted airspace
- Drone loitering near sensitive installation or sector boundary
- Aerial object of unknown origin, classification, or trajectory

**B. Ground Anomalies**
- Unidentified vehicle detected or tracked in sector
- Unexpected movement in a restricted or sensitive zone
- Object detected in an unusual location or time context
- Repeated ground-level activity in the same area over a short period

**C. Human Activity**
- Person detected in an area where human presence is anomalous (does NOT automatically = threat)
- Movement pattern inconsistent with normal patrol or authorized civilian activity
- Operator-reported observation of unusual activity

> **Critical Design Rule:** "Person detected" must NEVER automatically become "threat detected." Rakshak AI evaluates context — zone sensitivity, time, weather, corroborating sources — before any risk classification.

**D. Sensor & System Anomalies**
- Unexpected sensor reading (vibration, pressure, proximity, thermal)
- Sensor offline, malfunctioning, or producing degraded data
- Repeated anomalous readings from a single source without multi-source corroboration

**E. Environmental & Operational Anomalies**
- Severe weather affecting sensor visibility or sensor capability
- Camera feed unavailable or significantly degraded
- Drone observation platform offline or unavailable
- Communication or data-source disruption affecting situational awareness

---

### Module C — Anomaly Detection, Context Evaluation & CV Pipeline

**Purpose:** Apply contextual evaluation to detected objects and sensor readings to produce meaningful anomaly classifications.

Rakshak AI's detection and context evaluation module handles all five anomaly categories — aerial, ground, human, sensor, and environmental. The context evaluation pipeline below applies equally to all anomaly types. Object detection is not limited to humans: it covers aerial objects, ground vehicles, and unclassified objects.

**Computer Vision Pipeline (for demo video stream):**

```
Object Detection (YOLO / OpenCV)
         |
         v
   Context Evaluation
         |
         v
  Restricted Zone Check
         |
         v
  Time & Environmental Context
         |
         v
  Cross-Source Correlation
         |
         v
     Risk Assessment
```

**Key Principle — No Automatic Threat Labeling:**

A detected object (e.g., a person) does **not** automatically constitute a threat. The system must evaluate:

- Is the detected entity in a restricted/sensitive zone?
- What is the time of detection (night vs. day)?
- What are the current weather/visibility conditions?
- Have other independent sources reported activity in the same area?
- What is the confidence score of the detection?

Only after this contextual pipeline should the system assign a risk classification.

**Example:**

| Detection | Naive System | Rakshak AI |
|---|---|---|
| Person detected in open area, daytime, low-risk zone, no corroborating sources | THREAT DETECTED | Observation — Low Risk (Score: 18/100) |
| Person detected at night, restricted zone, corroborated by sensor + drone | Observation | HIGH RISK Correlated Incident (Score: 82/100) |
| Aerial object detected, restricted airspace, corroborated by sensor + camera | DRONE THREAT DETECTED | HIGH RISK — Aerial Anomaly Incident — Operator Review Required (Score: 78/100) |
| Aerial object detected, known training corridor, single source, daytime | DRONE THREAT DETECTED | Low Priority Observation — Context: Known flight path (Score: 14/100) |

#### Drone Workflow — Two Distinct Roles

Drones serve two distinct roles in Rakshak AI:

**Role A — Drone as Observer (most common)**
The drone is an authorized observation platform operated by ITBP or its simulated equivalent:
- Drone provides video feed, GPS-tagged timestamp, and location metadata
- Computer vision processes selected frames for object and anomaly detection
- Detection results are converted to normalized event objects
- Events are ingested into the correlation engine alongside other sources

Example output event from drone observer:
```json
{
  "type": "aerial_observation",
  "source": "DRONE_OBSERVER",
  "detected_class": "unidentified_aerial_object",
  "location": "B12",
  "timestamp": "2026-08-19T14:32:00Z",
  "confidence": 0.87
}
```

**Role B — Drone as Subject (anomaly)**
An unidentified or suspicious drone is itself the anomalous activity:
- Detected by camera, ground sensor, or observer drone
- Treated as an `aerial_object_detected` anomaly event
- Flows through the full pipeline: correlation → risk scoring → AI summary → officer review
- Risk classification depends on context: zone, time, corroborating sources, flight pattern

> **Critical Boundary:** Rakshak AI does NOT intercept, jam, spoof GPS of, take control of, or physically neutralize any drone or aerial object. It ONLY detects, correlates, risk-scores the event, and recommends human officer review. Counter-drone action, if required, is a decision made exclusively by the authorized human officer using appropriate existing systems.

---

### Module C2 — High-Altitude & Remote Environment Considerations

**Purpose:** Ensure Rakshak AI remains relevant and useful across diverse operating environments, including extreme high-altitude terrain.

Some ITBP operating environments are remote, high-altitude (Ladakh, Uttarakhand, Sikkim, and Arunachal Pradesh border sectors), extremely cold, and difficult to access physically and logistically.

The platform is NOT designed exclusively around the assumption that suspicious human movement is the primary threat type.

**In remote and high-altitude sectors, primary anomaly types may differ:**

| Environment Type | Primary Anomaly Focus |
|---|---|
| High-altitude, remote | Aerial activity (drones/aircraft), vehicle/object at access points, sensor anomalies from extreme cold |
| Plains/flatlands | Human activity, vehicle movement, ground sensor triggers |
| Forest/difficult terrain | Ground movement, sensor anomalies, camera limitations |
| All environments | Environmental/operational anomalies (weather, equipment degradation) |

**Design implications:**
- Sector-specific risk weighting: Different sectors can have different default risk factor priorities
- Environmental context awareness: Extreme weather automatically increases weight of environmental anomaly factors in risk scoring
- Adaptable detection profiles: The system does not hardcode a single operational model

> Rakshak AI is designed as a **Border Surveillance & Operational Anomaly Intelligence Platform** — broad, adaptable, and not constrained to a single threat type or geographic profile.

---

### Module D — Event Correlation Engine

**Purpose:** Group related events from multiple independent sources into unified Correlated Incidents, reducing alert overload and revealing the true operational picture.

**Correlation Dimensions:**

| Dimension | Description |
|---|---|
| **Location** | Events within the same sector or geographic proximity |
| **Time Window** | Events occurring within a configurable time interval (e.g., +/- 10 minutes) |
| **Event Type** | Compatible event types that logically describe the same situation |
| **Source Independence** | Multiple independent source types carry more evidential weight |
| **Severity Alignment** | Co-occurring high-severity events increase correlation confidence |
| **Repetition** | Repeated detections from the same source reinforce the correlation |

**Example — Three Separate Alerts → One Correlated Incident:**

```
10:31  Ground Sensor  — Vibration anomaly in Sector B12
10:33  Camera Feed    — Motion detected in Sector B12
10:35  Drone Observer — Aerial/ground anomaly detected in Sector B12

  -> CORRELATED INCIDENT #1042
     Sector:     B12
     Sources:    3 independent
     Time Span:  4 minutes
     Risk Score: 82/100
     Severity:   HIGH
```

Without correlation, the officer sees three separate low-context alerts.
With correlation, the officer sees one high-confidence, prioritized incident.

---

### Module E — Risk Scoring Engine

**Purpose:** Produce a transparent, explainable 0–100 risk score for every correlated incident.

**Risk Score Range:**

| Score Range | Severity Level |
|---|---|
| 0 – 30 | LOW |
| 31 – 60 | MEDIUM |
| 61 – 80 | HIGH |
| 81 – 100 | CRITICAL |

**Risk Score Contributing Factors:**

| Factor | Example Max Contribution |
|---|---|
| Multiple independent sources corroborating | +25 |
| Sensitive / restricted zone | +20 |
| Repeated or sustained activity | +17 |
| Unusual timing (night, off-hours) | +10 |
| High detection confidence | +10 |
| Adverse weather / low visibility | +8 |
| Historical incident context for sector | +10 |

**Critical Design Requirement — Explainability:**

```
Risk Score: 82 / 100  [CRITICAL]

Contributing Factors:
  - Multiple independent sources      +25
  - Sensitive zone                    +20
  - Repeated activity                 +17
  - Unusual timing                    +10
  - Detection confidence              +10
```

> The risk score is a **decision-support indicator**, not proof of a genuine threat. This distinction must be communicated clearly in the UI.

---

### Module F — AI Situation Summary

**Purpose:** Convert structured incident data into a human-readable natural-language operational summary using the Groq LLM API.

**Example Input to Groq:**

```json
{
  "sector": "B12",
  "events": [
    "ground sensor vibration anomaly",
    "camera motion detection",
    "drone possible human presence"
  ],
  "weather": "low visibility, wind speed 45 km/h",
  "nearest_available_patrol": "P03",
  "patrol_eta_minutes": 8,
  "risk_score": 82,
  "risk_severity": "CRITICAL",
  "time_of_detection": "02:33 hrs"
}
```

**Example Groq Output:**

> *"Multiple correlated observations have been detected in Sector B12 within a 4-minute window. Ground sensors, camera feeds, and drone surveillance independently report anomalous activity at 02:33 hrs under low visibility conditions. The system has classified this situation as CRITICAL with a risk score of 82/100, primarily driven by multi-source agreement and the sensitivity of the location. Patrol unit P03 is the nearest available unit with an estimated arrival of 8 minutes. Operator review and authorization is recommended."*

**Groq AI Use Cases in Rakshak AI:**

| Use Case | Description |
|---|---|
| Situation Summary | Natural-language description of a correlated incident |
| Incident Explanation | Answer "Why is this incident high risk?" |
| Report Generation | Convert structured incident data to formatted report text |
| Operator Q&A | Answer natural-language questions about current operational data |
| Anomaly Interpretation | Optional plain-language interpretation of sensor anomalies |

**Fallback Requirement:** The system must remain functional when the Groq API is unavailable, using deterministic rule-based summaries as fallback.

---

### Module G — Patrol Recommendation Engine

**Purpose:** Identify and recommend the most suitable available patrol unit to respond to an active incident, without autonomous dispatch.

**Patrol Unit Data Stored:**

| Field | Description |
|---|---|
| unit_id | Unique identifier (e.g., P03) |
| current_location | Simulated grid coordinates |
| status | Available / Busy / En Route / Offline |
| distance_to_incident | Calculated distance in km |
| estimated_travel_time | Minutes (based on terrain difficulty) |
| terrain_difficulty | Factor applied to travel time estimate |
| current_assignment | Current task or incident assigned to |

**Recommendation Logic:**

```
For each available patrol unit:
  1. Calculate distance to incident location
  2. Apply terrain difficulty multiplier
  3. Compute estimated travel time (ETA)

Sort by: ETA (ascending) then by availability

Recommended Unit = lowest ETA with AVAILABLE status
```

**Example UI Presentation:**

| Unit | Distance | Status | ETA |
|---|---|---|---|
| P01 | 12 km | Available | ~18 min |
| P02 | 7 km | Busy | — |
| P03 | 3 km | Available | ~8 min [RECOMMENDED] |

**Officer Actions Available:**

```
[ REVIEW INCIDENT ]   ->  Opens full incident details

[ DISPATCH / ASSIGN ] ->  Requires officer confirmation before state change
```

> The system does not autonomously dispatch personnel. All assignments require explicit officer action.

---

### Module H — Predictive Equipment Maintenance

**Purpose:** Identify vehicles and equipment showing elevated maintenance risk indicators before failure occurs in the field.

**Design Principle — Cost Efficiency:**

The system does NOT require expensive sensors on every piece of equipment. It uses:

- Existing telemetry data where available
- Maintenance history records
- Operating hours and service intervals
- Fault codes from vehicle ECUs
- Simulated sensor readings for the prototype
- Enhanced monitoring recommended only for high-risk assets

**Equipment Health Assessment — Example:**

```
Vehicle: V12 — Heavy Transport

Telemetry Readings:
  Engine Temperature:   91 C       [Warning: >85 C]
  Vibration Level:      4.8 mm/s   [Warning: >3.5 mm/s]
  Oil Pressure:         31 PSI     [Warning: <35 PSI]
  Battery Voltage:      12.1 V     [Normal]

Usage & Service:
  Operating Hours:      4,820 hrs
  Last Service:         310 hours ago  [Overdue: >300 hr interval]
  Active Fault Codes:   2

Maintenance Risk Assessment:  HIGH

Recommended Action: Schedule inspection before next deployment.
```

**Language Constraint:**

- Never say: "Vehicle V12 will fail."
- Always say: "Vehicle V12 shows multiple indicators associated with elevated maintenance risk."

**Risk-Based Monitoring Framework:**

```
All Assets
    |
    v
Risk Assessment (telemetry + history + usage)
    |
    +-> Low-Risk Asset    -> Standard monitoring schedule
    |
    +-> High-Risk Asset   -> Flag for inspection + enhanced monitoring recommended
    |
    +-> Critical Asset    -> Block from deployment pending inspection (officer decision)
```

---

### Module I — Incident Management

**Purpose:** Maintain a complete, structured record of every significant event from initial detection through resolution.

**Incident Record Fields:**

| Field | Description |
|---|---|
| incident_id | Unique identifier (e.g., INC-1042) |
| created_at | UTC timestamp of incident creation |
| sector | Affected sector / location |
| source_events | List of correlated event IDs |
| data_sources | Sources involved (Camera, Sensor, Drone, etc.) |
| risk_score | 0–100 risk score at time of creation |
| severity | LOW / MEDIUM / HIGH / CRITICAL |
| confidence | Correlation confidence percentage |
| contributing_factors | Breakdown of risk score factors |
| ai_summary | Groq-generated natural-language summary |
| recommended_action | AI-generated recommendation |
| patrol_recommended | Recommended patrol unit ID |
| officer_action | What the officer decided |
| assigned_unit | Patrol unit assigned (if any) |
| status | New -> Under Review -> Under Response -> Resolved / Dismissed |
| resolved_at | UTC timestamp of resolution |
| resolution_notes | Officer notes on outcome |

**Incident Lifecycle:**

```
New -> Under Review -> Under Response -> Resolved
                 \
                  --> Dismissed (false positive / low priority)
```

---

### Module J — Automated Reporting

**Purpose:** Generate structured incident reports that combine observed data, AI interpretation, and officer decisions.

**Report Contents:**

1. **Incident Summary** — Overview of what occurred
2. **Detection Timeline** — Chronological list of events with timestamps
3. **Data Sources Involved** — Which systems contributed data
4. **Risk Assessment Detail** — Score, severity, contributing factors
5. **AI-Generated Analysis** — Groq LLM interpretation
6. **Recommended Action** — What the system recommended
7. **Officer Decision** — What the officer actually decided
8. **Resolution** — Outcome and resolution time

**Report Distinction Requirement:**

The generated report must visually distinguish between:
- Observed Data (raw sensor/camera readings)
- AI-Generated Interpretation (Groq output)
- Operator Decision (human action taken)

---

### Module K — AI Assistant

**Purpose:** Provide a conversational interface allowing operators to query the system using natural language.

**Example Operator Queries:**

- "Summarize all active high-priority incidents."
- "Why is Incident #1042 classified as high risk?"
- "Which patrol units are currently available?"
- "Show all equipment with CRITICAL maintenance risk."
- "Generate a summary of all incidents in Sector B12 this week."
- "What sectors have had the most incidents in the last 24 hours?"

**Key Constraints:**

- The assistant must answer **only from the application's structured data** — never from hallucinated or invented operational facts.
- If data is unavailable, it must explicitly state that.
- It must not be connected to external internet sources or unconstrained LLM knowledge.

---

### Module L — Simulation Engine

**Purpose:** Generate realistic simulated events and scenarios for demo and testing purposes.

**Simulation Controls:**

| Button | Action |
|---|---|
| Simulate Sensor Anomaly | Generates a single ground sensor event |
| Simulate Camera Detection | Generates a single camera motion/object event |
| Simulate Drone Detection | Generates a single drone observation event |
| Simulate Weather Alert | Generates a weather condition change |
| Simulate Equipment Degradation | Worsens telemetry readings for a selected vehicle |
| **Simulate Correlated Incident** | **Triggers the full end-to-end workflow** |
| Simulate Aerial Anomaly | Generates an aerial object detection event (unidentified drone/aerial object at sector boundary) |
| Simulate Ground Anomaly | Generates a vehicle or object detection event in a restricted zone |
| Simulate Sensor Malfunction | Marks a sensor as offline/degraded, creating an operational anomaly event |

**"Simulate Correlated Incident" — Full Flow:**

```
T+0:00  -> Ground sensor vibration anomaly in Sector B12
T+0:02  -> Camera motion detection in Sector B12
T+0:04  -> Drone Observer reports aerial/ground anomaly in Sector B12
T+0:05  -> Correlation Engine groups events -> Incident #1042 created
T+0:05  -> Risk Engine scores: 82/100 CRITICAL
T+0:06  -> Groq AI generates situation summary
T+0:06  -> Patrol Recommendation Engine selects P03
T+0:07  -> Dashboard updates: CRITICAL INCIDENT DETECTED
T+0:08  -> Officer reviews and acts
T+0:xx  -> Incident status updated -> Report generated
```

---

## 10. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Dashboard must load and reflect simulated events in near-real-time (<3 seconds for simulation triggers) |
| **Reliability** | System must function when Groq API is unavailable (fallback to deterministic summaries) |
| **Modularity** | Each module (data sources, risk engine, correlation engine) must be independently replaceable |
| **Extensibility** | Simulated data sources must be designed so real integrations can replace them without architectural changes |
| **Security** | All API keys server-side; no secrets in frontend code; no classified data |
| **Usability** | A judge with no prior training must understand the value proposition within 2 minutes |
| **Data Integrity** | All officer decisions must be logged and immutable once recorded |
| **Prototype Clarity** | The application must clearly present itself as an SIH prototype using simulated data |

---

## 11. Technical Architecture

### Frontend

| Technology | Purpose |
|---|---|
| Next.js / React | Component-based UI framework |
| TypeScript | Type safety and code quality |
| Tailwind CSS | Utility-first styling |
| shadcn/ui or similar | Pre-built accessible components |

### Backend

| Technology | Purpose |
|---|---|
| Python | Primary backend language |
| FastAPI | High-performance REST API framework |
| Background task workers | Simulation event generation |

### AI / LLM

| Technology | Purpose |
|---|---|
| Groq API | High-speed LLM inference |
| Groq-supported LLM | Situation summarization, report generation, Q&A |
| Structured JSON prompting | Controlled, predictable LLM output |

### Computer Vision

| Technology | Purpose |
|---|---|
| Python + OpenCV | Video stream processing |
| YOLO (YOLOv8 or similar) | Object detection in demo video streams |

### Machine Learning

| Technology | Purpose |
|---|---|
| scikit-learn | Equipment health scoring models |
| pandas | Data manipulation |
| NumPy | Numerical processing |

### Database

| Technology | Purpose |
|---|---|
| Firebase Firestore or PostgreSQL | Primary data store |
| In-memory state | Real-time simulation state management |

### Maps

| Technology | Purpose |
|---|---|
| Simulated sector map | Custom fictional operational map |
| Leaflet.js or similar | Interactive map rendering |

### Authentication

| Technology | Purpose |
|---|---|
| JWT-based demo auth | Role-based access (Commander, Officer, Observer) |

---

## 12. Data Model

### Event

```typescript
interface Event {
  id: string;
  source: "camera" | "drone" | "sensor" | "patrol" | "weather" | "telemetry" | "maintenance";
  event_type: string;
  timestamp: string;            // ISO 8601 UTC
  location: { sector: string; lat: number; lon: number };
  confidence: number;           // 0.0 - 1.0
  severity: "low" | "medium" | "high" | "critical";
  raw_data: Record<string, unknown>;
}
```

### Incident

```typescript
interface Incident {
  id: string;
  created_at: string;
  sector: string;
  related_event_ids: string[];
  data_sources: string[];
  risk_score: number;           // 0 - 100
  severity: "low" | "medium" | "high" | "critical";
  confidence: number;           // Correlation confidence 0-100%
  contributing_factors: { factor: string; contribution: number }[];
  ai_summary: string;
  recommended_action: string;
  patrol_recommended: string | null;
  officer_action: string | null;
  assigned_unit: string | null;
  status: "new" | "under_review" | "under_response" | "resolved" | "dismissed";
  resolved_at: string | null;
  resolution_notes: string | null;
}
```

### PatrolUnit

```typescript
interface PatrolUnit {
  id: string;
  name: string;
  location: { sector: string; lat: number; lon: number };
  status: "available" | "busy" | "en_route" | "offline";
  current_assignment: string | null;
  simulated_eta_minutes: number | null;
}
```

### Asset (Equipment)

```typescript
interface Asset {
  id: string;
  type: "vehicle" | "sensor" | "drone" | "communication";
  name: string;
  location: string;
  status: "operational" | "degraded" | "offline" | "maintenance";
  health_score: number;         // 0 - 100
  maintenance_risk: "low" | "medium" | "high" | "critical";
}
```

### EquipmentTelemetry

```typescript
interface EquipmentTelemetry {
  equipment_id: string;
  timestamp: string;
  engine_temperature_c: number;
  vibration_mm_s: number;
  oil_pressure_psi: number;
  battery_voltage_v: number;
  operating_hours: number;
  last_service_hours_ago: number;
  fault_codes: string[];
}
```

---

## 13. Groq AI Integration

### Security Requirements

- The `GROQ_API_KEY` must be read exclusively from environment variables.
- The key must **never** appear in frontend source code or client-side JavaScript.
- All Groq API calls must be made server-side through the backend API.

### Environment Variable

```bash
GROQ_API_KEY=your_groq_api_key_here
```

### Service Layer

Create a dedicated AI service module:

```
backend/
  services/
    groq_service.py    <- All Groq interactions
```

### Graceful Degradation

When Groq API is unavailable:

- Use deterministic rule-based summary templates
- Log the API failure without crashing the application
- Continue all non-AI functionality normally

---

## 14. Human-in-the-Loop Principle

This principle must be architecturally enforced and visually communicated throughout the UI.

### System Responsibilities

```
RAKSHAK AI:
  Observe -> Correlate -> Score Risk -> Summarize -> Recommend
```

### Officer Responsibilities

```
HUMAN OFFICER:
  Review -> Analyze -> Approve or Reject -> Act -> Record Decision
```

### Implementation Requirements

- Every consequential state change (patrol dispatch, incident status change) must require an explicit officer action
- The UI must never present a recommendation as an already-executed action
- Every action logged must record: officer_id, action_taken, timestamp, notes
- The system must not autonomously contact real-world units, systems, or personnel

---

## 15. Cost-Efficiency Strategy

A core design principle of Rakshak AI is **risk-based, cost-proportionate monitoring**.

| Asset Risk Level | Monitoring Strategy |
|---|---|
| Low Risk | Standard periodic telemetry review; existing data sources only |
| Medium Risk | Increased monitoring frequency; flag for next scheduled service |
| High Risk | Recommend inspection; flag for pre-deployment check |
| Critical Risk | Recommend removal from active duty pending inspection |

### Rationale

- Not every vehicle or sensor requires expensive additional hardware
- The system derives maximum value from data already being generated
- Enhanced monitoring is recommended only for assets showing elevated risk indicators
- This approach is scalable across large fleets without proportional cost increase

---

## 16. Security & Privacy Constraints

| Constraint | Implementation |
|---|---|
| Use fictional geographic locations | Synthetic sectors (A01–Z99) with fictional coordinates |
| Use synthetic data only | All patrol routes, incident data, and telemetry are simulated |
| Do not use real ITBP data | No classified or sensitive operational information of any kind |
| No hard-coded secrets | All API keys and credentials via environment variables |
| Keys server-side only | Groq API key never exposed to frontend |
| No personal information | No real personnel data used in any capacity |
| Prototype labeling | Application displays "PROTOTYPE / DEMO" label where appropriate |
| Role-based access | Different UI capabilities for Commander vs. Officer vs. Observer roles |

---

## 17. UI/UX Design Direction

### Design Philosophy

> The product must look and feel like **serious operational intelligence software**, not a gaming dashboard.

### Visual Style

| Element | Specification |
|---|---|
| Color scheme | Dark professional (deep navy / slate / dark gray base) |
| Accent colors | Red (critical), orange (high), yellow (medium), green (low) |
| Typography | Clean, high-contrast, monospace for data values |
| Layout | High information density with clear hierarchy |
| Map | Prominent, interactive, showing sectors, incidents, and patrols |
| Animations | Subtle, purposeful — never decorative |
| Severity indicators | Consistent, color-coded badges across all modules |

### Avoid

- Excessive animations or particle effects
- Gaming aesthetics
- Flashy non-functional UI elements
- Any UI element that implies autonomous action has been taken

---

## 18. Required Application Pages

| # | Page | Key Features |
|---|---|---|
| 1 | **Login** | Secure-looking demo login with role selection; Rakshak AI branding |
| 2 | **Command Center** | Main dashboard: metrics, map, AI summary, recent incidents, system status |
| 3 | **Live Situational Map** | Interactive map with sectors, incidents, patrols, sensor events, drone coverage |
| 4 | **Incidents** | Active / Under Review / Resolved tabs; incident detail view; officer actions |
| 5 | **Equipment Health** | Asset list with health scores, maintenance risk, telemetry, service history |
| 6 | **AI Intelligence** | Situation summaries, correlation insights, AI assistant |
| 7 | **Reports** | Incident reports, AI-generated summaries, export options |
| 8 | **Simulation Controls** | Demo simulation panel for judges/presenters |

---

## 19. Primary Demo Scenario

This is the end-to-end scenario designed to demonstrate full system value to SIH judges in under 2 minutes.

### Starting State

- No critical incidents active
- All patrol units available
- Equipment mostly healthy

### Demo Flow

```
STEP 1: Officer clicks [ SIMULATE CORRELATED INCIDENT ]

STEP 2: System generates:
  T+0:00  Ground Sensor  — Vibration anomaly, Sector B12
  T+0:02  Camera Feed    — Motion detected, Sector B12
  T+0:04  Drone Observer — Aerial/ground anomaly detected in Sector B12

STEP 3: Correlation Engine fires
  -> Events grouped -> INCIDENT #1042 created

STEP 4: Risk Engine scores
  -> Risk: 82/100  Severity: CRITICAL

STEP 5: Dashboard updates
  +-------------------------------------------+
  |  CRITICAL INCIDENT DETECTED               |
  |  Sector B12  | Risk: 82/100 | Sources: 3  |
  +-------------------------------------------+

STEP 6: Groq AI generates summary
  "Multiple correlated observations detected in Sector B12..."

STEP 7: Patrol Recommendation
  P03 — 3 km — Available — ETA: 8 min  [RECOMMENDED]

STEP 8: Officer reviews -> clicks [ ASSIGN PATROL P03 ]

STEP 9: Map updates
  P03 moves toward Sector B12
  Incident status -> UNDER RESPONSE

STEP 10: Officer clicks [ MARK RESOLVED ]
  Incident status -> RESOLVED
  System generates structured Incident Report
```

---

## 20. Success Criteria

The prototype is considered successful when a judge can, within 2 minutes of a demonstration, observe and understand the following:

| # | Observable Outcome |
|---|---|
| 1 | A simulated real-world event is triggered |
| 2 | Multiple independent data sources report related activity |
| 3 | Rakshak AI correlates the events into a unified incident |
| 4 | A transparent risk score is generated with visible contributing factors |
| 5 | The system explains in plain language why the risk is classified as high |
| 6 | A suitable patrol unit is recommended with estimated arrival time |
| 7 | The operator explicitly approves the recommendation before any action occurs |
| 8 | The incident is tracked with full status lifecycle |
| 9 | Equipment maintenance risk is identifiable from the health dashboard |
| 10 | A structured incident report is generated automatically |

---

## 21. Key Differentiators

| Differentiator | Description |
|---|---|
| **Cross-Source Correlation** | Groups related alerts from independent sources into unified incidents — the core innovation |
| **Transparent Risk Scoring** | Every risk score shows its contributing factors — no black-box decisions |
| **Explainable AI Summaries** | Natural-language explanations that a non-technical officer can understand |
| **Human-in-the-Loop Enforcement** | Architectural guarantee that no autonomous tactical action is taken |
| **Cost-Proportionate Monitoring** | Enhanced monitoring recommended only where risk justifies it |
| **Predictive Equipment Health** | Reduces field equipment failures through proactive risk identification |
| **End-to-End Traceability** | Every event, decision, and action is logged with full provenance |
| **Multi-Anomaly Type Support** | Handles aerial, ground, human, sensor, and environmental anomalies — not limited to human surveillance |
| **Sector-Adaptive Risk Profiling** | Different sectors can have different threat type priorities (e.g., aerial-first for high-altitude sectors vs. ground-first for plains) |

---

## 22. Out-of-Scope Items

| Out of Scope | Reason |
|---|---|
| Hundreds of settings/configuration pages | Not part of core workflow |
| Complex social or collaboration features | Not relevant to operational context |
| Real hardware sensor deployment | Prototype uses simulated data |
| Real ITBP operational data | Classified; unavailable; not permitted |
| Real-world tactical automation | Safety, legal, and ethical constraint |
| Excessive UI animations | Detracts from professional appearance |
| Dozens of different AI models | One well-integrated LLM (Groq) is sufficient |
| "100% accurate" AI claims | Misleading; all assessments are probabilistic |
| Anti-drone interception, jamming, or physical neutralization | Legal, safety, and ethical constraint — Rakshak AI is a detection and reporting layer only |
| GPS spoofing or control of hostile drone systems | Out of scope — Rakshak AI does not interact with any drone's control or communication systems |
| Autonomous threat neutralization of any kind | Safety and legal constraint — all consequential actions require explicit human authorization |

---

## 23. Core Product Statement

### What Rakshak AI Is

> **Rakshak AI is an AI-powered operational intelligence and decision-support platform that integrates heterogeneous data sources, correlates multi-type anomaly events (aerial, ground, human, sensor, and environmental) across sources, prioritizes risks with transparent scoring, generates explainable AI-powered situation summaries, recommends appropriate resources, monitors equipment health predictively, and enables authorized operators to make faster, better-informed decisions — while ensuring that final authority remains with the human officer at every step.**

### What Rakshak AI Is Not

> An autonomous border-security system. An AI that makes tactical decisions independently. A replacement for trained personnel or existing ITBP infrastructure.

### The Core Workflow

```
OBSERVE -> CORRELATE -> UNDERSTAND -> PRIORITIZE -> RECOMMEND -> HUMAN DECISION -> RECORD
```

This is the story Rakshak AI tells — from every sensor ping to every officer decision — in a single, coherent, explainable, and human-supervised intelligence loop.

---

*Document Version: 1.0 | Classification: SIH Prototype — Simulated Data Only | Project: Rakshak AI*

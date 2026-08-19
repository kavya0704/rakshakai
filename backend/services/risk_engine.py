from typing import List, Dict, Any
from datetime import datetime
from models.schema import Event

def calculate_incident_risk(events: List[Event], sector: str = "B12", weather_condition: str = "NORMAL") -> Dict[str, Any]:
    score = 0
    factors = []

    # 1. Independent Source Corroboration (Up to +25)
    unique_sources = set(e.source.value if hasattr(e.source, "value") else str(e.source) for e in events)
    source_count = len(unique_sources)
    if source_count >= 3:
        pts = 25
        factors.append({"factor": f"3+ Independent Sources Corroborating ({', '.join(unique_sources)})", "points": pts})
        score += pts
    elif source_count == 2:
        pts = 15
        factors.append({"factor": f"2 Independent Sources Corroborating ({', '.join(unique_sources)})", "points": pts})
        score += pts
    else:
        pts = 5
        factors.append({"factor": "Single Source Observation (Uncorroborated)", "points": pts})
        score += pts

    # 2. Sector Sensitivity & Critical Boundary Proximity (Up to +20)
    high_risk_sectors = ["B12", "B14", "D02", "C08"]
    if any(s in sector.upper() for s in high_risk_sectors):
        pts = 20
        factors.append({"factor": f"High-Altitude Sensitive Border Corridor ({sector})", "points": pts})
        score += pts
    else:
        pts = 10
        factors.append({"factor": f"Standard Operational Buffer Sector ({sector})", "points": pts})
        score += pts

    # 3. Sustained / Repeated Activity (Up to +17)
    if len(events) >= 3:
        pts = 17
        factors.append({"factor": f"Sustained Multi-Anomaly Cluster ({len(events)} events within time window)", "points": pts})
        score += pts
    elif len(events) == 2:
        pts = 10
        factors.append({"factor": "Repeated Trigger within 10-minute window", "points": pts})
        score += pts

    # 4. Off-Hours / Night Timing (Up to +10)
    current_hour = datetime.utcnow().hour
    # Convert UTC to IST (+5:30) approx
    ist_hour = (current_hour + 5) % 24
    if ist_hour >= 20 or ist_hour <= 5:
        pts = 10
        factors.append({"factor": "Off-Hours / Night Surveillance Window (02:00-05:00 hrs)", "points": pts})
        score += pts
    else:
        pts = 4
        factors.append({"factor": "Daylight Observation Window", "points": pts})
        score += pts

    # 5. Average Detection Confidence (Up to +10)
    avg_conf = sum(e.confidence for e in events) / max(len(events), 1)
    if avg_conf >= 0.85:
        pts = 10
        factors.append({"factor": f"High Sensor/Optic Confidence ({int(avg_conf * 100)}%)", "points": pts})
        score += pts
    elif avg_conf >= 0.70:
        pts = 6
        factors.append({"factor": f"Moderate Detection Confidence ({int(avg_conf * 100)}%)", "points": pts})
        score += pts

    # 6. Environmental / Weather Context (Up to +10)
    if "BLIZZARD" in weather_condition.upper() or "WHITEOUT" in weather_condition.upper() or "LOW_VISIBILITY" in weather_condition.upper():
        pts = 8
        factors.append({"factor": "Extreme Cold & Sub-Zero Visibility Distortion", "points": pts})
        score += pts

    # Bound risk score between 0 and 100
    final_score = min(max(score, 5), 100)

    # Classify Severity Level
    if final_score >= 81:
        severity = "CRITICAL"
    elif final_score >= 61:
        severity = "HIGH"
    elif final_score >= 31:
        severity = "MEDIUM"
    else:
        severity = "LOW"

    return {
        "risk_score": final_score,
        "severity": severity,
        "contributing_factors": factors,
        "source_count": source_count,
        "confidence": round(avg_conf, 2)
    }
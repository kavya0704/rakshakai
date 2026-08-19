import uuid
from datetime import datetime
from models.schema import Event, EventSource

def generate_aerial_anomaly(sector="B12", lat=34.150, lon=77.565, custom_class="unidentified_uav_crossing"):
    return Event(
        id=f"ev_aerial_{uuid.uuid4().hex[:8]}",
        source=EventSource.drone,
        event_type="AERIAL_ANOMALY_TRACKED",
        timestamp=datetime.utcnow(),
        sector=sector,
        lat=lat,
        lon=lon,
        confidence=0.92,
        severity="CRITICAL",
        raw_data={
            "detected_class": custom_class,
            "altitude_meters": 180.0,
            "velocity_kmh": 42.5,
            "trajectory": "West-to-East Ridgeway Ingress",
            "source_device": "DRONE_OBSERVER_NETRA_1"
        }
    )
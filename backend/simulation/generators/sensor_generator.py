import uuid
from datetime import datetime
from models.schema import Event, EventSource

def generate_sensor_anomaly(sector="B12", lat=34.149, lon=77.563):
    return Event(
        id=f"ev_sensor_{uuid.uuid4().hex[:8]}",
        source=EventSource.sensor,
        event_type="SEISMIC_VIBRATION_SPIKE",
        timestamp=datetime.utcnow(),
        sector=sector,
        lat=lat,
        lon=lon,
        confidence=0.89,
        severity="HIGH",
        raw_data={
            "vibration_amplitude_hz": 24.8,
            "sensor_id": "SEISMIC_NODE_B12_01",
            "signature": "HEAVY_CONVOY_OR_FOOTFALL_BURST",
            "threshold_exceeded_by": "180%"
        }
    )
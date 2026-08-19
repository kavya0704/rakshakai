import uuid
from datetime import datetime
from models.schema import Event, EventSource

def generate_ground_anomaly(sector="B12", lat=34.148, lon=77.562, is_vehicle=True):
    ev_type = "VEHICLE_BOUNDARY_CROSSING" if is_vehicle else "CONTEXTUAL_ENTITY_DETECTED"
    return Event(
        id=f"ev_ground_{uuid.uuid4().hex[:8]}",
        source=EventSource.camera,
        event_type=ev_type,
        timestamp=datetime.utcnow(),
        sector=sector,
        lat=lat,
        lon=lon,
        confidence=0.86,
        severity="HIGH" if is_vehicle else "MEDIUM",
        raw_data={
            "detected_class": "unauthorized_4x4_vehicle" if is_vehicle else "unclassified_human_movement",
            "zone_type": "RESTRICTED_BUFFER_ZONE",
            "camera_id": "CAM_THERMAL_MAST_01",
            "context_note": "Evaluated against local checkpoint flight plans"
        }
    )
import uuid
from datetime import datetime
from models.schema import Event, EventSource

def generate_weather_anomaly(sector="B12", lat=34.150, lon=77.565, condition="BLIZZARD_WHITEOUT"):
    return Event(
        id=f"ev_weather_{uuid.uuid4().hex[:8]}",
        source=EventSource.weather,
        event_type="ADVERSE_WEATHER_ALERT",
        timestamp=datetime.utcnow(),
        sector=sector,
        lat=lat,
        lon=lon,
        confidence=0.95,
        severity="MEDIUM",
        raw_data={
            "condition": condition,
            "ambient_temp_c": -18.5,
            "wind_speed_kmh": 65.0,
            "visibility_meters": 40.0,
            "operational_impact": "Sensor sensitivity dynamically discounted; camera range limited"
        }
    )
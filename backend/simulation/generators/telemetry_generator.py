import uuid
from datetime import datetime
from models.schema import Event, EventSource, EquipmentTelemetry

def generate_equipment_degradation(equipment_id="V12", sector="B12"):
    tel = EquipmentTelemetry(
        id=f"tel_{uuid.uuid4().hex[:8]}",
        equipment_id=equipment_id,
        timestamp=datetime.utcnow(),
        engine_temp=98.5,
        vibration=5.4,
        oil_pressure=26.0,
        battery_voltage=11.6,
        operating_hours=4890.0,
        last_service_hours_ago=380.0,
        fault_codes=["P0115_ENGINE_OVERHEAT", "P0340_HIGH_VIBRATION", "P0524_LOW_OIL_PRESSURE"]
    )
    ev = Event(
        id=f"ev_telemetry_{uuid.uuid4().hex[:8]}",
        source=EventSource.telemetry,
        event_type="EQUIPMENT_CRITICAL_DEGRADATION",
        timestamp=datetime.utcnow(),
        sector=sector,
        confidence=0.99,
        severity="HIGH",
        raw_data={
            "equipment_id": equipment_id,
            "warning": "Engine temperature at 98.5C (Threshold >85C), High vibration 5.4 mm/s",
            "recommended_action": "Block vehicle V12 from tactical sortie; dispatch inspection team"
        }
    )
    return tel, ev
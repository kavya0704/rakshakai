import asyncio
import uuid
import sys
import os
from datetime import datetime, timedelta

# Add parent dir to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from database import engine, AsyncSessionLocal, init_db
from models.schema import (
    User, UserRole,
    PatrolUnit,
    Asset,
    EquipmentTelemetry,
    Event, EventSource,
    Incident, IncidentStatus,
    AuditLog
)
from services.auth_service import get_password_hash

async def seed_database():
    print("[SEED] Initializing Database Schema...")
    await init_db()

    async with AsyncSessionLocal() as db:
        res = await db.execute(select(User))
        if res.scalars().first():
            print("[SEED] Database already contains records. Skipping seed.")
            return

        print("[SEED] Seeding 3 Demo User Accounts...")
        users = [
            User(
                id="usr_commander",
                username="commander",
                hashed_password=get_password_hash("demo123"),
                role=UserRole.commander,
                full_name="Brigadier V. S. Chauhan",
                created_at=datetime.utcnow()
            ),
            User(
                id="usr_officer",
                username="officer1",
                hashed_password=get_password_hash("demo123"),
                role=UserRole.officer,
                full_name="Inspector Rajesh Kumar",
                created_at=datetime.utcnow()
            ),
            User(
                id="usr_observer",
                username="observer",
                hashed_password=get_password_hash("demo123"),
                role=UserRole.observer,
                full_name="Observer Recon Team Alpha",
                created_at=datetime.utcnow()
            ),
        ]
        db.add_all(users)

        print("[SEED] Seeding 6 Patrol Units...")
        patrols = [
            PatrolUnit(
                id="P01",
                name="Patrol Unit Alpha-1",
                sector="B14",
                lat=34.152,
                lon=77.577,
                status="available",
                simulated_eta_minutes=14.0
            ),
            PatrolUnit(
                id="P02",
                name="Patrol Unit Bravo-2",
                sector="A04",
                lat=34.168,
                lon=77.589,
                status="busy",
                current_assignment="Routine High-Altitude Recce",
                simulated_eta_minutes=25.0
            ),
            PatrolUnit(
                id="P03",
                name="Patrol Unit Charlie-3 (Rapid Strike)",
                sector="B12",
                lat=34.148,
                lon=77.562,
                status="available",
                simulated_eta_minutes=6.5
            ),
            PatrolUnit(
                id="P04",
                name="Patrol Unit Delta-4",
                sector="C08",
                lat=34.135,
                lon=77.545,
                status="available",
                simulated_eta_minutes=18.0
            ),
            PatrolUnit(
                id="P05",
                name="Patrol Unit Echo-5 (Snowmobile)",
                sector="D02",
                lat=34.160,
                lon=77.595,
                status="en_route",
                current_assignment="Sector Perimeter Patrol",
                simulated_eta_minutes=12.0
            ),
            PatrolUnit(
                id="P06",
                name="Patrol Unit Foxtrot-6",
                sector="B10",
                lat=34.140,
                lon=77.550,
                status="available",
                simulated_eta_minutes=9.0
            ),
        ]
        db.add_all(patrols)

        print("[SEED] Seeding 8 Equipment Assets & Telemetry...")
        assets = [
            Asset(
                id="V12",
                type="vehicle",
                name="Heavy All-Terrain Transport V12",
                sector="B12",
                status="operational",
                health_score=68,
                maintenance_risk="HIGH"
            ),
            Asset(
                id="V04",
                type="vehicle",
                name="Armoured Scout Vehicle V04",
                sector="A04",
                status="operational",
                health_score=94,
                maintenance_risk="LOW"
            ),
            Asset(
                id="DRONE-01",
                type="drone",
                name="ITBP Recon Drone Netra-1",
                sector="B12",
                status="operational",
                health_score=88,
                maintenance_risk="LOW"
            ),
            Asset(
                id="DRONE-02",
                type="drone",
                name="Surveillance Quadcopter Netra-2",
                sector="C08",
                status="degraded",
                health_score=54,
                maintenance_risk="HIGH"
            ),
            Asset(
                id="SENS-01",
                type="sensor",
                name="Ground Seismic Sensor Node 01",
                sector="B12",
                status="operational",
                health_score=92,
                maintenance_risk="LOW"
            ),
            Asset(
                id="SENS-02",
                type="sensor",
                name="Perimeter Infrasound Sensor 02",
                sector="B14",
                status="operational",
                health_score=85,
                maintenance_risk="LOW"
            ),
            Asset(
                id="CAM-01",
                type="camera",
                name="Long-Range Thermal Optic Mast 01",
                sector="B12",
                status="operational",
                health_score=90,
                maintenance_risk="LOW"
            ),
            Asset(
                id="CAM-02",
                type="camera",
                name="PTZ Border Surveillance Cam 02",
                sector="D02",
                status="maintenance",
                health_score=42,
                maintenance_risk="CRITICAL"
            ),
        ]
        db.add_all(assets)

        telemetries = [
            EquipmentTelemetry(
                id=f"tel_{uuid.uuid4().hex[:8]}",
                equipment_id="V12",
                engine_temp=91.5,
                vibration=4.8,
                oil_pressure=31.0,
                battery_voltage=12.1,
                operating_hours=4820.0,
                last_service_hours_ago=310.0,
                fault_codes=["P0340_CAM_SENSOR", "P0115_COOLANT_TEMP"]
            ),
            EquipmentTelemetry(
                id=f"tel_{uuid.uuid4().hex[:8]}",
                equipment_id="V04",
                engine_temp=76.2,
                vibration=1.1,
                oil_pressure=44.0,
                battery_voltage=12.8,
                operating_hours=1250.0,
                last_service_hours_ago=65.0,
                fault_codes=[]
            ),
        ]
        db.add_all(telemetries)

        print("[SEED] Seeding Initial Demonstration Incident & Events...")
        now = datetime.utcnow()
        ev1 = Event(
            id=f"ev_{uuid.uuid4().hex[:8]}",
            source=EventSource.sensor,
            event_type="SEISMIC_VIBRATION_SPIKE",
            timestamp=now - timedelta(minutes=6),
            sector="B12",
            lat=34.149,
            lon=77.564,
            confidence=0.88,
            severity="MEDIUM",
            raw_data={"amplitude_hz": 18.4, "sensor_id": "SENS-01"}
        )
        ev2 = Event(
            id=f"ev_{uuid.uuid4().hex[:8]}",
            source=EventSource.camera,
            event_type="OPTICAL_MOTION_TRACKED",
            timestamp=now - timedelta(minutes=4),
            sector="B12",
            lat=34.150,
            lon=77.565,
            confidence=0.82,
            severity="HIGH",
            raw_data={"detected_class": "unidentified_aerial_movement", "camera_id": "CAM-01"}
        )
        ev3 = Event(
            id=f"ev_{uuid.uuid4().hex[:8]}",
            source=EventSource.drone,
            event_type="AERIAL_ANOMALY_CONFIRMED",
            timestamp=now - timedelta(minutes=2),
            sector="B12",
            lat=34.151,
            lon=77.566,
            confidence=0.91,
            severity="CRITICAL",
            raw_data={"object_type": "unidentified_small_uav", "observer_id": "DRONE-01"}
        )
        db.add_all([ev1, ev2, ev3])

        incident = Incident(
            id="INC-1042",
            created_at=now - timedelta(minutes=2),
            sector="B12",
            lat=34.150,
            lon=77.565,
            related_event_ids=[ev1.id, ev2.id, ev3.id],
            data_sources=["SENSOR", "CAMERA", "DRONE_OBSERVER"],
            risk_score=82,
            severity="CRITICAL",
            confidence=0.89,
            contributing_factors=[
                {"factor": "3 Independent Sources Corroborating", "points": 25},
                {"factor": "Sensitive High-Altitude Border Corridor", "points": 20},
                {"factor": "Sustained Aerial & Ground Activity", "points": 17},
                {"factor": "Off-Hours Night Operation Window", "points": 10},
                {"factor": "Adverse Weather / Sub-Zero Low Visibility", "points": 10}
            ],
            ai_summary="Multiple correlated observations detected in Sector B12 within a 4-minute window. Ground seismic sensors, thermal cameras, and aerial observer drones independently confirm anomalous movement along the ridge. Classified as CRITICAL (Risk 82/100). Nearest patrol unit P03 (Charlie-3) recommended for dispatch.",
            recommended_action="Review incident details and consider deploying nearest available patrol unit P03.",
            patrol_recommended="P03",
            status=IncidentStatus.under_review
        )
        db.add(incident)

        await db.commit()
        print("[SEED] Successfully Seeded Database with Demo Data!")

if __name__ == "__main__":
    asyncio.run(seed_database())
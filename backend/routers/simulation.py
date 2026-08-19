import asyncio
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db, AsyncSessionLocal
from simulation.generators import (
    generate_aerial_anomaly,
    generate_ground_anomaly,
    generate_sensor_anomaly,
    generate_weather_anomaly,
    generate_equipment_degradation
)
from services.correlation_engine import correlation_engine
from services.notification_service import notification_manager
from models.schema import Asset, AuditLog

router = APIRouter(prefix="/api/simulate", tags=["simulation"])

@router.post("/aerial")
async def simulate_aerial(sector: str = "B12", db: AsyncSession = Depends(get_db)):
    event = generate_aerial_anomaly(sector=sector)
    result = await correlation_engine.process_incoming_event(event, db)
    return {"message": "Aerial anomaly event simulated successfully", "result": result, "event_id": event.id}

@router.post("/ground")
async def simulate_ground(sector: str = "B12", is_vehicle: bool = True, db: AsyncSession = Depends(get_db)):
    event = generate_ground_anomaly(sector=sector, is_vehicle=is_vehicle)
    result = await correlation_engine.process_incoming_event(event, db)
    return {"message": "Ground movement event simulated successfully", "result": result, "event_id": event.id}

@router.post("/sensor")
async def simulate_sensor(sector: str = "B12", db: AsyncSession = Depends(get_db)):
    event = generate_sensor_anomaly(sector=sector)
    result = await correlation_engine.process_incoming_event(event, db)
    return {"message": "Seismic sensor anomaly simulated successfully", "result": result, "event_id": event.id}

@router.post("/weather")
async def simulate_weather(sector: str = "B12", condition: str = "BLIZZARD_WHITEOUT", db: AsyncSession = Depends(get_db)):
    event = generate_weather_anomaly(sector=sector, condition=condition)
    result = await correlation_engine.process_incoming_event(event, db)
    return {"message": "Weather alert simulated successfully", "result": result, "event_id": event.id}

@router.post("/telemetry")
async def simulate_telemetry(equipment_id: str = "V12", sector: str = "B12", db: AsyncSession = Depends(get_db)):
    tel, event = generate_equipment_degradation(equipment_id=equipment_id, sector=sector)
    db.add(tel)
    await db.commit()
    result = await correlation_engine.process_incoming_event(event, db)
    
    # Broadcast telemetry update
    await notification_manager.broadcast({
        "type": "EQUIPMENT_ALERT",
        "equipment_id": equipment_id,
        "engine_temp": tel.engine_temp,
        "vibration": tel.vibration,
        "maintenance_risk": "HIGH"
    })
    return {"message": f"Critical degradation simulated for asset {equipment_id}", "result": result}

async def run_correlated_demo_flow():
    """Triggers the full multi-source sequence with realistic 2-second pacing"""
    async with AsyncSessionLocal() as db:
        # Step 1: Seismic Sensor Trigger
        ev1 = generate_sensor_anomaly(sector="B12")
        await correlation_engine.process_incoming_event(ev1, db)
        await asyncio.sleep(2.0)

        # Step 2: Optical Camera Trigger
        ev2 = generate_ground_anomaly(sector="B12", is_vehicle=False)
        await correlation_engine.process_incoming_event(ev2, db)
        await asyncio.sleep(2.0)

        # Step 3: Aerial Drone Observer Confirmation
        ev3 = generate_aerial_anomaly(sector="B12")
        await correlation_engine.process_incoming_event(ev3, db)

@router.post("/correlated-incident")
async def simulate_correlated_incident(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_correlated_demo_flow)
    return {
        "message": "Full Correlated Incident Sequence initiated in Sector B12",
        "flow": [
            "T+0:00 -> Seismic Sensor vibration burst",
            "T+0:02 -> Thermal Optical camera detection",
            "T+0:04 -> Drone Observer aerial confirmation",
            "T+0:05 -> Spatio-Temporal Correlation Engine fuses events into Incident",
            "T+0:05 -> Risk Engine scores 82/100 (CRITICAL)",
            "T+0:06 -> Groq LLaMA-3 LPU produces tactical summary",
            "T+0:06 -> Patrol Engine recommends Unit P03 (Charlie-3)"
        ]
    }
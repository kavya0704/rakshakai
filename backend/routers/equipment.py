from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.schema import Asset, EquipmentTelemetry

router = APIRouter(prefix="/api/equipment", tags=["equipment"])

@router.get("")
async def list_equipment(db: AsyncSession = Depends(get_db)):
    stmt = select(Asset)
    res = await db.execute(stmt)
    assets = res.scalars().all()
    return {
        "assets": [
            {
                "id": a.id,
                "type": a.type,
                "name": a.name,
                "sector": a.sector,
                "status": a.status,
                "health_score": a.health_score,
                "maintenance_risk": a.maintenance_risk
            }
            for a in assets
        ],
        "count": len(assets)
    }

@router.get("/{equipment_id}/telemetry")
async def get_telemetry(equipment_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(EquipmentTelemetry).where(
        EquipmentTelemetry.equipment_id == equipment_id
    ).order_by(EquipmentTelemetry.timestamp.desc()).limit(10)
    res = await db.execute(stmt)
    readings = res.scalars().all()
    return {
        "equipment_id": equipment_id,
        "readings": [
            {
                "timestamp": t.timestamp.isoformat(),
                "engine_temp": t.engine_temp,
                "vibration": t.vibration,
                "oil_pressure": t.oil_pressure,
                "battery_voltage": t.battery_voltage,
                "operating_hours": t.operating_hours,
                "fault_codes": t.fault_codes
            }
            for t in readings
        ]
    }
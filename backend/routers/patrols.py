from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database import get_db
from models.schema import PatrolUnit

router = APIRouter(prefix="/api/patrols", tags=["patrols"])

@router.get("")
async def list_patrols(db: AsyncSession = Depends(get_db)):
    stmt = select(PatrolUnit)
    res = await db.execute(stmt)
    units = res.scalars().all()
    return {
        "patrols": [
            {
                "id": p.id,
                "name": p.name,
                "sector": p.sector,
                "lat": p.lat,
                "lon": p.lon,
                "status": p.status,
                "current_assignment": p.current_assignment,
                "simulated_eta_minutes": p.simulated_eta_minutes
            }
            for p in units
        ],
        "count": len(units)
    }
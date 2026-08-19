from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from database import get_db
from models.schema import Event

router = APIRouter(prefix="/api/events", tags=["events"])

@router.get("")
async def get_events(
    sector: Optional[str] = None,
    limit: int = Query(50, le=200),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Event).order_by(Event.timestamp.desc()).limit(limit)
    if sector:
        stmt = stmt.where(Event.sector == sector)
    res = await db.execute(stmt)
    events = res.scalars().all()
    return {
        "events": [
            {
                "id": e.id,
                "source": e.source.value if hasattr(e.source, "value") else str(e.source),
                "event_type": e.event_type,
                "timestamp": e.timestamp.isoformat(),
                "sector": e.sector,
                "lat": e.lat,
                "lon": e.lon,
                "confidence": e.confidence,
                "severity": e.severity,
                "raw_data": e.raw_data
            }
            for e in events
        ],
        "count": len(events)
    }
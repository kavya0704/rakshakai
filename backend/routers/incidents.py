from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from database import get_db
from models.schema import Incident, IncidentStatus, PatrolUnit, AuditLog
from services.notification_service import notification_manager

router = APIRouter(prefix="/api/incidents", tags=["incidents"])

class ActionRequest(BaseModel):
    officer_id: Optional[str] = "officer1"
    unit_id: Optional[str] = None
    notes: Optional[str] = None

@router.get("")
async def get_incidents(
    status_filter: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Incident).order_by(Incident.created_at.desc())
    if status_filter:
        stmt = stmt.where(Incident.status == status_filter)
    res = await db.execute(stmt)
    incidents = res.scalars().all()
    return {
        "incidents": [
            {
                "id": inc.id,
                "created_at": inc.created_at.isoformat(),
                "sector": inc.sector,
                "lat": inc.lat,
                "lon": inc.lon,
                "data_sources": inc.data_sources,
                "related_event_ids": inc.related_event_ids,
                "risk_score": inc.risk_score,
                "severity": inc.severity,
                "confidence": inc.confidence,
                "contributing_factors": inc.contributing_factors,
                "ai_summary": inc.ai_summary,
                "recommended_action": inc.recommended_action,
                "patrol_recommended": inc.patrol_recommended,
                "assigned_unit": inc.assigned_unit,
                "officer_action": inc.officer_action,
                "status": inc.status.value,
                "resolved_at": inc.resolved_at.isoformat() if inc.resolved_at else None,
                "resolution_notes": inc.resolution_notes
            }
            for inc in incidents
        ],
        "count": len(incidents)
    }

@router.get("/{incident_id}")
async def get_incident_detail(incident_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Incident).where(Incident.id == incident_id)
    res = await db.execute(stmt)
    inc = res.scalar_one_or_none()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {
        "id": inc.id,
        "created_at": inc.created_at.isoformat(),
        "sector": inc.sector,
        "lat": inc.lat,
        "lon": inc.lon,
        "data_sources": inc.data_sources,
        "related_event_ids": inc.related_event_ids,
        "risk_score": inc.risk_score,
        "severity": inc.severity,
        "confidence": inc.confidence,
        "contributing_factors": inc.contributing_factors,
        "ai_summary": inc.ai_summary,
        "recommended_action": inc.recommended_action,
        "patrol_recommended": inc.patrol_recommended,
        "assigned_unit": inc.assigned_unit,
        "status": inc.status.value,
        "resolution_notes": inc.resolution_notes
    }

@router.post("/{incident_id}/assign-patrol")
async def assign_patrol(incident_id: str, req: ActionRequest, db: AsyncSession = Depends(get_db)):
    stmt = select(Incident).where(Incident.id == incident_id)
    res = await db.execute(stmt)
    inc = res.scalar_one_or_none()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    unit_id = req.unit_id or inc.patrol_recommended or "P03"
    inc.status = IncidentStatus.under_response
    inc.assigned_unit = unit_id
    inc.officer_action = f"Dispatched Patrol Unit {unit_id}"
    inc.officer_id = req.officer_id

    # Update Patrol Unit Status to en_route
    p_stmt = select(PatrolUnit).where(PatrolUnit.id == unit_id)
    p_res = await db.execute(p_stmt)
    patrol = p_res.scalar_one_or_none()
    if patrol:
        patrol.status = "en_route"
        patrol.current_assignment = f"Responding to {incident_id} ({inc.sector})"

    audit = AuditLog(
        id=f"audit_{int(datetime.utcnow().timestamp()*1000)}",
        user_id=req.officer_id,
        action="ASSIGN_PATROL",
        entity_type="INCIDENT",
        entity_id=incident_id,
        details={"assigned_unit": unit_id, "sector": inc.sector}
    )
    db.add(audit)
    await db.commit()

    # Broadcast update
    await notification_manager.broadcast({
        "type": "PATROL_DISPATCHED",
        "incident_id": incident_id,
        "unit_id": unit_id,
        "status": "under_response"
    })
    return {"message": f"Patrol {unit_id} dispatched to {incident_id}", "incident_status": "under_response"}

@router.post("/{incident_id}/resolve")
async def resolve_incident(incident_id: str, req: ActionRequest, db: AsyncSession = Depends(get_db)):
    stmt = select(Incident).where(Incident.id == incident_id)
    res = await db.execute(stmt)
    inc = res.scalar_one_or_none()
    if not inc:
        raise HTTPException(status_code=404, detail="Incident not found")

    inc.status = IncidentStatus.resolved
    inc.resolved_at = datetime.utcnow()
    inc.resolution_notes = req.notes or "Sector secured by patrol unit. Threat neutralized/cleared."

    if inc.assigned_unit:
        p_stmt = select(PatrolUnit).where(PatrolUnit.id == inc.assigned_unit)
        p_res = await db.execute(p_stmt)
        patrol = p_res.scalar_one_or_none()
        if patrol:
            patrol.status = "available"
            patrol.current_assignment = None

    await db.commit()
    await notification_manager.broadcast({
        "type": "INCIDENT_RESOLVED",
        "incident_id": incident_id,
        "status": "resolved"
    })
    return {"message": f"Incident {incident_id} marked as resolved", "status": "resolved"}
import uuid
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from models.schema import Event, Incident, IncidentStatus, PatrolUnit
from services.risk_engine import calculate_incident_risk
from services.patrol_engine import recommend_best_patrol
from services.groq_service import groq_service
from services.notification_service import notification_manager
from config import settings

class CorrelationEngine:
    async def process_incoming_event(self, event: Event, db: AsyncSession) -> Dict[str, Any]:
        """
        Main Event Ingestion & Correlation Loop:
        1. Save event
        2. Find co-located events in same sector within 10-minute window (Delta T <= 600s)
        3. If multiple sources agree or existing active incident exists, update/promote incident
        4. Calculate explainable risk score
        5. Generate AI situation brief
        6. Compute nearest patrol recommendation
        7. Broadcast real-time push to frontend clients via WebSockets
        """
        db.add(event)
        await db.commit()
        await db.refresh(event)

        # Notify clients about raw event
        await notification_manager.broadcast({
            "type": "NEW_EVENT",
            "event": {
                "id": event.id,
                "source": event.source.value if hasattr(event.source, "value") else str(event.source),
                "event_type": event.event_type,
                "sector": event.sector,
                "lat": event.lat,
                "lon": event.lon,
                "severity": event.severity,
                "confidence": event.confidence,
                "timestamp": event.timestamp.isoformat()
            }
        })

        time_window = datetime.utcnow() - timedelta(seconds=settings.CORRELATION_TIME_WINDOW_SECONDS)

        # Find all unassigned or matching events in same sector within time window
        stmt = select(Event).where(
            Event.sector == event.sector,
            Event.timestamp >= time_window
        )
        res = await db.execute(stmt)
        sector_events = res.scalars().all()

        unique_sources = set(e.source.value if hasattr(e.source, "value") else str(e.source) for e in sector_events)

        # Check for existing active incident in this sector
        inc_stmt = select(Incident).where(
            Incident.sector == event.sector,
            Incident.status.in_([IncidentStatus.new, IncidentStatus.under_review, IncidentStatus.under_response])
        ).order_by(Incident.created_at.desc())
        inc_res = await db.execute(inc_stmt)
        existing_incident = inc_res.scalars().first()

        # Load patrol units for ETA calculations
        patrol_res = await db.execute(select(PatrolUnit))
        patrol_units = patrol_res.scalars().all()

        # Calculate Risk Score
        risk_data = calculate_incident_risk(
            sector_events,
            sector=event.sector,
            weather_condition="LOW_VISIBILITY" if event.severity == "CRITICAL" else "NORMAL"
        )

        # Compute Patrol Recommendation
        patrol_data = recommend_best_patrol(
            incident_lat=event.lat or 34.150,
            incident_lon=event.lon or 77.565,
            sector=event.sector,
            patrol_units=patrol_units
        )

        if existing_incident:
            # Update existing incident
            existing_incident.related_event_ids = list(set(existing_incident.related_event_ids + [event.id]))
            existing_incident.data_sources = list(unique_sources)
            existing_incident.risk_score = risk_data["risk_score"]
            existing_incident.severity = risk_data["severity"]
            existing_incident.confidence = risk_data["confidence"]
            existing_incident.contributing_factors = risk_data["contributing_factors"]
            existing_incident.patrol_recommended = patrol_data["recommended_unit"]

            # Groq AI situation update
            existing_incident.ai_summary = groq_service.generate_situation_summary({
                "sector": event.sector,
                "data_sources": list(unique_sources),
                "risk_score": risk_data["risk_score"],
                "severity": risk_data["severity"],
                "patrol_recommended": patrol_data.get("unit_name", patrol_data["recommended_unit"]),
                "eta_minutes": patrol_data["eta_minutes"]
            })

            await db.commit()
            await db.refresh(existing_incident)

            await notification_manager.broadcast({
                "type": "INCIDENT_UPDATED",
                "incident": {
                    "id": existing_incident.id,
                    "sector": existing_incident.sector,
                    "risk_score": existing_incident.risk_score,
                    "severity": existing_incident.severity,
                    "data_sources": existing_incident.data_sources,
                    "ai_summary": existing_incident.ai_summary,
                    "patrol_recommended": existing_incident.patrol_recommended,
                    "status": existing_incident.status.value,
                    "created_at": existing_incident.created_at.isoformat()
                }
            })
            return {"status": "incident_updated", "incident_id": existing_incident.id}

        elif len(unique_sources) >= settings.CORRELATION_MIN_SOURCES or event.severity in ["HIGH", "CRITICAL"]:
            # Create NEW Correlated Incident
            new_inc_id = f"INC-{int(datetime.utcnow().timestamp()) % 10000}"
            ai_summary = groq_service.generate_situation_summary({
                "sector": event.sector,
                "data_sources": list(unique_sources),
                "risk_score": risk_data["risk_score"],
                "severity": risk_data["severity"],
                "patrol_recommended": patrol_data.get("unit_name", patrol_data["recommended_unit"]),
                "eta_minutes": patrol_data["eta_minutes"]
            })

            new_incident = Incident(
                id=new_inc_id,
                created_at=datetime.utcnow(),
                sector=event.sector,
                lat=event.lat or 34.150,
                lon=event.lon or 77.565,
                related_event_ids=[e.id for e in sector_events],
                data_sources=list(unique_sources),
                risk_score=risk_data["risk_score"],
                severity=risk_data["severity"],
                confidence=risk_data["confidence"],
                contributing_factors=risk_data["contributing_factors"],
                ai_summary=ai_summary,
                recommended_action=f"Deploy nearest available patrol unit {patrol_data['recommended_unit']} (ETA: {patrol_data['eta_minutes']} min)",
                patrol_recommended=patrol_data["recommended_unit"],
                status=IncidentStatus.under_review
            )
            db.add(new_incident)
            await db.commit()
            await db.refresh(new_incident)

            await notification_manager.broadcast({
                "type": "NEW_INCIDENT",
                "incident": {
                    "id": new_incident.id,
                    "sector": new_incident.sector,
                    "risk_score": new_incident.risk_score,
                    "severity": new_incident.severity,
                    "data_sources": new_incident.data_sources,
                    "ai_summary": new_incident.ai_summary,
                    "patrol_recommended": new_incident.patrol_recommended,
                    "status": new_incident.status.value,
                    "created_at": new_incident.created_at.isoformat()
                }
            })
            return {"status": "incident_created", "incident_id": new_incident.id}

        return {"status": "event_recorded", "event_id": event.id}

correlation_engine = CorrelationEngine()
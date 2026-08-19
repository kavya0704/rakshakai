from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from services.groq_service import groq_service

router = APIRouter(prefix="/api/ai", tags=["ai"])

class QueryRequest(BaseModel):
    query: str

class SituationBriefRequest(BaseModel):
    sector: Optional[str] = "Sector B12"
    data_sources: Optional[List[str]] = ["SENSOR", "CAMERA", "DRONE"]
    risk_score: Optional[int] = 82
    severity: Optional[str] = "HIGH"
    patrol_recommended: Optional[str] = "Unit T03"
    eta_minutes: Optional[float] = 8.0

class ExplainRiskRequest(BaseModel):
    sector: Optional[str] = "Sector B12"
    risk_score: Optional[int] = 82
    contributing_factors: Optional[List[Dict[str, Any]]] = []
    data_sources: Optional[List[str]] = ["SENSOR", "CAMERA", "DRONE"]

class ReportGenRequest(BaseModel):
    incident_id: Optional[str] = "INC-1042"
    sector: Optional[str] = "Sector B12"
    data_sources: Optional[List[str]] = ["Ground Sensor SENS-01", "Thermal Cam CAM-01", "Drone Netra-1"]
    risk_score: Optional[int] = 82
    assigned_patrol: Optional[str] = "Patrol Unit T03"
    officer_name: Optional[str] = "Inspector Rajesh Kumar"

@router.post("/query")
async def tactical_ai_query(req: QueryRequest):
    answer = groq_service.answer_tactical_query(req.query, {})
    return {"query": req.query, "response": answer, "model": "Groq LLaMA-3 LPU"}

@router.post("/situation-brief")
async def generate_brief(req: SituationBriefRequest):
    brief = groq_service.generate_situation_summary(req.dict())
    return {"brief": brief, "model": "Groq LLaMA-3 LPU"}

@router.post("/explain-risk")
async def explain_risk(req: ExplainRiskRequest):
    explanation = groq_service.explain_incident_risk(req.dict())
    return {"explanation": explanation, "model": "Groq LLaMA-3 LPU"}

@router.post("/generate-report")
async def generate_report(req: ReportGenRequest):
    report_text = groq_service.generate_after_action_report(req.dict())
    return {"report_text": report_text, "model": "Groq LLaMA-3 LPU"}
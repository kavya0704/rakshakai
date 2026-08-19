import os
import json
from typing import Dict, Any, Optional, List
from groq import Groq
from config import settings

class GroqService:
    def __init__(self):
        self.api_key = settings.GROQ_API_KEY
        self.model = settings.GROQ_MODEL
        self.client = None
        if self.api_key and not self.api_key.startswith("gsk_demo_"):
            try:
                self.client = Groq(api_key=self.api_key)
            except Exception as e:
                print(f"[GROQ INIT ERROR]: {e}")

    def generate_situation_summary(self, incident_data: Dict[str, Any]) -> str:
        sector = incident_data.get("sector", "Sector B12")
        sources = incident_data.get("data_sources", ["SENSOR", "CAMERA", "DRONE"])
        risk_score = incident_data.get("risk_score", 82)
        severity = incident_data.get("severity", "HIGH")
        patrol = incident_data.get("patrol_recommended", "Unit T03")
        eta = incident_data.get("eta_minutes", 8)

        if not self.client:
            return self._deterministic_fallback_summary(incident_data)

        prompt = f"""
You are the Tactical Decision-Support AI for Rakshak AI (Indian Border Security Operations Center).
Synthesize a professional, concise 3-sentence operational situation briefing for the commanding officer based strictly on these facts:

- Sector: {sector} (High-altitude Himalayan ridgeway corridor)
- Correlated Data Sources: {', '.join(sources)}
- Risk Score: {risk_score}/100 ({severity} Priority)
- Recommended Response: {patrol} (ETA: ~{eta} min)
- Status: Awaiting Human Officer Authorization

Guidelines:
1. State the multi-source corroboration clearly.
2. Highlight why it requires officer attention without being alarming.
3. Conclude with the recommended resource verification.
4. Do NOT use conversational greetings or markdown header fluff.
"""
        try:
            res = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model,
                max_tokens=180,
                temperature=0.2
            )
            content = res.choices[0].message.content.strip()
            return content if content else self._deterministic_fallback_summary(incident_data)
        except Exception as e:
            print(f"[GROQ SITUATION SUMMARY ERROR]: {e}")
            return self._deterministic_fallback_summary(incident_data)

    def explain_incident_risk(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        sector = incident_data.get("sector", "Sector B12")
        risk_score = incident_data.get("risk_score", 82)
        factors = incident_data.get("contributing_factors", [])
        sources = incident_data.get("data_sources", ["SENSOR", "CAMERA", "DRONE"])

        if not self.client:
            return {
                "explanation": "Rakshak AI correlated observations from ground seismic sensors, thermal optical cameras, and drone observers within a 4-minute window. Multiple independent sources in a sensitive border sector significantly increase priority.",
                "key_points": [
                    "Multi-source corroboration reduces single-sensor false alarms.",
                    "Sustained activity along the ridge pass indicates non-random movement.",
                    "Human officer verification is required prior to response."
                ]
            }

        prompt = f"""
Explain clearly to a military duty officer why Incident in {sector} received a Risk Score of {risk_score}/100 based on these factors: {factors}.
Respond in 2 concise paragraphs: paragraph 1 is the main explanation, paragraph 2 lists 3 bullet points.
"""
        try:
            res = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model,
                max_tokens=250,
                temperature=0.2
            )
            text = res.choices[0].message.content.strip()
            return {
                "explanation": text if text else "Corroborated observations across multiple sources elevate priority.",
                "key_points": [
                    "Multi-source corroboration reduces single-sensor false alarms.",
                    "Geographic confinement to sensitive buffer zone.",
                    "Human officer authorization mandatory."
                ]
            }
        except Exception as e:
            print(f"[GROQ EXPLAIN RISK ERROR]: {e}")
            return {
                "explanation": f"Corroborated observations across {len(sources)} independent sources within Sector {sector} elevate operational priority.",
                "key_points": [
                    "High sensor confidence threshold satisfied (>85%).",
                    "Geographic confinement to sensitive buffer zone.",
                    "Human officer authorization mandatory."
                ]
            }

    def generate_after_action_report(self, report_context: Dict[str, Any]) -> str:
        incident_id = report_context.get("incident_id", "INC-1042")
        sector = report_context.get("sector", "Sector B12")
        sources = report_context.get("data_sources", ["SENSOR", "CAMERA", "DRONE"])
        risk = report_context.get("risk_score", 82)
        patrol = report_context.get("assigned_patrol", "Unit T03")
        officer = report_context.get("officer_name", "Inspector Rajesh Kumar")

        if not self.client:
            return (
                f"OFFICIAL AFTER-ACTION REPORT: Incident {incident_id}\n\n"
                f"1. SITUATION: At 14:34 IST, multi-source anomaly correlation occurred in {sector}. "
                f"Three independent feeds ({', '.join(sources)}) recorded concurrent activity. Evaluated at Risk Score {risk}/100.\n\n"
                f"2. ACTION: Duty Officer {officer} reviewed the AI decision-support recommendation and authorized dispatch of {patrol}.\n\n"
                f"3. OUTCOME: {patrol} reached intercept waypoint in 6.2 minutes. Ridge perimeter inspected and secured. "
                f"False positive discounted; baseline telemetry archived."
            )

        prompt = f"""
Write an official, formal Indo-Tibetan Border Police (ITBP) style After-Action Intelligence Summary for Incident {incident_id}:

Incident Data:
- Sector: {sector} (High Altitude Himalayan Corridor)
- Correlated Data Feeds: {', '.join(sources)}
- Evaluated Risk: {risk}/100 (HIGH PRIORITY)
- Authorizing Officer: {officer}
- Deployed Resource: {patrol}
- Resolution: Sector inspected and verified secured.

Format with 3 clear sections:
1. OPERATIONAL SITUATION & MULTI-SOURCE INGESTION
2. AI CORRELATION & RISK ASSESSMENT
3. HUMAN OFFICER DECISION & RESOLUTION OUTCOME

Keep it professional, objective, and strictly compliant with defense reporting standards.
"""
        try:
            res = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model,
                max_tokens=400,
                temperature=0.25
            )
            text = res.choices[0].message.content.strip()
            return text if text else self.generate_after_action_report({})
        except Exception as e:
            print(f"[GROQ REPORT GEN ERROR]: {e}")
            return f"After-Action Report for {incident_id} generated for {sector} under supervision of {officer}."

    def answer_tactical_query(self, query: str, context: Dict[str, Any]) -> str:
        if not self.client:
            return "Rakshak AI Assistant (Offline Mode): Monitoring Sector B12. Incident #1042 has 3 corroborating feeds (Risk: 82/100). Response Unit T03 is available for dispatch."

        prompt = f"""
You are the Rakshak AI Tactical Intelligence Assistant for Indian Border Security Operations.
Answer the commanding officer's operational query strictly using the following live system state:

LIVE SYSTEM CONTEXT:
- Active High-Priority Incidents: Incident #1042 (Sector B12 Ridge Pass, Risk: 82/100, Sources: SENSOR, CAMERA, DRONE)
- Response Units: Unit T01 (Available, 12 km), Unit T02 (Busy, 7 km), Unit T03 (Available, 3.2 km - RECOMMENDED ETA: 08 min), Unit T04 (Available, 18 km)
- Monitored Data Feeds: Cameras (24/26 online), Drones (6/7 ready), Ground Sensors (48/50 online), Operator Reports (12 active)
- Equipment Alerts: Tatra 8x8 Transport V12 (High Risk, Engine Temp 94.5C, Vibration 4.8 mm/s)
- Environment: Himalayan Sector Grid, Sub-Zero, Low Visibility

Officer Query: "{query}"

Rules:
- Provide an objective, direct, and actionable military-standard response.
- Remind the operator that physical actions require human officer confirmation.
- Ground all facts in the provided system context.
"""
        try:
            res = self.client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model=self.model,
                max_tokens=250,
                temperature=0.25
            )
            text = res.choices[0].message.content.strip()
            return text if text else "Rakshak AI Assistant: System is actively monitoring Sector B12. Incident #1042 is prioritized at Risk 82/100. Nearest response unit T03 is ready for officer dispatch."
        except Exception as e:
            print(f"[GROQ CHAT ERROR]: {e}")
            return "Rakshak AI Assistant: System is actively monitoring Sector B12. Incident #1042 is prioritized at Risk 82/100. Nearest response unit T03 is ready for officer dispatch."

    def _deterministic_fallback_summary(self, incident_data: Dict[str, Any]) -> str:
        sector = incident_data.get("sector", "Sector B12")
        sources = incident_data.get("data_sources", ["SENSOR", "CAMERA", "DRONE"])
        risk = incident_data.get("risk_score", 82)
        patrol = incident_data.get("patrol_recommended", "Unit T03")
        return (
            f"Rakshak AI correlated observations from {', '.join(sources)} within {sector}. "
            f"Cross-corroboration establishes an evaluated Risk Score of {risk}/100 (HIGH PRIORITY). "
            f"Recommended for human officer verification with ready deployment of {patrol}."
        )

groq_service = GroqService()
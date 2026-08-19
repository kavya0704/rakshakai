import enum
from sqlalchemy import Column, String, DateTime, Enum, Integer, Float, JSON, Text, Boolean
from datetime import datetime
from database import Base

class UserRole(str, enum.Enum):
    commander = "commander"
    officer = "officer"
    observer = "observer"

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.officer, nullable=False)
    full_name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)

class EventSource(str, enum.Enum):
    camera = "CAMERA"
    drone = "DRONE_OBSERVER"
    sensor = "SENSOR"
    weather = "WEATHER"
    telemetry = "TELEMETRY"
    patrol = "PATROL"

class Event(Base):
    __tablename__ = "events"
    id = Column(String, primary_key=True, index=True)
    source = Column(Enum(EventSource), nullable=False)
    event_type = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    sector = Column(String, index=True, nullable=False)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    confidence = Column(Float, default=0.8)
    severity = Column(String, default="MEDIUM")
    raw_data = Column(JSON, default=dict)
    correlation_id = Column(String, nullable=True, index=True)

class IncidentStatus(str, enum.Enum):
    new = "new"
    under_review = "under_review"
    under_response = "under_response"
    resolved = "resolved"
    dismissed = "dismissed"

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(String, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    sector = Column(String, index=True, nullable=False)
    lat = Column(Float, nullable=True)
    lon = Column(Float, nullable=True)
    related_event_ids = Column(JSON, default=list)
    data_sources = Column(JSON, default=list)
    risk_score = Column(Integer, default=0)
    severity = Column(String, default="MEDIUM")
    confidence = Column(Float, default=0.8)
    contributing_factors = Column(JSON, default=list)
    ai_summary = Column(Text, nullable=True)
    recommended_action = Column(String, nullable=True)
    patrol_recommended = Column(String, nullable=True)
    assigned_unit = Column(String, nullable=True)
    officer_action = Column(String, nullable=True)
    status = Column(Enum(IncidentStatus), default=IncidentStatus.new, index=True)
    resolved_at = Column(DateTime, nullable=True)
    resolution_notes = Column(Text, nullable=True)
    officer_id = Column(String, nullable=True)

class PatrolUnit(Base):
    __tablename__ = "patrol_units"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sector = Column(String, index=True, nullable=False)
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    status = Column(String, default="available") # available | en_route | busy | offline
    current_assignment = Column(String, nullable=True)
    simulated_eta_minutes = Column(Float, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow)

class Asset(Base):
    __tablename__ = "assets"
    id = Column(String, primary_key=True, index=True)
    type = Column(String, nullable=False) # vehicle | drone | camera | sensor
    name = Column(String, nullable=False)
    sector = Column(String, index=True, nullable=False)
    status = Column(String, default="operational") # operational | degraded | offline | maintenance
    health_score = Column(Integer, default=100)
    maintenance_risk = Column(String, default="LOW") # LOW | MEDIUM | HIGH | CRITICAL
    last_assessed = Column(DateTime, default=datetime.utcnow)

class EquipmentTelemetry(Base):
    __tablename__ = "equipment_telemetry"
    id = Column(String, primary_key=True, index=True)
    equipment_id = Column(String, index=True, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    engine_temp = Column(Float, default=75.0)
    vibration = Column(Float, default=1.2)
    oil_pressure = Column(Float, default=42.0)
    battery_voltage = Column(Float, default=12.6)
    operating_hours = Column(Float, default=1200.0)
    last_service_hours_ago = Column(Float, default=120.0)
    fault_codes = Column(JSON, default=list)

class Report(Base):
    __tablename__ = "reports"
    id = Column(String, primary_key=True, index=True)
    incident_id = Column(String, index=True, nullable=False)
    generated_at = Column(DateTime, default=datetime.utcnow)
    generated_by = Column(String, nullable=True)
    content_json = Column(JSON, default=dict)
    ai_text = Column(Text, nullable=False)
    officer_notes = Column(Text, nullable=True)

class AuditLog(Base):
    __tablename__ = "audit_log"
    id = Column(String, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    user_id = Column(String, nullable=True)
    role = Column(String, nullable=True)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(String, nullable=False)
    details = Column(JSON, default=dict)

import math
from typing import List, Optional, Dict, Any
from models.schema import PatrolUnit

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0 # Earth radius in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

def get_terrain_multiplier(sector: str) -> float:
    sec = sector.upper()
    if "B12" in sec or "B14" in sec:
        return 2.2 # High mountain snow ridge
    elif "A04" in sec or "D02" in sec:
        return 1.8 # Steep rocky pass
    elif "C08" in sec:
        return 1.4 # Hill terrain
    return 1.0 # Standard terrain

def recommend_best_patrol(
    incident_lat: float,
    incident_lon: float,
    sector: str,
    patrol_units: List[PatrolUnit]
) -> Dict[str, Any]:
    available_units = [p for p in patrol_units if p.status == "available"]
    if not available_units:
        # Fallback to any active unit
        available_units = [p for p in patrol_units if p.status != "offline"]

    if not available_units:
        return {"recommended_unit": None, "eta_minutes": None, "distance_km": None}

    terrain_mult = get_terrain_multiplier(sector)
    avg_speed_kmh = 35.0 # Average tactical patrol vehicle speed in high altitude

    ranked = []
    for unit in available_units:
        dist_km = haversine_distance(unit.lat, unit.lon, incident_lat, incident_lon)
        # ETA = (Dist / Speed) * Terrain Multiplier * 60 minutes
        eta_mins = round((dist_km / avg_speed_kmh) * terrain_mult * 60, 1)
        ranked.append({
            "unit_id": unit.id,
            "name": unit.name,
            "sector": unit.sector,
            "status": unit.status,
            "distance_km": dist_km,
            "eta_minutes": eta_mins
        })

    # Sort ascending by ETA
    ranked.sort(key=lambda x: x["eta_minutes"])
    best = ranked[0]

    return {
        "recommended_unit": best["unit_id"],
        "unit_name": best["name"],
        "eta_minutes": best["eta_minutes"],
        "distance_km": best["distance_km"],
        "candidates": ranked
    }
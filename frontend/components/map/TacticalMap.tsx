"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { AlertOctagon, Shield, Users, Radio, Navigation } from "lucide-react";
import toast from "react-hot-toast";

// Custom Leaflet Icons using SVG Data URIs
const createCustomIcon = (color: string, label: string) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  `;
  return L.divIcon({
    html: `
      <div style="display:flex; flex-direction:column; align-items:center;">
        <div style="background:${color}; width:28px; height:28px; border-radius:50%; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; box-shadow:0 0 12px ${color};">
          <span style="font-size:10px; font-weight:800; color:#ffffff;">${label}</span>
        </div>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const incidentIcon = createCustomIcon("#ef4444", "!");
const patrolAvailableIcon = createCustomIcon("#10b981", "P");
const patrolBusyIcon = createCustomIcon("#3b82f6", "P");

// Simulated Himalayan Sector Boundaries
const SECTOR_POLYGONS = [
  {
    name: "Sector B12 (Ridge Pass - High Risk)",
    coords: [
      [34.140, 77.550],
      [34.160, 77.550],
      [34.160, 77.580],
      [34.140, 77.580],
    ],
    color: "#ef4444",
    fillColor: "#ef4444",
    fillOpacity: 0.15,
  },
  {
    name: "Sector B14 (Northern Crest)",
    coords: [
      [34.145, 77.570],
      [34.165, 77.570],
      [34.165, 77.600],
      [34.145, 77.600],
    ],
    color: "#f59e0b",
    fillColor: "#f59e0b",
    fillOpacity: 0.08,
  },
  {
    name: "Sector C08 (Valley Patrol)",
    coords: [
      [34.125, 77.530],
      [34.145, 77.530],
      [34.145, 77.560],
      [34.125, 77.560],
    ],
    color: "#06b6d4",
    fillColor: "#06b6d4",
    fillOpacity: 0.08,
  },
];

interface TacticalMapProps {
  incidents?: any[];
  patrols?: any[];
  onDispatch?: (incidentId: string, unitId: string) => void;
}

export default function TacticalMap({
  incidents = [],
  patrols = [],
  onDispatch,
}: TacticalMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0f1e] text-slate-400 font-mono text-sm">
        Initializing Tactical CartoDB Radar Map...
      </div>
    );
  }

  // Default Center: Ladakh Border Sector
  const centerPosition: [number, number] = [34.150, 77.565];

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <MapContainer
        center={centerPosition}
        zoom={13}
        style={{ width: "100%", height: "100%", background: "#0a0f1e" }}
        attributionControl={false}
      >
        {/* Dark Matter Tactical Tile Layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Sector Geofenced Boundaries */}
        {SECTOR_POLYGONS.map((sec, idx) => (
          <Polygon
            key={idx}
            positions={sec.coords as any}
            pathOptions={{
              color: sec.color,
              weight: 1.5,
              dashArray: "4, 4",
              fillColor: sec.fillColor,
              fillOpacity: sec.fillOpacity,
            }}
          />
        ))}

        {/* Pulsing Threat Radius on Incident Sector B12 */}
        <Circle
          center={[34.150, 77.565]}
          radius={900}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.12,
            weight: 2,
          }}
        />

        {/* Incidents Markers */}
        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.lat || 34.150, inc.lon || 77.565]}
            icon={incidentIcon}
          >
            <Popup className="tactical-popup">
              <div className="p-3 bg-[#0d1322] text-slate-100 font-sans space-y-2 rounded-lg border border-red-500/30 w-64">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <span className="font-mono font-bold text-red-400 text-sm">{inc.id}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                    CRITICAL (82/100)
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-300">
                  Sector: <strong>{inc.sector}</strong>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {inc.ai_summary || "Multi-source correlated movement detected along ridgeway."}
                </p>
                <div className="text-[10px] font-mono text-slate-400">
                  Recommended: <strong className="text-emerald-400">Unit P03 (6.5 min)</strong>
                </div>
                <button
                  onClick={() => {
                    if (onDispatch) onDispatch(inc.id, "P03");
                    else toast.success("Patrol P03 dispatched to Sector B12");
                  }}
                  className="w-full py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono transition-colors"
                >
                  Confirm & Dispatch P03
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Patrol Units Markers */}
        {patrols.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lon]}
            icon={p.status === "available" ? patrolAvailableIcon : patrolBusyIcon}
          >
            <Popup className="tactical-popup">
              <div className="p-2.5 bg-[#0d1322] text-slate-100 font-sans space-y-1.5 rounded-lg border border-white/10 w-56">
                <div className="flex items-center justify-between border-b border-white/10 pb-1">
                  <span className="font-mono font-bold text-white text-xs">{p.name}</span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                      p.status === "available"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Location: Sector {p.sector}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  ETA to Ridge: ~{p.simulated_eta_minutes || 10} mins
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-[#0d1322]/90 backdrop-blur-md p-3 rounded-lg border border-white/10 font-mono text-xs text-slate-300 space-y-1.5 shadow-xl">
        <div className="font-bold text-slate-200 border-b border-white/10 pb-1 text-[11px]">
          TACTICAL MAP OVERLAYS
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span>Active Incident (Correlated)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Patrol Unit (Available)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Patrol Unit (En Route / Busy)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-red-500" />
          <span>Restricted Ridge Buffer Zone</span>
        </div>
      </div>
    </div>
  );
}
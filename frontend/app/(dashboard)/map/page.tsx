"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation, Shield, Users, Radio, AlertTriangle, Eye, EyeOff, Camera } from "lucide-react";
import { ThermalCameraFeed } from "@/components/shared/ThermalCameraFeed";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const TacticalMap = dynamic(() => import("@/components/map/TacticalMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#070B12] text-slate-400 font-mono text-sm">
      Loading Dark Tactical Sector Map...
    </div>
  ),
});

export default function LiveMapPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [patrols, setPatrols] = useState<any[]>([]);
  const [showThermalFeed, setShowThermalFeed] = useState(true);

  useEffect(() => {
    setIncidents([
      {
        id: "INC-1042",
        sector: "Sector B12 (Ridge Pass)",
        lat: 34.150,
        lon: 77.565,
        risk_score: 82,
        severity: "CRITICAL",
        ai_summary: "Multiple correlated observations in Sector B12 within 4-min window. Seismic sensors, thermal optics, and drone observer confirm ridgeway breach.",
        patrol_recommended: "Unit T03",
        status: "under_review",
      },
    ]);

    setPatrols([
      { id: "UNIT T01", name: "Patrol Alpha-1", sector: "B14", lat: 34.152, lon: 77.577, status: "available", simulated_eta_minutes: 24.0 },
      { id: "UNIT T02", name: "Patrol Bravo-2", sector: "A04", lat: 34.168, lon: 77.589, status: "busy", simulated_eta_minutes: 16.0 },
      { id: "UNIT T03", name: "Patrol Charlie-3", sector: "B12", lat: 34.148, lon: 77.562, status: "available", simulated_eta_minutes: 8.0 },
      { id: "UNIT T04", name: "Patrol Delta-4", sector: "C08", lat: 34.135, lon: 77.545, status: "available", simulated_eta_minutes: 35.0 },
    ]);
  }, []);

  const handleDispatch = async (incidentId: string, unitId: string) => {
    toast.success(`Patrol ${unitId} dispatched to ${incidentId}`);
    setPatrols((prev) =>
      prev.map((p) => (p.id === unitId ? { ...p, status: "busy" } : p))
    );
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-3">
      {/* Top Map Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B111A] p-3 rounded-lg border border-white/10 font-mono text-xs">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="font-bold text-white">LIVE SITUATIONAL MAP:</span>
          <span className="text-slate-400">Sector Grid B10–D04 (High-Altitude Ridge Pass)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <span>Active Threat: <strong className="text-red-400">INCIDENT #1042 (Sector B12)</strong></span>
          <span>•</span>
          <span>Available Units: <strong className="text-emerald-400">3 Ready</strong></span>
          <span>•</span>
          <button
            onClick={() => setShowThermalFeed(!showThermalFeed)}
            className="px-2.5 py-1 rounded bg-[#151F2B] hover:bg-[#1E293B] border border-white/10 text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{showThermalFeed ? "Hide Thermal Optic Feed" : "Show Thermal Optic Feed"}</span>
          </button>
        </div>
      </div>

      {/* Main Tactical Map Container with Floating Thermal Feed */}
      <div className="flex-1 w-full relative rounded-xl overflow-hidden">
        <TacticalMap
          incidents={incidents}
          patrols={patrols}
          onDispatch={handleDispatch}
        />

        {/* Floating Picture-in-Picture Live Thermal Mast Feed */}
        {showThermalFeed && (
          <div className="absolute top-4 right-4 z-[1000] w-80 shadow-2xl">
            <ThermalCameraFeed
              cameraName="MAST CAM-01 (THERMAL IR)"
              sector="Sector B12 Corridor"
              targetClass="UNIDENTIFIED SMALL UAV"
              confidence={92}
            />
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { Users, Shield, MapPin, Clock, ArrowRight, CheckCircle2, AlertCircle, Navigation } from "lucide-react";
import toast from "react-hot-toast";

const PATROL_RESOURCES = [
  {
    id: "UNIT T03",
    name: "Patrol Unit Charlie-3 (Rapid Strike)",
    status: "AVAILABLE",
    sector: "Sector B12 (Ridge Base)",
    distance: "3.2 KM",
    eta: "08 MIN",
    isRecommended: true,
    recommendationReason: "Nearest available suitable resource with high-altitude snow terrain capability.",
    crew: 4,
    vehicle: "Mahindra Marksman 4x4",
  },
  {
    id: "UNIT T01",
    name: "Patrol Unit Alpha-1",
    status: "AVAILABLE",
    sector: "Sector B14",
    distance: "12 KM",
    eta: "24 MIN",
    isRecommended: false,
    crew: 6,
    vehicle: "Tatra All-Terrain Transport",
  },
  {
    id: "UNIT T02",
    name: "Patrol Unit Bravo-2",
    status: "BUSY",
    sector: "Sector A04",
    distance: "7 KM",
    eta: "16 MIN",
    isRecommended: false,
    currentAssignment: "Routine Ridge Reconnaissance",
    crew: 4,
    vehicle: "Armoured Scout V04",
  },
  {
    id: "UNIT T04",
    name: "Patrol Unit Delta-4",
    status: "AVAILABLE",
    sector: "Sector C08",
    distance: "18 KM",
    eta: "35 MIN",
    isRecommended: false,
    crew: 4,
    vehicle: "Scout Vehicle",
  },
];

export default function ResponseResourcesPage() {
  const handleDispatch = (unitId: string) => {
    toast.success(`${unitId} Dispatched for High-Priority Verification.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Users className="w-3.5 h-3.5" />
            <span>TACTICAL RESPONSE UNITS & TERRAIN-AWARE ROUTING</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            RESPONSE RESOURCES
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time availability, distances, and terrain-factored response ETAs for rapid decision-support.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-[#0B111A] px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
          <span>Active Units: <strong className="text-white">4 Monitored</strong></span>
          <span>•</span>
          <span>Ready: <strong className="text-emerald-400">3 Available</strong></span>
        </div>
      </div>

      {/* RAKSHAK AI Highlighted Recommendation Banner (Section 17) */}
      <div className="c2-panel-highlight p-5 rounded-xl border border-blue-500/40 bg-gradient-to-r from-blue-950/30 to-slate-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>RAKSHAK AI RESPONSE RECOMMENDATION • INCIDENT #1042</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            RECOMMENDED
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-lg font-space font-bold text-white flex items-center gap-3">
              <span>UNIT T03 (Charlie-3 Rapid Strike)</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">ETA: 08 MIN (3.2 KM)</span>
            </div>
            <div className="text-xs text-slate-300 font-sans">
              <strong>Reason:</strong> Nearest available suitable resource with high-altitude snow terrain capability. Human officer authorization required.
            </div>
          </div>

          <button
            onClick={() => handleDispatch("UNIT T03")}
            className="py-2.5 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>REVIEW & DISPATCH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
          All Tactical Patrol Units
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PATROL_RESOURCES.map((unit) => (
            <div
              key={unit.id}
              className={`p-4 rounded-xl border space-y-3 ${
                unit.isRecommended
                  ? "c2-panel-highlight bg-[#101923] border-blue-500/40"
                  : "c2-panel bg-[#0B111A] border-white/5"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-base">{unit.id}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                        unit.status === "AVAILABLE"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      }`}
                    >
                      {unit.status}
                    </span>
                    {unit.isRecommended && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-500/30 text-cyan-300 border border-cyan-500/40">
                        BEST FIT
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">{unit.name}</div>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="text-white font-bold">{unit.distance}</div>
                  <div className="text-slate-400 text-[11px]">ETA ~{unit.eta}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                <div>Sector: <strong className="text-slate-200">{unit.sector}</strong></div>
                <div>Crew: <strong className="text-slate-200">{unit.crew} Pax</strong></div>
                <div>Vehicle: <strong className="text-slate-200">{unit.vehicle}</strong></div>
              </div>

              {unit.currentAssignment && (
                <div className="text-[11px] font-mono text-blue-300 bg-blue-950/30 p-2 rounded border border-blue-500/20">
                  Current Task: {unit.currentAssignment}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
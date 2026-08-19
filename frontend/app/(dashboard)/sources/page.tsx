"use client";

import React, { useState } from "react";
import {
  Database,
  Camera,
  Radio,
  Activity,
  FileEdit,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Send,
  Shield,
  Layers
} from "lucide-react";
import toast from "react-hot-toast";

const DATA_SOURCES_STATS = [
  { title: "CAMERAS", count: "24 / 26 ONLINE", status: "Nominal", color: "text-emerald-400", icon: Camera },
  { title: "DRONES", count: "6 / 7 AVAILABLE", status: "1 Sortie Active", color: "text-cyan-400", icon: Radio },
  { title: "GROUND SENSORS", count: "48 / 50 ONLINE", status: "2 Maintenance", color: "text-emerald-400", icon: Activity },
  { title: "OPERATOR REPORTS", count: "12 ACTIVE", status: "Crowd Intel", color: "text-blue-400", icon: FileEdit },
  { title: "OTHER DATA SOURCES", count: "8 ONLINE", status: "Weather & GIS", color: "text-purple-400", icon: Layers },
];

export default function DataSourcesPage() {
  const [location, setLocation] = useState("Sector B12 (Ridge Crest)");
  const [obsType, setObsType] = useState("Unidentified aerial activity");
  const [description, setDescription] = useState("");
  const [confidence, setConfidence] = useState("HIGH (85-95%)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please provide observation details");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDescription("");
      toast.success("Observation successfully added to incident intelligence.");
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Database className="w-3.5 h-3.5" />
            <span>SENSOR INGESTION BUS & OPERATOR TELEMETRY CHANNELS</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            Data Sources & Ingestion Monitoring
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time feed health across 5 multi-sensor categories + Human-in-the-Loop field operator inputs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#0B111A] px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
          <span>Overall Ingestion: <strong className="text-emerald-400">96.8% Nominal</strong></span>
        </div>
      </div>

      {/* 5 Data Source Monitoring Cards (Section 18) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {DATA_SOURCES_STATS.map((src, i) => {
          const Icon = src.icon;
          return (
            <div key={i} className="c2-panel p-4 rounded-xl border border-white/10 space-y-1.5 bg-[#0B111A]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{src.title}</span>
                <Icon className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div className="text-xl font-mono font-bold text-white">{src.count}</div>
              <div className={`text-[10px] font-mono ${src.color}`}>{src.status}</div>
            </div>
          );
        })}
      </div>

      {/* Section 19: Manual Drone Operator Observation Form (Human + AI Collaboration) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="c2-panel p-6 rounded-xl border border-white/10 space-y-4 bg-[#0B111A]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-white">
                <FileEdit className="w-4 h-4 text-blue-400" />
                <span>MANUAL DRONE OPERATOR / FIELD OBSERVATION INPUT</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Human + AI Input</span>
            </div>

            <p className="text-xs text-slate-300 font-sans">
              Drone operators and forward post observers can manually submit visual intelligence into the Rakshak AI correlation bus.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Location / Sector</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#101923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Observation Type</label>
                  <select
                    value={obsType}
                    onChange={(e) => setObsType(e.target.value)}
                    className="w-full bg-[#101923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option>Unidentified aerial activity</option>
                    <option>Unusual ground activity</option>
                    <option>Unidentified object</option>
                    <option>Environmental anomaly</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-slate-400">Tactical Description & Details</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe visual contact, heading, payload, number of entities..."
                  rows={3}
                  className="w-full bg-[#101923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-sans focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Operator Confidence Level</label>
                  <select
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value)}
                    className="w-full bg-[#101923] border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  >
                    <option>HIGH (85-95% - Clear Visual)</option>
                    <option>MEDIUM (65-84% - Partial Thermal)</option>
                    <option>LOW (50-64% - Fleeting Glint)</option>
                  </select>
                </div>

                <div className="pt-5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-mono text-xs font-bold transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBMIT OBSERVATION</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right 5 Cols: Ingested Feeds Live Log */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Recent Ingested Telemetry Packets
          </div>

          <div className="c2-panel p-4 rounded-xl border border-white/10 space-y-2.5 bg-[#0B111A] text-xs font-mono">
            <div className="p-2.5 rounded bg-[#101923] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold">CAM-01 (Thermal Mast)</span>
                <span className="text-slate-500 text-[10px]">14:32:15 IST</span>
              </div>
              <div className="text-slate-300">Optical vector tracking Sector B12 ridge buffer</div>
            </div>

            <div className="p-2.5 rounded bg-[#101923] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold">SENS-01 (Ground Seismic)</span>
                <span className="text-slate-500 text-[10px]">14:31:00 IST</span>
              </div>
              <div className="text-slate-300">Vibration amplitude 24.8 Hz logged on Node 01</div>
            </div>

            <div className="p-2.5 rounded bg-[#101923] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">DRONE-01 (Netra UAV)</span>
                <span className="text-slate-500 text-[10px]">14:34:00 IST</span>
              </div>
              <div className="text-slate-300">Aerial observer confirmed loitering UAV anomaly</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
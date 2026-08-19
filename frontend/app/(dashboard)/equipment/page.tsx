"use client";

import React, { useState } from "react";
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Truck,
  Radio,
  Camera,
  Cpu,
  RefreshCw,
  SlidersHorizontal,
  Flame,
  Gauge
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";
import toast from "react-hot-toast";

const ASSETS = [
  {
    id: "V12",
    type: "Heavy Transport Vehicle",
    name: "Tatra 8x8 All-Terrain Transport V12",
    sector: "Sector B12 (Ridge Base)",
    status: "operational",
    health_score: 64,
    maintenance_risk: "HIGH",
    engine_temp: 94.5,
    vibration: 4.8,
    oil_pressure: 31.0,
    battery: 12.1,
    operating_hours: 4820,
    fault_codes: ["P0115_COOLANT_TEMP_ELEVATED", "P0340_VIBRATION_WARN"],
    recommendation: "Elevated engine temperature and abnormal chassis vibration detected under grade. Recommend inspection prior to next high-altitude sortie.",
  },
  {
    id: "V04",
    type: "Armoured Scout",
    name: "Mahindra Marksman Patrol V04",
    sector: "Sector A04",
    status: "operational",
    health_score: 94,
    maintenance_risk: "LOW",
    engine_temp: 76.2,
    vibration: 1.1,
    oil_pressure: 44.0,
    battery: 12.8,
    operating_hours: 1250,
    fault_codes: [],
    recommendation: "All parameters nominal. Standard preventive service scheduled in 140 hours.",
  },
  {
    id: "DRONE-01",
    type: "Recon UAV",
    name: "ITBP Netra-1 Surveillance Drone",
    sector: "Sector B12 Ridge",
    status: "operational",
    health_score: 88,
    maintenance_risk: "LOW",
    engine_temp: 42.0,
    vibration: 0.8,
    oil_pressure: 0,
    battery: 15.6,
    operating_hours: 320,
    fault_codes: [],
    recommendation: "Propulsion and optical gimbal telemetry nominal. Battery health 96%.",
  },
  {
    id: "CAM-02",
    type: "Optical Mast",
    name: "Long-Range Thermal Cam Mast 02",
    sector: "Sector D02",
    status: "maintenance",
    health_score: 42,
    maintenance_risk: "CRITICAL",
    engine_temp: 68.0,
    vibration: 0.2,
    oil_pressure: 0,
    battery: 10.8,
    operating_hours: 6200,
    fault_codes: ["CAM_OPTIC_CALIBRATION_FAIL"],
    recommendation: "Thermal sensor calibration error in sub-zero frost. Scheduled technician service.",
  },
];

const TELEMETRY_HISTORY = [
  { time: "06:00", temp: 78, vibration: 1.8, oil: 42 },
  { time: "07:00", temp: 81, vibration: 2.2, oil: 40 },
  { time: "08:00", temp: 84, vibration: 2.9, oil: 38 },
  { time: "09:00", temp: 89, vibration: 3.8, oil: 34 },
  { time: "10:00", temp: 94, vibration: 4.8, oil: 31 },
];

export default function EquipmentHealthPage() {
  const [selectedAsset, setSelectedAsset] = useState<any>(ASSETS[0]);

  const handleFlagInspection = (assetId: string) => {
    toast.success(`Asset ${assetId} flagged for Pre-Deployment Inspection.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <Wrench className="w-3.5 h-3.5" />
            <span>CONDITION-BASED TELEMETRY & PREDICTIVE FLEET HEALTH</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            Equipment Health Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-white/10">
          <span>Fleet Monitored: <strong className="text-white">8 Assets</strong></span>
          <span>•</span>
          <span>High Risk: <strong className="text-amber-400">1 Vehicle (V12)</strong></span>
        </div>
      </div>

      {/* Grid: Assets Cards + Telemetry Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Asset Selection Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            Critical Assets Inventory
          </div>

          {ASSETS.map((asset) => (
            <div
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                selectedAsset?.id === asset.id
                  ? "glass-panel-glow border-blue-500/50 bg-[#182234]"
                  : "glass-panel border-white/5 hover:border-white/20 bg-[#111827]/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {asset.type.includes("Vehicle") || asset.type.includes("Scout") ? (
                      <Truck className="w-4 h-4" />
                    ) : asset.type.includes("Drone") ? (
                      <Radio className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-space">{asset.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{asset.sector}</div>
                  </div>
                </div>

                <div className="text-right space-y-0.5">
                  <div
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      asset.maintenance_risk === "HIGH" || asset.maintenance_risk === "CRITICAL"
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    {asset.maintenance_risk} RISK
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-200">
                    Health: {asset.health_score}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                <div>Temp: <strong className="text-slate-200">{asset.engine_temp}°C</strong></div>
                <div>Vib: <strong className="text-slate-200">{asset.vibration} mm/s</strong></div>
                <div>Hours: <strong className="text-slate-200">{asset.operating_hours}h</strong></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Asset Telemetry Inspection & Live Charts (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {selectedAsset && (
            <div className="glass-panel p-6 rounded-xl border border-white/10 space-y-5">
              {/* Asset Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-space font-extrabold text-white">{selectedAsset.name}</h2>
                    <span
                      className={`text-xs font-mono px-2.5 py-0.5 rounded border ${
                        selectedAsset.maintenance_risk === "HIGH" || selectedAsset.maintenance_risk === "CRITICAL"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      }`}
                    >
                      {selectedAsset.maintenance_risk} RISK
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Sector: {selectedAsset.sector} • Operating Hours: {selectedAsset.operating_hours} hrs
                  </div>
                </div>

                <button
                  onClick={() => handleFlagInspection(selectedAsset.id)}
                  className="py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs transition-colors"
                >
                  Flag for Inspection
                </button>
              </div>

              {/* Live Gauges Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span>Engine Temp</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white">{selectedAsset.engine_temp}°C</div>
                  <div className="text-[9px] text-amber-400 font-mono">Warn &gt; 85°C</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Activity className="w-3 h-3 text-amber-400" />
                    <span>Vibration</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white">{selectedAsset.vibration} mm/s</div>
                  <div className="text-[9px] text-amber-400 font-mono">Warn &gt; 3.5 mm/s</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-cyan-400" />
                    <span>Oil Pressure</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white">{selectedAsset.oil_pressure || 42} PSI</div>
                  <div className="text-[9px] text-slate-400 font-mono">Normal: 35-50</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-emerald-400" />
                    <span>Battery</span>
                  </div>
                  <div className="text-xl font-mono font-bold text-white">{selectedAsset.battery} V</div>
                  <div className="text-[9px] text-emerald-400 font-mono">Nominal</div>
                </div>
              </div>

              {/* Predictive Telemetry Trend Chart */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>Temperature & Vibration Telemetry Trend</span>
                  <span className="text-[10px] text-slate-400">Past 5 Hours (High-Altitude Run)</span>
                </div>

                <div className="h-48 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TELEMETRY_HISTORY}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorVib" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontStyle="monospace" />
                      <YAxis stroke="#64748b" fontSize={11} fontStyle="monospace" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0d1322",
                          borderColor: "rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontFamily: "monospace",
                        }}
                      />
                      <Area type="monotone" dataKey="temp" name="Engine Temp (°C)" stroke="#ef4444" fillOpacity={1} fill="url(#colorTemp)" />
                      <Area type="monotone" dataKey="vibration" name="Vibration (mm/s)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVib)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Maintenance AI Recommendation */}
              <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>PREDICTIVE MAINTENANCE RECOMMENDATION</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {selectedAsset.recommendation}
                </p>
                {selectedAsset.fault_codes?.length > 0 && (
                  <div className="pt-2 text-[10px] font-mono text-slate-400 flex items-center gap-2">
                    <span>Active ECU Fault Codes:</span>
                    {selectedAsset.fault_codes.map((code: string, i: number) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30">
                        {code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
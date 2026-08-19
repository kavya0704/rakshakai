"use client";

import React, { useState } from "react";
import {
  Network,
  Activity,
  Camera,
  Radio,
  Sparkles,
  Layers,
  ArrowRight,
  Shield,
  Clock,
  Cpu
} from "lucide-react";
import Link from "next/link";

export default function CorrelationPage() {
  const [selectedSensor, setSelectedSensor] = useState("all");

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Network className="w-3.5 h-3.5" />
            <span>SPATIO-TEMPORAL EVENT FUSION & CORRELATION GRAPH</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            Multi-Source Event Correlation
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time algorithmic fusion across seismic, thermal, optical and aerial observer feeds.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#0B111A] px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
          <span>Correlation Window: <strong className="text-cyan-400">&Delta;T &le; 600s (10 min)</strong></span>
          <span>•</span>
          <span>Spatial Lock: <strong className="text-emerald-400">Sector B12 Corridor</strong></span>
        </div>
      </div>

      {/* Signature Vector Graph Box (Large Format) */}
      <div className="c2-panel p-6 rounded-xl border border-white/10 space-y-6 bg-[#0B111A]">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>ACTIVE FUSION GRAPH • SECTOR B12</span>
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            3 SOURCES CONVERGED
          </span>
        </div>

        <div className="p-8 rounded-xl bg-[#101923] border border-white/5 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Col: 3 Ingested Feeds (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="p-3 rounded-lg bg-[#151F2B] border border-cyan-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    GROUND SENSOR NODE 01
                  </span>
                  <span className="text-[10px] text-slate-400">14:31 IST</span>
                </div>
                <div className="text-xs text-slate-200">Seismic amplitude peak: 24.8 Hz</div>
                <div className="text-[10px] font-mono text-slate-400">Confidence: 89%</div>
              </div>

              <div className="p-3 rounded-lg bg-[#151F2B] border border-blue-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 font-bold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    THERMAL OPTIC MAST 01
                  </span>
                  <span className="text-[10px] text-slate-400">14:32 IST</span>
                </div>
                <div className="text-xs text-slate-200">Perimeter movement tracked</div>
                <div className="text-[10px] font-mono text-slate-400">Confidence: 82%</div>
              </div>

              <div className="p-3 rounded-lg bg-[#151F2B] border border-emerald-500/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    DRONE OBSERVER NETRA-1
                  </span>
                  <span className="text-[10px] text-slate-400">14:34 IST</span>
                </div>
                <div className="text-xs text-slate-200">Aerial UAV anomaly confirmed</div>
                <div className="text-[10px] font-mono text-slate-400">Confidence: 92%</div>
              </div>
            </div>

            {/* Middle Col: Fusion Engine Hub (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3 text-center">
              <div className="p-4 rounded-full bg-blue-600/20 border-2 border-blue-500 text-blue-400 animate-pulse">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <div className="font-space font-bold text-sm text-white">RAKSHAK CORRELATION CORE</div>
                <div className="text-[11px] font-mono text-cyan-400">Time Delta: 180s (&le; 600s window)</div>
                <div className="text-[10px] font-mono text-slate-400">Spatial Proximity: 120m tolerance</div>
              </div>
            </div>

            {/* Right Col: Output Incident Node (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="p-5 rounded-xl bg-red-950/40 border border-red-500/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-white text-base">INCIDENT #1042</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">
                    HIGH PRIORITY
                  </span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-red-400">
                  82 <span className="text-xs font-normal text-slate-400">/ 100 RISK</span>
                </div>
                <div className="text-xs text-slate-300 font-sans">
                  "Multi-source correlation established. High-priority verification recommended for Unit T03."
                </div>
                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/incidents"
                    className="w-full py-2 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs text-center block transition-colors font-medium"
                  >
                    Open Incident Review →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
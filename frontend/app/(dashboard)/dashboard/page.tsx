"use client";

import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Shield,
  Activity,
  Users,
  Wrench,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Radio,
  Eye,
  Camera,
  Layers,
  CheckCircle2,
  Cpu,
  ChevronRight,
  Database
} from "lucide-react";

export default function OperationalOverviewPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>OPERATIONAL INTELLIGENCE & EVENT CORRELATION LAYER</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            OPERATIONAL OVERVIEW
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Unified view of monitored areas, correlated incidents and response resources across high-altitude border sectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/simulation"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-mono transition-colors"
          >
            <span>⚡ Open Simulation Controller</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* High-Quality KPI Cards (Section 8) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {/* Active Incidents */}
        <div className="c2-panel p-3.5 rounded-xl border border-white/10 space-y-1 bg-[#0B111A]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Active Incidents</div>
          <div className="text-2xl font-mono font-bold text-white">07</div>
          <div className="text-[10px] text-red-400 font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span>02 Require Review</span>
          </div>
        </div>

        {/* High Priority */}
        <div className="c2-panel p-3.5 rounded-xl border border-red-500/30 space-y-1 bg-[#101923]">
          <div className="text-[10px] font-mono text-red-400 uppercase font-bold">High Priority</div>
          <div className="text-2xl font-mono font-bold text-red-400">02</div>
          <div className="text-[10px] text-slate-400 font-mono">Risk Score &gt; 80</div>
        </div>

        {/* Monitored Sources */}
        <div className="c2-panel p-3.5 rounded-xl border border-white/10 space-y-1 bg-[#0B111A]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Monitored Sources</div>
          <div className="text-2xl font-mono font-bold text-cyan-400">28</div>
          <div className="text-[10px] text-emerald-400 font-mono">26/28 Active Feeds</div>
        </div>

        {/* Response Units */}
        <div className="c2-panel p-3.5 rounded-xl border border-white/10 space-y-1 bg-[#0B111A]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Units Available</div>
          <div className="text-2xl font-mono font-bold text-emerald-400">14</div>
          <div className="text-[10px] text-slate-400 font-mono">Ready for Dispatch</div>
        </div>

        {/* Equipment Alerts */}
        <div className="c2-panel p-3.5 rounded-xl border border-amber-500/30 space-y-1 bg-[#0B111A]">
          <div className="text-[10px] font-mono text-amber-400 uppercase">Equipment Alerts</div>
          <div className="text-2xl font-mono font-bold text-amber-400">04</div>
          <div className="text-[10px] text-slate-400 font-mono">V12 Telemetry Warn</div>
        </div>

        {/* System Health */}
        <div className="c2-panel p-3.5 rounded-xl border border-white/10 space-y-1 bg-[#0B111A]">
          <div className="text-[10px] font-mono text-slate-400 uppercase">System Health</div>
          <div className="text-2xl font-mono font-bold text-emerald-400">98.6%</div>
          <div className="text-[10px] text-slate-400 font-mono">All Buses Nominal</div>
        </div>
      </div>

      {/* Main Grid: Live Incidents Panel + Correlation Signature Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Incidents Panel (Section 9) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>ACTIVE CORRELATED INCIDENTS</span>
            </h2>
            <Link href="/incidents" className="text-xs text-blue-400 hover:underline font-mono">
              View All Incidents →
            </Link>
          </div>

          {/* Primary High-Priority Incident #1042 Card */}
          <div className="c2-panel-highlight p-5 rounded-xl space-y-4 bg-[#101923]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-lg text-white">INCIDENT #1042</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
                    HIGH PRIORITY
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    AWAITING HUMAN REVIEW
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                  <span className="text-white font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Sector B12 (Ridge Corridor)
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    14:34 IST
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">RISK SCORE</div>
                <div className="text-2xl font-mono font-extrabold text-red-400">
                  82 <span className="text-xs font-normal text-slate-500">/ 100</span>
                </div>
              </div>
            </div>

            {/* Data Sources Badges */}
            <div className="p-2.5 rounded-lg bg-[#0B111A] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500">Sources:</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">DRONE</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">CAMERA</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25">GROUND SENSOR</span>
              </div>
              <div className="text-emerald-400 font-bold">
                Recommended: Unit T03 (08 min ETA)
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "Rakshak AI correlated three observations occurring within the same geographic area and a short 4-minute time window. Ground seismic sensors, thermal cameras, and aerial observer drones independently confirm anomalous movement along the ridge corridor."
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-1 border-t border-white/5">
              <Link
                href="/incidents"
                className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-medium transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
              >
                <span>VIEW INCIDENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/map"
                className="py-2 px-4 rounded-lg bg-[#151F2B] hover:bg-[#1E293B] border border-white/10 text-slate-200 font-mono text-xs transition-colors"
              >
                OPEN MAP
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Source Correlation Signature Graph (Section 12) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>MULTI-SOURCE CORRELATION VISUALIZATION</span>
          </div>

          <div className="c2-panel p-5 rounded-xl border border-white/10 space-y-4 bg-[#0B111A]">
            <div className="text-[11px] text-slate-400 font-sans">
              Visually demonstrates Rakshak AI's core USP: fusing fragmented sensor feeds into one prioritized incident picture.
            </div>

            {/* Vector Diagram Graph Box */}
            <div className="p-4 rounded-lg bg-[#101923] border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                {/* Left Feeds */}
                <div className="space-y-2">
                  <div className="p-2 rounded bg-[#151F2B] border border-blue-500/30 text-blue-300 flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>THERMAL CAMERA</span>
                  </div>
                  <div className="p-2 rounded bg-[#151F2B] border border-cyan-500/30 text-cyan-300 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GROUND SENSOR</span>
                  </div>
                  <div className="p-2 rounded bg-[#151F2B] border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" />
                    <span>DRONE OBSERVER</span>
                  </div>
                </div>

                {/* Arrows to Center */}
                <div className="text-slate-600 font-mono text-xs px-2 flex flex-col items-center justify-center space-y-3">
                  <span>───\</span>
                  <span>────►</span>
                  <span>───/</span>
                </div>

                {/* Correlated Node */}
                <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/40 text-right space-y-1">
                  <div className="text-[10px] font-mono text-red-400 font-bold">FUSED INCIDENT</div>
                  <div className="font-mono font-bold text-white text-sm">INCIDENT #1042</div>
                  <div className="text-xs font-mono font-extrabold text-red-400">RISK: 82/100</div>
                  <div className="text-[9px] font-mono text-slate-400">SECTOR B12</div>
                </div>
              </div>
            </div>

            {/* Groq LPU Summary */}
            <div className="p-3 rounded-lg bg-[#151F2B] border border-cyan-500/30 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <span className="flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>GROQ AI SYNTHESIS (LLaMA-3 70B)</span>
                </span>
                <span>&lt;0.4s Ingestion</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                "Multi-source correlation established with 89% confidence. High-priority verification recommended for Patrol Unit T03."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
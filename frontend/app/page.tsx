"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowRight, Activity, Map, Cpu, Zap, Radio, CheckCircle2, AlertCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070B12] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden tactical-grid-bg">
      <div className="relative z-10 max-w-3xl space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>SMART INDIA HACKATHON 2026 • SIH-1642</span>
        </div>

        {/* Branding */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-space font-extrabold tracking-tight text-white">
            RAKSHAK <span className="text-blue-400">AI</span>
          </h1>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            OPERATIONAL INTELLIGENCE & DECISION-SUPPORT SYSTEM
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Turning fragmented multi-source observations into a unified, explainable and prioritized operational picture for human decision-makers.
        </p>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-left font-mono">
          <div className="c2-panel p-3 rounded-lg border border-white/5 space-y-1 bg-[#0B111A]">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs">
              <Zap className="w-3.5 h-3.5" /> FUSION
            </div>
            <div className="text-xs text-slate-200 font-medium">5-Source Ingestion</div>
          </div>
          <div className="c2-panel p-3 rounded-lg border border-white/5 space-y-1 bg-[#0B111A]">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
              <Activity className="w-3.5 h-3.5" /> CORRELATION
            </div>
            <div className="text-xs text-slate-200 font-medium">&Delta;T &le; 600s Lock</div>
          </div>
          <div className="c2-panel p-3 rounded-lg border border-white/5 space-y-1 bg-[#0B111A]">
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs">
              <Cpu className="w-3.5 h-3.5" /> GROQ LPU
            </div>
            <div className="text-xs text-slate-200 font-medium">&lt;0.4s AI Brief</div>
          </div>
          <div className="c2-panel p-3 rounded-lg border border-white/5 space-y-1 bg-[#0B111A]">
            <div className="flex items-center gap-1.5 text-amber-400 text-xs">
              <Map className="w-3.5 h-3.5" /> ROUTING
            </div>
            <div className="text-xs text-slate-200 font-medium">Terrain-Factored ETA</div>
          </div>
        </div>

        {/* Enter Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors shadow-xl shadow-blue-600/25"
          >
            <span>ENTER COMMAND CONSOLE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-4 text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>PROTOTYPE ENVIRONMENT • SIMULATED DATA ONLY • DECISION SUPPORT ONLY</span>
        </div>
      </div>
    </div>
  );
}
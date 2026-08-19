"use client";

import React from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";

export function StatusBanner() {
  return (
    <div className="bg-[#0B111A] border-b border-white/10 px-4 py-1 text-[11px] font-mono text-slate-400 flex items-center justify-between select-none">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>PROTOTYPE ENVIRONMENT</span>
        </span>
        <span className="hidden sm:inline text-slate-400">
          Simulated multi-source telemetry data layer • SIH 2026 Decision-Support Demonstration
        </span>
      </div>
      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-emerald-400 font-medium">Human-in-the-Loop Enforced</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Non-Kinetic Intelligence Layer</span>
      </div>
    </div>
  );
}
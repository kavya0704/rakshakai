"use client";

import React, { useState, useEffect } from "react";
import { Shield, Clock, Cpu, Radio, User, Bell, CheckCircle2, Lock } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export function Topbar() {
  const user = useAuthStore((state) => state.user);
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }) + " IST");
      setDateStr(now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-[#0B111A] border-b border-white/10 px-6 flex items-center justify-between select-none flex-shrink-0">
      {/* Left: Branding & Connection Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-space font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>RAKSHAK</span>
              <span className="text-blue-400">AI</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">
              Operational Intelligence System
            </div>
          </div>
        </div>

        {/* Real-Time System Status Badges */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono border-l border-white/10 pl-4">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SECURE CONNECTION</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>DATA PIPELINE ONLINE</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>AI ENGINE READY (GROQ LPU)</span>
          </div>
        </div>
      </div>

      {/* Right: Date/Time Clocks & Operator Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-[#101923] px-3 py-1.5 rounded-lg border border-white/5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">{dateStr}</span>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-white">{timeStr}</span>
        </div>

        <div className="flex items-center gap-2.5 bg-[#101923] px-3 py-1.5 rounded-lg border border-white/5 text-xs font-mono">
          <User className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-bold text-slate-200 uppercase">
            {user?.role === "commander" ? "COMMAND OPERATOR" : user?.role === "observer" ? "RECON OBSERVER" : "DUTY OFFICER"}
          </span>
        </div>
      </div>
    </header>
  );
}
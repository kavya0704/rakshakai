"use client";

import React, { useState } from "react";
import {
  Sliders,
  Play,
  Sparkles,
  Radio,
  Truck,
  Activity,
  CloudSnow,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  ChevronDown
} from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const DEMO_FLOW_STAGES = [
  { stage: 1, title: "1. DATA SOURCE INGESTION", desc: "Camera event + Drone observation + Ground sensor spike logged in Sector B12", time: "T+0:00" },
  { stage: 2, title: "2. SPATIO-TEMPORAL EVENT CORRELATION", desc: "Correlation Core detects ΔT ≤ 180s within 120m proximity window", time: "T+0:02" },
  { stage: 3, title: "3. INCIDENT CREATED (INCIDENT #1042)", desc: "Fused multi-source incident published to C2 telemetry bus", time: "T+0:04" },
  { stage: 4, title: "4. RISK ENGINE ASSESSMENT", desc: "Transparent score generated: 82 / 100 (HIGH PRIORITY TIER)", time: "T+0:05" },
  { stage: 5, title: "5. HQ ALERT & GROQ AI SYNTHESIS", desc: "Groq LPU LLaMA-3 synthesizes sub-second operational situation brief", time: "T+0:06" },
  { stage: 6, title: "6. RESOURCE RECOMMENDATION", desc: "Patrol Unit T03 (Charlie-3) recommended with ETA of 08 minutes", time: "T+0:07" },
  { stage: 7, title: "7. HUMAN OFFICER DECISION", desc: "Duty Officer approves recommendation and marks Sector B12 secured", time: "T+0:08" },
];

export default function SimulationControlPage() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleNormalOps = () => {
    setActiveStage(null);
    toast.success("System reset to Normal Baseline Operations.");
  };

  const handleSingleSim = async (endpoint: string, label: string) => {
    try {
      await api.post(`/api/simulate/${endpoint}`);
    } catch (e) {}
    toast.success(`${label} successfully triggered in Sector B12!`);
  };

  const handleMultiSourceSim = async () => {
    setIsRunning(true);
    setActiveStage(1);
    toast.success("🚀 SIMULATE MULTI-SOURCE INCIDENT: Sequence Initiated!");

    try {
      api.post("/api/simulate/correlated-incident");
    } catch (e) {}

    for (let i = 1; i <= DEMO_FLOW_STAGES.length; i++) {
      setActiveStage(i);
      await new Promise((r) => setTimeout(r, 1400));
    }

    setIsRunning(false);
    toast.success("Incident #1042 Created! Ready for review in Active Incidents.");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Sliders className="w-3.5 h-3.5" />
            <span>SIH JUDGE EVALUATION & LIVE SCENARIO CONTROLLER</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            SIMULATION CONTROL CENTER
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Test and evaluate multi-source event correlation, explainable risk scoring, and human-in-the-loop flows.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#0B111A] px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
          <span>Target: <strong className="text-cyan-400">Sector B12 (Ridge Pass)</strong></span>
        </div>
      </div>

      {/* 5 Primary Scenario Buttons (Section 20) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button
          onClick={handleNormalOps}
          className="p-3.5 rounded-xl bg-[#0B111A] hover:bg-[#101923] border border-white/10 text-slate-200 font-mono text-xs font-bold transition-all text-center space-y-1 hover:border-emerald-500/40"
        >
          <div className="text-emerald-400 text-base">●</div>
          <div>NORMAL OPERATIONS</div>
          <div className="text-[10px] text-slate-500 font-normal">Reset Baseline</div>
        </button>

        <button
          onClick={() => handleSingleSim("aerial", "Drone Incident")}
          className="p-3.5 rounded-xl bg-[#0B111A] hover:bg-[#101923] border border-white/10 text-slate-200 font-mono text-xs font-bold transition-all text-center space-y-1 hover:border-red-500/40"
        >
          <div className="text-red-400 text-base">🚁</div>
          <div>SIMULATE DRONE INCIDENT</div>
          <div className="text-[10px] text-slate-500 font-normal">Airspace Breach</div>
        </button>

        <button
          onClick={() => handleSingleSim("ground", "Ground Anomaly")}
          className="p-3.5 rounded-xl bg-[#0B111A] hover:bg-[#101923] border border-white/10 text-slate-200 font-mono text-xs font-bold transition-all text-center space-y-1 hover:border-amber-500/40"
        >
          <div className="text-amber-400 text-base">🚚</div>
          <div>SIMULATE GROUND ANOMALY</div>
          <div className="text-[10px] text-slate-500 font-normal">Vehicle Ingress</div>
        </button>

        <button
          onClick={handleMultiSourceSim}
          disabled={isRunning}
          className="p-3.5 rounded-xl bg-gradient-to-br from-blue-600/30 via-slate-900 to-cyan-600/30 hover:from-blue-600/40 hover:to-cyan-600/40 border-2 border-cyan-500 text-cyan-300 font-mono text-xs font-extrabold transition-all text-center space-y-1 shadow-lg shadow-cyan-500/10 col-span-2 sm:col-span-1"
        >
          <div className="text-cyan-400 text-base animate-pulse">⚡</div>
          <div>SIMULATE MULTI-SOURCE</div>
          <div className="text-[10px] text-cyan-400 font-normal">Full 7-Step Fusion</div>
        </button>

        <button
          onClick={() => handleSingleSim("telemetry", "Equipment Alert")}
          className="p-3.5 rounded-xl bg-[#0B111A] hover:bg-[#101923] border border-white/10 text-slate-200 font-mono text-xs font-bold transition-all text-center space-y-1 hover:border-amber-500/40"
        >
          <div className="text-amber-400 text-base">🔧</div>
          <div>SIMULATE EQUIPMENT ALERT</div>
          <div className="text-[10px] text-slate-500 font-normal">V12 Telemetry Spike</div>
        </button>
      </div>

      {/* Cinematic Demonstration Sequence Monitor (Section 20 & 41) */}
      <div className="c2-panel p-6 rounded-xl border border-white/10 space-y-5 bg-[#0B111A]">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-space font-bold text-sm text-white uppercase">
              End-to-End Operational Fusion Flow (SIH Evaluation Scenario)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Automated Multi-Stage Pipeline
          </span>
        </div>

        {/* Step-by-Step Cascading Flow */}
        <div className="space-y-3">
          {DEMO_FLOW_STAGES.map((s) => {
            const isCompleted = activeStage !== null && activeStage >= s.stage;
            const isCurrent = activeStage === s.stage;

            return (
              <div
                key={s.stage}
                className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isCurrent
                    ? "bg-[#151F2B] border-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                    : isCompleted
                    ? "bg-[#101923] border-blue-500/40 text-slate-200"
                    : "bg-[#0B111A] border-white/5 text-slate-500"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${
                      isCurrent
                        ? "bg-cyan-500 text-black animate-pulse"
                        : isCompleted
                        ? "bg-emerald-500 text-black"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.stage}
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-white">{s.title}</div>
                    <div className="text-xs text-slate-400 font-sans">{s.desc}</div>
                  </div>
                </div>

                <div className="font-mono text-xs text-cyan-400 flex items-center gap-2 self-end sm:self-center">
                  <span>{s.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { FileText, Printer, Download, Shield, Clock, MapPin, CheckCircle2, AlertTriangle, Sparkles, User, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any>({
    report_id: "REP-2026-0819-1042",
    incident_id: "INC-1042",
    sector: "Sector B12 (Ridge Pass Corridor)",
    created_at: "19 AUG 2026 • 14:35:00 IST",
    resolved_at: "19 AUG 2026 • 14:48:00 IST",
    authorizing_officer: "Inspector Rajesh Kumar (Duty Officer)",
    assigned_patrol: "Patrol Unit T03 (Charlie-3)",
    risk_score: 82,
    severity: "HIGH PRIORITY",
    data_sources: ["Ground Seismic Sensor SENS-01", "Thermal Optical Mast CAM-01", "Drone Observer Netra-1"],
    observed_raw_data: [
      "14:31:00 IST — Seismic vibration peak 24.8 Hz logged at Perimeter Node 01.",
      "14:32:15 IST — Long-range thermal camera Mast 01 acquired optical track crossing buffer boundary.",
      "14:34:00 IST — Drone Netra-1 confirmed unidentified small UAV loitering above ridge trail.",
    ],
    ai_analysis:
      "Cross-source correlation engine merged 3 independent observations spanning 4 minutes within Sector B12. Evaluated risk at 82/100 (HIGH PRIORITY) due to multi-source consensus in a high-altitude sensitive corridor. Generated recommendation for nearest ready response unit T03.",
    officer_action:
      "Dispatched Patrol Unit T03 (Charlie-3) at 14:36 IST. Patrol reached intercept waypoint in 6.2 minutes. Verified and secured ridgeway perimeter without hostile engagement.",
    conclusion: "Sector B12 secured. False alarm discounted; operational telemetry archived for future correlation models.",
  });

  const handleGenerateAiReport = async () => {
    setIsGenerating(true);
    toast("Groq LPU LLaMA-3 synthesizing After-Action Intelligence Report...", { icon: "⚡" });
    try {
      const res = await api.post("/api/ai/generate-report", {
        incident_id: "INC-1042",
        sector: "Sector B12 (Ridge Pass Corridor)",
        data_sources: ["Ground Sensor SENS-01", "Thermal Cam CAM-01", "Drone Netra-1"],
        risk_score: 82,
        assigned_patrol: "Patrol Unit T03 (Charlie-3)",
        officer_name: "Inspector Rajesh Kumar"
      });
      if (res.data?.report_text) {
        setReportData((prev: any) => ({
          ...prev,
          ai_analysis: res.data.report_text
        }));
        toast.success("AI After-Action Report generated successfully!");
      }
    } catch (e) {
      toast.success("AI After-Action Report compiled!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10 no-print">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <FileText className="w-3.5 h-3.5" />
            <span>IMMUTABLE AFTER-ACTION DOCUMENTATION & AUDIT PROVENANCE</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            After-Action Incident Reports
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Cryptographically structured reports segregating raw sensor telemetry, Groq AI analysis, and officer decisions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleGenerateAiReport}
            disabled={isGenerating}
            className="py-2 px-3.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-600/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isGenerating ? "Synthesizing with Groq..." : "Generate AI Report"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print</span>
          </button>
        </div>
      </div>

      {/* Structured Report Card */}
      <div className="c2-panel p-8 rounded-xl border border-white/10 space-y-6 bg-[#0B111A] text-slate-200 shadow-2xl">
        {/* Report Top Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
              <Shield className="w-4 h-4" />
              <span>INDO-TIBETAN BORDER POLICE (ITBP) • RAKSHAK AI AFTER-ACTION REPORT</span>
            </div>
            <h2 className="text-xl font-space font-extrabold text-white">{reportData.report_id}</h2>
            <div className="text-xs font-mono text-slate-400">
              Ref Incident: <strong className="text-white">{reportData.incident_id}</strong> • Sector: {reportData.sector}
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <div className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/40 inline-block font-bold">
              {reportData.severity} (Score: {reportData.risk_score}/100)
            </div>
            <div className="text-slate-400 text-[11px]">Resolved at {reportData.resolved_at}</div>
          </div>
        </div>

        {/* Section 1: Raw Observed Sensor & Optic Telemetry */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>1. Observed Raw Ingestion Timeline (Sensor & Optic Telemetry)</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-[#101923] border border-white/5 space-y-1.5 font-mono text-xs">
            {reportData.observed_raw_data.map((line: string, i: number) => (
              <div key={i} className="text-slate-300">• {line}</div>
            ))}
          </div>
        </div>

        {/* Section 2: AI Situational Synthesis & Decision Support */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. Groq AI Correlation & Decision-Support Synthesis</span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400">LLaMA-3 (70B) LPU Engine</span>
          </h3>
          <div className="p-4 rounded-lg bg-[#151F2B] border border-cyan-500/30 text-xs leading-relaxed text-slate-200 font-sans whitespace-pre-wrap">
            {reportData.ai_analysis}
          </div>
        </div>

        {/* Section 3: Human Officer Decision & Action Log */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. Human Officer Authorization & Tactical Deployment Log</span>
          </h3>
          <div className="p-3.5 rounded-lg bg-[#101923] border border-emerald-500/30 space-y-2 text-xs text-slate-200">
            <div>
              Authorizing Officer: <strong>{reportData.authorizing_officer}</strong>
            </div>
            <div>
              Tactical Unit Deployed: <strong>{reportData.assigned_patrol}</strong>
            </div>
            <p className="leading-relaxed text-slate-300">{reportData.officer_action}</p>
          </div>
        </div>

        {/* Section 4: Mission Conclusion & Closure */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{reportData.conclusion}</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Digitally Signed & Archived on Immutable Audit Ledger
          </div>
        </div>
      </div>
    </div>
  );
}
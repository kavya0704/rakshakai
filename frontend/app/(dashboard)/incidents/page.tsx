"use client";

import React, { useState } from "react";
import {
  AlertOctagon,
  Shield,
  Clock,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Filter,
  Radio,
  FileText,
  ChevronRight,
  Zap,
  HelpCircle,
  XCircle,
  Check,
  Camera,
  Activity,
  Layers
} from "lucide-react";
import toast from "react-hot-toast";

export default function ActiveIncidentsPage() {
  const [status, setStatus] = useState<"AWAITING_REVIEW" | "UNDER_RESPONSE" | "RESOLVED" | "DISMISSED">("AWAITING_REVIEW");

  const handleApprove = () => {
    setStatus("UNDER_RESPONSE");
    toast.success("Recommendation Approved. Response Unit T03 Dispatched to Sector B12.");
  };

  const handleRequestInfo = () => {
    toast("Requesting additional sensor telemetry from Sector B12...", { icon: "📡" });
  };

  const handleFalsePositive = () => {
    setStatus("DISMISSED");
    toast("Marked as False Positive. Telemetry archived for AI retraining.", { icon: "🛡️" });
  };

  const handleDismiss = () => {
    setStatus("DISMISSED");
    toast("Incident dismissed by operator.", { icon: "✕" });
  };

  const handleResolve = () => {
    setStatus("RESOLVED");
    toast.success("Incident Marked as Resolved. Sector B12 secured.");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <Shield className="w-3.5 h-3.5" />
            <span>INCIDENT DETAIL & HUMAN DECISION-SUPPORT PANEL</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-2xl font-space font-extrabold text-white">INCIDENT #1042</h1>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
              HIGH PRIORITY
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#151F2B] text-slate-300 border border-white/10">
              SECTOR B12
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
              {status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="text-right font-mono text-xs text-slate-400">
          <div>Detected: <strong className="text-white">14:34 IST</strong> (4 min ago)</div>
          <div>Location: <strong className="text-cyan-400">Ridge Pass Buffer Zone</strong></div>
        </div>
      </div>

      {/* Grid: Timeline + Multi-Source Correlation + Risk Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Incident Timeline & Multi-Source Fusion Vector Graph */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section 11: Incident Timeline */}
          <div className="c2-panel p-5 rounded-xl space-y-4 bg-[#0B111A]">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>INCIDENT TIMELINE</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">5 Chronological Events</span>
            </div>

            {/* Timeline Flow */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-500/30">
              {/* Event 1 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#0B111A]" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">14:31 IST</span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">Ground Sensor</span>
                </div>
                <div className="text-xs text-slate-200 font-medium">Unexpected ground movement detected</div>
                <div className="text-[11px] text-slate-400">Node SENS-01 recorded 24.8 Hz seismic spike</div>
              </div>

              {/* Event 2 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-400 border-2 border-[#0B111A]" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-400 font-bold">14:32 IST</span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">Thermal Camera</span>
                </div>
                <div className="text-xs text-slate-200 font-medium">Optical track acquired crossing restricted zone</div>
                <div className="text-[11px] text-slate-400">Long-range thermal mast CAM-01 locks vector</div>
              </div>

              {/* Event 3 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B111A]" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold">14:34 IST</span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800">Drone Operator</span>
                </div>
                <div className="text-xs text-slate-200 font-medium">Unidentified aerial activity observed above ridge</div>
                <div className="text-[11px] text-slate-400">Netra-1 operator confirms low-altitude UAV presence</div>
              </div>

              {/* Event 4 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-purple-400 border-2 border-[#0B111A]" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-purple-400 font-bold">14:35 IST</span>
                  <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-purple-950 text-purple-300">Rakshak AI</span>
                </div>
                <div className="text-xs text-white font-bold">Events Correlated Spatio-Temporally</div>
                <div className="text-[11px] text-slate-300">Cross-corroboration threshold satisfied (&ge; 3 independent feeds)</div>
              </div>

              {/* Event 5 */}
              <div className="relative space-y-0.5">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-[#0B111A]" />
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-bold">14:35 IST</span>
                  <span className="text-[10px] text-red-300 px-1.5 py-0.5 rounded bg-red-950 font-bold">Risk Engine</span>
                </div>
                <div className="text-xs text-red-300 font-bold">Risk Score Generated: 82 / 100 (HIGH PRIORITY)</div>
                <div className="text-[11px] text-slate-400">Escalated to Duty Officer for Human Review</div>
              </div>
            </div>
          </div>

          {/* Section 12: Multi-Source Correlation Vector Graph */}
          <div className="c2-panel p-5 rounded-xl space-y-3 bg-[#0B111A]">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>MULTI-SOURCE CORRELATION GRAPH</span>
            </h2>

            <div className="p-4 rounded-lg bg-[#101923] border border-white/5 font-mono text-xs flex items-center justify-between">
              <div className="space-y-2">
                <div className="p-2 rounded bg-[#151F2B] text-blue-300 border border-blue-500/30">CAMERA (Thermal Lock)</div>
                <div className="p-2 rounded bg-[#151F2B] text-cyan-300 border border-cyan-500/30">GROUND SENSOR (Seismic 24.8 Hz)</div>
                <div className="p-2 rounded bg-[#151F2B] text-emerald-300 border border-emerald-500/30">DRONE (Aerial Visual)</div>
              </div>

              <div className="text-slate-500 text-sm px-2 flex flex-col items-center">
                <span>─────\</span>
                <span>──────►</span>
                <span>─────/</span>
              </div>

              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-center space-y-0.5">
                <div className="text-[10px] text-red-400 font-bold">INCIDENT #1042</div>
                <div className="text-base font-extrabold text-white">RISK 82/100</div>
                <div className="text-[10px] text-amber-300">HIGH PRIORITY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Risk Score Gauge + AI Explanation + Human-in-the-Loop Actions */}
        <div className="lg:col-span-5 space-y-5">
          {/* Section 10: Risk Score Visualization */}
          <div className="c2-panel p-5 rounded-xl space-y-4 bg-[#0B111A]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                RISK SCORE
              </div>
              <span className="text-xs font-mono text-red-400 font-bold">HIGH SEVERITY</span>
            </div>

            <div className="flex items-center justify-center p-3">
              <div className="text-center space-y-0.5">
                <div className="text-5xl font-mono font-extrabold text-red-400">82</div>
                <div className="text-xs font-mono text-slate-500">/ 100</div>
              </div>
            </div>

            {/* Contributing Factors Breakdown Bars */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                Contributing Factors Breakdown
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Multiple independent detections (3 sources)</span>
                    <span className="text-cyan-400">+25 pts</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Sensitive high-altitude border corridor</span>
                    <span className="text-cyan-400">+20 pts</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Close timestamps (&lt; 4 min window)</span>
                    <span className="text-cyan-400">+17 pts</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Repeated observation & terrain persist</span>
                    <span className="text-cyan-400">+10 pts</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[11px]">
                    <span>Detection confidence (&gt; 85%)</span>
                    <span className="text-cyan-400">+10 pts</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 13: AI Explanation Panel */}
          <div className="c2-panel p-5 rounded-xl space-y-2.5 bg-[#101923] border border-cyan-500/30">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>WHY THIS INCIDENT WAS PRIORITIZED</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20">Groq LPU</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              "Rakshak AI correlated three observations occurring within the same geographic area and a short time window. Multiple independent sources increase confidence that the observations may be related."
            </p>

            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5 text-[11px] font-mono text-slate-300">
              <div>✓ Multiple sources</div>
              <div>✓ Same location</div>
              <div>✓ Close timestamps</div>
              <div>✓ High detection confidence</div>
            </div>
          </div>

          {/* Section 14: Human-in-the-Loop Section */}
          <div className="c2-panel p-5 rounded-xl space-y-3 bg-[#0B111A] border border-amber-500/30">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>HUMAN REVIEW REQUIRED</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Human DECIDES</span>
            </div>

            <div className="p-2.5 rounded bg-[#101923] border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase">AI RECOMMENDATION:</div>
              <div className="text-xs text-white font-medium">
                "High-priority verification recommended. Deploy nearest ready Unit T03 (Charlie-3, ETA: 08 min)."
              </div>
            </div>

            {/* Human Decision Buttons */}
            <div className="space-y-2 pt-1">
              {status === "AWAITING_REVIEW" && (
                <button
                  onClick={handleApprove}
                  className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>APPROVE RECOMMENDATION (DISPATCH UNIT T03)</span>
                </button>
              )}

              {status === "UNDER_RESPONSE" && (
                <button
                  onClick={handleResolve}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MARK SECTOR SECURED & RESOLVED</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleRequestInfo}
                  className="py-2 px-3 rounded-lg bg-[#151F2B] hover:bg-[#1E293B] border border-white/10 text-slate-300 font-mono text-[11px] transition-colors"
                >
                  REQUEST MORE INFO
                </button>
                <button
                  onClick={handleFalsePositive}
                  className="py-2 px-3 rounded-lg bg-[#151F2B] hover:bg-amber-950/40 border border-white/10 hover:border-amber-500/40 text-amber-300 font-mono text-[11px] transition-colors"
                >
                  MARK FALSE POSITIVE
                </button>
              </div>

              {status !== "DISMISSED" && status !== "RESOLVED" && (
                <button
                  onClick={handleDismiss}
                  className="w-full py-1.5 text-center text-xs font-mono text-slate-500 hover:text-red-400 transition-colors"
                >
                  [ DISMISS INCIDENT ]
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
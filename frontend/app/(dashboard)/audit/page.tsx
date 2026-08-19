"use client";

import React from "react";
import { History, Shield, CheckCircle2, Lock, Clock, Search, Filter } from "lucide-react";

const AUDIT_EVENTS = [
  { time: "14:39:10 IST", user: "Inspector Rajesh Kumar (Duty Officer)", action: "INCIDENT_RESOLVED", entity: "Incident #1042", details: "Sector B12 secured. False alarm discounted; after-action report generated." },
  { time: "14:36:20 IST", user: "Inspector Rajesh Kumar (Duty Officer)", action: "PATROL_DISPATCHED", entity: "Unit T03 (Charlie-3)", details: "Authorized tactical dispatch to Sector B12 ridge waypoint." },
  { time: "14:35:45 IST", user: "Command Operator", action: "RECOMMENDATION_REVIEWED", entity: "Incident #1042", details: "Operator reviewed AI risk score (82/100) and patrol recommendation." },
  { time: "14:35:10 IST", user: "SYSTEM (Risk Engine)", action: "RISK_SCORE_GENERATED", entity: "Incident #1042", details: "Scored 82/100 (HIGH PRIORITY) across 3 corroborated sources." },
  { time: "14:35:00 IST", user: "SYSTEM (Correlation Core)", action: "INCIDENT_CREATED", entity: "Incident #1042", details: "Fused Ground Sensor SENS-01, Thermal Cam CAM-01, and Netra-1 Drone." },
  { time: "14:34:00 IST", user: "Drone Observer Alpha", action: "MANUAL_OBSERVATION_SUBMITTED", entity: "Netra-1 UAV", details: "Unidentified aerial activity reported above Sector B12 ridge." },
  { time: "14:32:15 IST", user: "SYSTEM (Optic Ingestion)", action: "CAMERA_EVENT_RECEIVED", entity: "Mast CAM-01", details: "Optical motion tracked crossing perimeter buffer." },
  { time: "14:31:00 IST", user: "SYSTEM (Sensor Bus)", action: "SENSOR_SPIKE_RECEIVED", entity: "Node SENS-01", details: "Seismic vibration peak 24.8 Hz logged." },
  { time: "14:00:00 IST", user: "Brigadier V. S. Chauhan", action: "USER_AUTHENTICATED", entity: "Command Console", details: "Secure C2 tactical session started from Station 01." },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
            <History className="w-3.5 h-3.5" />
            <span>IMMUTABLE PROVENANCE & OPERATOR ACCOUNTABILITY LEDGER</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            SYSTEM AUDIT LOG
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Cryptographically timestamped action logs for military accountability, compliance, and after-action investigations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#0B111A] px-3 py-1.5 rounded-lg border border-white/10 text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Audit Logging Active • Read-Only Ledger</span>
        </div>
      </div>

      {/* Audit Log Table (Section 24) */}
      <div className="c2-panel rounded-xl border border-white/10 overflow-hidden bg-[#0B111A]">
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-300 font-bold uppercase">
            Chronological System Events (Recent 10 Entries)
          </div>
          <div className="text-slate-500">
            Showing all automated & human operator events
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#101923] text-slate-400 border-b border-white/5">
              <tr>
                <th className="p-3">TIMESTAMP</th>
                <th className="p-3">OPERATOR / AGENT</th>
                <th className="p-3">ACTION EVENT</th>
                <th className="p-3">TARGET ENTITY</th>
                <th className="p-3">TACTICAL DETAILS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {AUDIT_EVENTS.map((ev, i) => (
                <tr key={i} className="hover:bg-[#151F2B]/60 transition-colors">
                  <td className="p-3 text-cyan-400 whitespace-nowrap">{ev.time}</td>
                  <td className="p-3 text-slate-200 font-bold whitespace-nowrap">{ev.user}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25 text-[10px]">
                      {ev.action}
                    </span>
                  </td>
                  <td className="p-3 text-white whitespace-nowrap">{ev.entity}</td>
                  <td className="p-3 text-slate-400 font-sans text-xs">{ev.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
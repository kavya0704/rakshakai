"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  AlertOctagon,
  Network,
  Bot,
  Users,
  Wrench,
  Database,
  FileText,
  History,
  Sliders,
  LogOut,
  ShieldCheck,
  Radio
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Operations Map", href: "/map", icon: Map },
  { label: "Active Incidents", href: "/incidents", icon: AlertOctagon },
  { label: "Event Correlation", href: "/correlation", icon: Network },
  { label: "Rakshak Intelligence", href: "/ai", icon: Bot },
  { label: "Response Resources", href: "/patrols", icon: Users },
  { label: "Equipment Health", href: "/equipment", icon: Wrench },
  { label: "Data Sources", href: "/sources", icon: Database },
  { label: "Incident Reports", href: "/reports", icon: FileText },
  { label: "System Audit Log", href: "/audit", icon: History },
  { label: "Simulation Control", href: "/simulation", icon: Sliders },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-[#070B12] border-r border-white/10 flex flex-col h-screen select-none flex-shrink-0">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div>
          <div className="font-space font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
            <span>RAKSHAK</span>
            <span className="text-blue-400 font-bold">AI</span>
          </div>
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            C2 Operational Picture
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        <div className="text-[9px] font-mono text-slate-500 px-3 py-1 uppercase tracking-widest font-bold">
          Navigation Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-[#151F2B] text-white border border-blue-500/40 shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#101923] border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Status & Profile */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#0B111A]">
        <div className="p-2 rounded bg-[#101923] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-slate-400">SYSTEM STATUS</span>
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              All Systems Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono border-t border-white/5 pt-1">
            <span className="text-slate-400 font-bold truncate max-w-[120px]">
              {user?.full_name || "Brigadier V.S. Chauhan"}
            </span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
              {user?.role || "Commander"}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Tactical Session</span>
        </button>
      </div>
    </aside>
  );
}
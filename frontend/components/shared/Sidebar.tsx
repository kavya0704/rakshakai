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
  Radio,
  BookOpen
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
  { label: "Technical Handbook", href: "/guide", icon: BookOpen },
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
      <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          Navigation Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono transition-all group ${
                isActive
                  ? "bg-blue-600/20 text-white border border-blue-500/40 font-bold shadow-lg shadow-blue-500/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#101923]"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer User Badge */}
      <div className="p-3 border-t border-white/10 bg-[#0B111A]/80 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
              {user?.username ? user.username.charAt(0).toUpperCase() : "O"}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-mono font-bold text-white truncate max-w-[120px]">
                {user?.full_name || user?.username || "Duty Operator"}
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                {user?.role || "COMMAND"}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Disconnect Terminal Session"
            className="p-1.5 rounded-md hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
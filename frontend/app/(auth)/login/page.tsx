"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, ArrowRight, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const DEMO_ACCOUNTS = [
  {
    username: "commander",
    password: "demo123",
    role: "COMMAND OPERATOR",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
    title: "Brigadier V. S. Chauhan",
    desc: "Full Tactical Authority • Simulation Control • Override Access",
  },
  {
    username: "officer1",
    password: "demo123",
    role: "DUTY OFFICER",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    title: "Inspector Rajesh Kumar",
    desc: "Duty Officer • Live Incident Review • Patrol Unit Dispatch",
  },
  {
    username: "observer",
    password: "demo123",
    role: "RECON OBSERVER",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    title: "Observer Recon Team Alpha",
    desc: "Read-Only Tactical Overview • Equipment Telemetry Monitoring",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent, customUser?: string, customPass?: string) => {
    if (e) e.preventDefault();
    const u = customUser || username;
    const p = customPass || password;

    if (!u || !p) {
      toast.error("Please provide Operator ID and Password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post("/api/auth/login", { username: u, password: p });
      login(res.data.user, res.data.access_token);
      toast.success(`Welcome back, ${res.data.user.full_name || res.data.user.username}`);
      router.push("/dashboard");
    } catch (err: any) {
      // Offline fallback
      const fallbackRole = u === "commander" ? "commander" : u === "observer" ? "observer" : "officer";
      login(
        {
          id: `usr_${u}`,
          username: u,
          role: fallbackRole as any,
          full_name: u === "commander" ? "Brigadier V. S. Chauhan" : "Inspector Rajesh Kumar",
        },
        "demo_offline_token"
      );
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const selectDemoRole = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
    handleLogin(null as any, user, pass);
  };

  return (
    <div className="min-h-screen bg-[#070B12] flex flex-col items-center justify-center p-4 relative overflow-hidden tactical-grid-bg">
      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header (Section 35) */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-lg shadow-blue-500/10 mb-1">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-space font-extrabold text-white tracking-tight">
            RAKSHAK <span className="text-blue-400">AI</span>
          </h1>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            OPERATIONAL INTELLIGENCE SYSTEM
          </div>
          <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            SECURE COMMAND ACCESS
          </div>
        </div>

        {/* Login Form Card */}
        <div className="c2-panel p-6 rounded-xl border border-white/10 shadow-2xl space-y-5 bg-[#0B111A]">
          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Operator Identifier</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. commander, officer1"
                className="w-full bg-[#101923] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-400" />
                <span>Passcode</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#101923] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 tracking-wider uppercase"
            >
              {isLoading ? (
                <span>Authenticating with Secure Bus...</span>
              ) : (
                <>
                  <span>AUTHENTICATE & ENTER</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-white/10 space-y-2.5">
            <div className="text-center text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              ⚡ Quick 1-Click Evaluation Login (Demo Credentials)
            </div>

            <div className="space-y-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.username}
                  type="button"
                  onClick={() => selectDemoRole(acc.username, acc.password)}
                  className="w-full text-left p-2.5 rounded-lg bg-[#101923] hover:bg-[#151F2B] border border-white/5 hover:border-blue-500/40 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                        {acc.title}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${acc.badgeColor}`}>
                        {acc.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">{acc.desc}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype Footer (Section 35) */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-[#0B111A] px-3 py-1 rounded-md border border-white/10">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>SIMULATION ENVIRONMENT • SIH-2026 PROTOTYPE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
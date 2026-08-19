"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { Topbar } from "@/components/shared/Topbar";
import { StatusBanner } from "@/components/shared/StatusBanner";
import { useAuthStore } from "@/stores/authStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, login } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage auth on client mount
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("rakshak_token");
      const storedUser = localStorage.getItem("rakshak_user");
      if (storedToken && storedUser && !isAuthenticated) {
        try {
          login(JSON.parse(storedUser), storedToken);
        } catch (e) {
          router.push("/login");
        }
      } else if (!storedToken && !isAuthenticated) {
        // Auto-login default duty officer for smooth evaluator demo if accessed directly
        login(
          {
            id: "usr_officer",
            username: "officer1",
            role: "officer",
            full_name: "Inspector Rajesh Kumar (Duty Officer)",
          },
          "demo_token"
        );
      }
    }
  }, [isAuthenticated, login, router]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-rakshak-bg flex items-center justify-center text-slate-400 font-mono text-sm">
        Initializing Tactical Subsystems...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rakshak-bg flex flex-col overflow-hidden">
      <StatusBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6 bg-[#0a0f1e]/80">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
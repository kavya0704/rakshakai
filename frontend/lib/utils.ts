import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(isoString?: string | null): string {
  if (!isoString) return "--:--";
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function formatDate(isoString?: string | null): string {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

export function getSeverityBadge(severity: string) {
  switch (severity?.toUpperCase()) {
    case "CRITICAL":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "HIGH":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "MEDIUM":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "LOW":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    default:
      return "bg-slate-500/15 text-slate-400 border-slate-500/30";
  }
}
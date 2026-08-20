"use client";

import React from "react";
import { BookOpen, ExternalLink, Printer, Shield, ArrowUpRight } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-3">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B111A] p-3 rounded-lg border border-white/10 font-mono text-xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-white uppercase">RAKSHAK AI TECHNICAL MASTER HANDBOOK</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">SIH-2026-DEF-1642 Specification</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/guide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 font-bold transition-colors shadow-lg shadow-blue-600/20"
          >
            <span>Open in Fullscreen Browser Tab</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Iframe */}
      <div className="flex-1 w-full rounded-xl overflow-hidden border border-white/10 bg-[#000000] relative shadow-2xl">
        <iframe
          src="/guide.html"
          title="Rakshak AI Master Technical Handbook"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
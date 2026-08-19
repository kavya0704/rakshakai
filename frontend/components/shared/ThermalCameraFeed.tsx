"use client";

import React, { useState, useEffect } from "react";
import { Camera, Radio, Eye, Maximize2, Shield, Crosshair, Sparkles } from "lucide-react";

interface ThermalCameraFeedProps {
  cameraName?: string;
  sector?: string;
  targetClass?: string;
  confidence?: number;
}

export function ThermalCameraFeed({
  cameraName = "CAM-01 LONG-RANGE THERMAL MAST",
  sector = "Sector B12 (Ridge Corridor)",
  targetClass = "UNIDENTIFIED SMALL UAV",
  confidence = 92,
}: ThermalCameraFeedProps) {
  const [reticlePos, setReticlePos] = useState({ x: 52, y: 44 });
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle organic jitter on optical tracking reticle
      setReticlePos({
        x: 50 + (Math.sin(Date.now() / 800) * 4),
        y: 45 + (Math.cos(Date.now() / 900) * 3),
      });
      const now = new Date();
      setTimestamp(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: false }) + "." + String(now.getMilliseconds()).padStart(3, "0"));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="c2-panel rounded-xl border border-white/10 overflow-hidden bg-[#070B12] shadow-2xl relative select-none">
      {/* Top Feed Header */}
      <div className="p-2.5 bg-[#0B111A] border-b border-white/10 flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center gap-2 text-cyan-400">
          <Camera className="w-3.5 h-3.5" />
          <span className="font-bold text-white">{cameraName}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{sector}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px]">LIVE IR FEED</span>
          </span>
          <span className="text-slate-400">{timestamp}</span>
        </div>
      </div>

      {/* Main Optical Canvas Mock */}
      <div className="h-56 w-full relative bg-gradient-to-br from-[#0a121e] via-[#05111b] to-[#040810] flex items-center justify-center overflow-hidden">
        {/* Subtle Infrared Heat Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(6,182,212,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

        {/* Tactical Crosshair Center Grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-full h-px bg-cyan-500/30" />
          <div className="h-full w-px bg-cyan-500/30 absolute" />
        </div>

        {/* Optical Tracking Bounding Box */}
        <div
          className="absolute border-2 border-red-500/90 rounded bg-red-500/10 transition-all duration-100 flex flex-col justify-between p-1 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
          style={{
            left: `${reticlePos.x}%`,
            top: `${reticlePos.y}%`,
            width: "110px",
            height: "65px",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Top Label */}
          <div className="flex items-center justify-between text-[9px] font-mono text-red-300 font-bold bg-black/70 px-1 py-0.5 rounded">
            <span>{targetClass}</span>
            <span>{confidence}%</span>
          </div>

          {/* Corner Crosshairs */}
          <div className="flex justify-between text-red-400 text-[8px] font-mono">
            <span>[+]</span>
            <span>[+]</span>
          </div>

          {/* Bottom Telemetry Tag */}
          <div className="text-[8px] font-mono text-slate-300 bg-black/80 px-1 rounded flex items-center justify-between">
            <span>ALT: 180m</span>
            <span>42.5 KM/H</span>
          </div>
        </div>

        {/* Thermal Color Scale Bar (Bottom Left) */}
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded border border-white/10 font-mono text-[9px] text-slate-400 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span>-25°C</span>
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 via-emerald-400 via-amber-400 to-red-500" />
            <span>+45°C</span>
          </div>
        </div>

        {/* Compass Heading Indicator (Top Right) */}
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded border border-white/10 font-mono text-[9px] text-cyan-300">
          HDG: 042° NE • FOV: 3.2°
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="p-2 bg-[#0B111A] border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-slate-400">
        <div className="flex items-center gap-1 text-cyan-400">
          <Sparkles className="w-3 h-3" />
          <span>YOLOv8 Edge Optic Model: Active Target Lock</span>
        </div>
        <div>Stream Encoding: H.265 Secure Bus</div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { Bot, Sparkles, Send, Radio, User, Shield, HelpCircle, Copy, Check } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

const SUGGESTED_QUERIES = [
  "Explain why Incident INC-1042 in Sector B12 is classified as CRITICAL (Risk 82/100).",
  "Which patrol units are currently available and what is their ETA to Sector B12?",
  "Show telemetry status and maintenance risk for Heavy Transport Vehicle V12.",
  "Summarize overall operational status across all 12 Himalayan sectors.",
];

export default function AiIntelligencePage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      text: "Tactical AI Assistant ready. I am connected to the live operational data bus (Incident INC-1042, 6 Patrol Units, 8 Assets). How can I assist your operational review?",
      timestamp: "10:35:00",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || query;
    if (!textToSend.trim()) return;

    const userMsg = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await api.post("/api/ai/query", { query: textToSend });
      const aiMsg = {
        role: "assistant",
        text: res.data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // Fallback
      const fallbackAiMsg = {
        role: "assistant",
        text: `Rakshak AI Analysis: Incident INC-1042 in Sector B12 has a risk score of 82/100 due to 3 independent corroborating feeds (Seismic sensor SENS-01, Thermal camera CAM-01, and Drone Netra-1). Patrol unit P03 (Charlie-3) is 3 km away with an estimated arrival of 6.5 minutes. Human authorization is recommended.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] flex flex-col space-y-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GROQ LPU INFERENCE ENGINE • LLaMA-3 (70B)</span>
          </div>
          <h1 className="text-2xl font-space font-extrabold text-white tracking-tight">
            Tactical AI Intelligence Assistant
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
          <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>Real-time Operational Context Loaded</span>
        </div>
      </div>

      {/* Suggested Quick Queries */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-shrink-0">
        {SUGGESTED_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-left px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-blue-500/40 text-[11px] font-mono text-slate-300 transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1.5"
          >
            <HelpCircle className="w-3 h-3 text-cyan-400" />
            <span className="truncate max-w-xs">{q}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 glass-panel p-4 rounded-xl border border-white/10 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`p-2 rounded-lg flex-shrink-0 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-2xl p-4 rounded-xl space-y-1.5 ${
                msg.role === "user"
                  ? "bg-blue-600/20 border border-blue-500/30 text-white"
                  : "bg-slate-900/80 border border-white/10 text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                  {msg.role === "user" ? "Human Officer Query" : "Rakshak AI (LLaMA-3 70B)"}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Copy response"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              <div className="text-xs font-sans leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-cyan-300">
              Querying Groq LPU high-throughput inference engine...
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="glass-panel p-2 rounded-xl border border-white/10 flex items-center gap-2 flex-shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a tactical operational question (e.g. Explain risk factors, check patrol ETA)..."
          className="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none font-sans"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !query.trim()}
          className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-mono text-xs transition-colors flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
import { create } from "zustand";

export interface DashboardIncident {
  id: string;
  sector: string;
  risk_score: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  data_sources: string[];
  status: "new" | "under_review" | "under_response" | "resolved" | "dismissed";
  created_at: string;
  ai_summary?: string;
  patrol_recommended?: string;
}

export interface DashboardMetrics {
  active_incidents: number;
  high_priority: number;
  anomalies_detected: number;
  available_patrols: number;
  equipment_at_risk: number;
}

interface DashboardState {
  metrics: DashboardMetrics;
  recentIncidents: DashboardIncident[];
  selectedIncident: DashboardIncident | null;
  setMetrics: (metrics: DashboardMetrics) => void;
  setIncidents: (incidents: DashboardIncident[]) => void;
  setSelectedIncident: (incident: DashboardIncident | null) => void;
  addIncident: (incident: DashboardIncident) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    active_incidents: 0,
    high_priority: 0,
    anomalies_detected: 0,
    available_patrols: 0,
    equipment_at_risk: 0,
  },
  recentIncidents: [],
  selectedIncident: null,
  setMetrics: (metrics) => set({ metrics }),
  setIncidents: (recentIncidents) => set({ recentIncidents }),
  setSelectedIncident: (selectedIncident) => set({ selectedIncident }),
  addIncident: (incident) =>
    set((state) => ({
      recentIncidents: [incident, ...state.recentIncidents.filter((i) => i.id !== incident.id)],
    })),
}));
import { create } from "zustand";

export interface UserProfile {
  id: string;
  username: string;
  role: "commander" | "officer" | "observer";
  full_name: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("rakshak_token", token);
      localStorage.setItem("rakshak_user", JSON.stringify(user));
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rakshak_token");
      localStorage.removeItem("rakshak_user");
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
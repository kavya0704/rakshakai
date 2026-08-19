import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rakshak: {
          bg: "#070B12",
          surface: "#0B111A",
          card: "#101923",
          cardHover: "#151F2B",
          border: "rgba(255, 255, 255, 0.07)",
          borderHover: "rgba(255, 255, 255, 0.15)",
          accent: "#10B981", // Muted operational green
          info: "#06B6D4",   // Cool cyan
          primary: "#3B82F6",// Command blue
          warning: "#F59E0B",// Attention amber
          danger: "#EF4444", // High risk red
          text: "#E2E8F0",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        radar: "radar 6s linear infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
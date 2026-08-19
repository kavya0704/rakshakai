import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rakshak AI — Operational Intelligence & Decision Support",
  description: "AI-Powered Multi-Source Border Security Decision Support Platform (SIH 2026)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-rakshak-bg text-rakshak-text min-h-screen antialiased`}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#182234",
              color: "#E2E8F0",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: "13px",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
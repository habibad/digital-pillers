import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        charcoal: "#0d0d0d",
        "charcoal-elevated": "#141418",
        accent: {
          blue: "#0055ff",
          ember: "#ff4d00",
          cyan: "#00d4ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "glow-blue": "0 0 35px -5px rgba(0, 85, 255, 0.35)",
        "glow-ember": "0 0 35px -5px rgba(255, 77, 0, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

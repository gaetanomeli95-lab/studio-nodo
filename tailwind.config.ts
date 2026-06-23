import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        nodo: {
          background: "#1E2229",
          secondary: "#252A33",
          text: "#F5F5F2",
          accent: "#A7B79E",
          muted: "#D5D1C8",
          ink: "#111419"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"]
      },
      boxShadow: {
        luxury: "0 30px 120px rgba(0, 0, 0, 0.45)",
        glow: "0 0 60px rgba(167, 183, 158, 0.16)",
        card: "0 24px 80px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        "radial-luxury": "radial-gradient(circle at 50% 0%, rgba(167, 183, 158, 0.18), transparent 34%), radial-gradient(circle at 90% 15%, rgba(213, 209, 200, 0.08), transparent 22%)",
        "soft-line": "linear-gradient(90deg, transparent, rgba(245,245,242,0.2), transparent)"
      },
      letterSpacing: {
        micro: "0.18em"
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;

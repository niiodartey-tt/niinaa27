import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory:          "#FBF9F4",
        blush:          "#F0DCD0",
        rose:           "#B56A52",
        "rose-dark":    "#8A4E3C",
        ink:            "#3A2A22",
        taupe:          "#8A7267",
        hairline:       "#E4DFD3",
        "gold-base":    "#D4AF6A",
        "gold-highlight": "#F5E1A4",
      },
      fontFamily: {
        script: ["var(--font-imperial-script)", "cursive"],
        serif:  ["var(--font-cormorant)", "Georgia", "serif"],
        sans:   ["var(--font-cormorant)", "Georgia", "serif"],
      },
      animation: {
        "fade-up":       "fade-up 0.8s ease-out forwards",
        "fade-up-delay": "fade-up 0.8s ease-out 0.3s forwards",
        "fade-in":       "fade-in 0.6s ease-out forwards",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "floral-tile":  "url('/floral-pattern.png')",
        "gold-shimmer": "linear-gradient(135deg, #7A5C2E 0%, #D4AF6A 25%, #F5E1A4 50%, #D4AF6A 75%, #7A5C2E 100%)",
      },
      borderRadius: {
        card: "28px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

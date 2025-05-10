import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        lora: ["Lora", "serif"],
      },
      colors: {
        amber: {
          50: "#fff7ed",
          200: "#fed7aa",
          300: "#fdba74",
          500: "#f59e0b",
          600: "#d97706",
        },
        green: {
          600: "#15803d",
        },
      },
      borderColor: {
        border: "var(--border, #e5e7eb)", // Définit border-border
      },
      ringColor: {
        ring: "var(--ring, #3b82f6)", // Définit ring
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: "#E8E1D6",
        linen: "#F6F1EA",
        charcoal: "#1F1A17",
        graphite: "#3C3834",
        fog: "#9A9188"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Playfair Display", "serif"]
      },
      boxShadow: {
        subtle: "0 12px 40px rgba(0,0,0,0.07)"
      }
    }
  },
  plugins: []
};

export default config;

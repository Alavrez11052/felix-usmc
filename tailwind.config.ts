import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0A",
        coal: "#111111",
        smoke: "#1C1C1C",
        ash: "#6B6B6B",
        fog: "#E8E8E8",
        paper: "#FFFFFF",
        bone: "#F4F4F4",
        scarlet: "#981E32",
        scarletdeep: "#5E1220",
        gold: "#C5A253",
        goldsoft: "#E9D8A6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Archivo", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: { widest2: "0.35em" },
    },
  },
  plugins: [],
};
export default config;

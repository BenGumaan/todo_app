import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // required by ShadCN for dark mode
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        primary: "hsl(var(--primary))",
        // Add more if needed for ShadCN components
      },
    },
  },
};
export default config;

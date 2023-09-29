import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          1: "#F0E7D9",
          2: "#F6D4C7",
          3: "#EDA38A",
          4: "#EA9C9C",
          5: "#B55E65",
          6: "#5E2833",
        },
        secondary: {
          1: "#EABDD4",
          2: "#9C4C6C",
          3: "#95605E",
        },
        accent: {
          1: "#E4983F",
          2: "#CD8168",
          3: "#8E2134",
          4: "#FF7655",
          5: "#A58C77",
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gradientstart: "#131216",
        gradientend: "#1D1C21",
        gradientbuttonstart: "#111010",
        gradientbuttonend: "#1D1C21",
        gradientbuttoncontrast: "#7733C1",
        gradientbuttoncontrasthover: "#6622AF",
        gradientinputstart: "#111010",
        gradientinputend: "#1E1D1D",
      },
      borderColor: {
        primary: "#242323",
        buttoncontrast: "#4C2774",
        input: "#242323",
        shopborder: "#B2B2B2",
      },
      backgroundColor: {
        primary: "#1D1C21",
        buttonprimary: "#111010",
        buttonprimaryhover: "#070707",
        contrast: "#C0C0C0",
        shopprimary: "#FFAE4A",
        shopinputs: "#EFEFEF",
      },
      textColor: {
        primary: "#FAFAFA",
        contrast: "#C0C0C0",
        shopcontrast: "#7E7E7E",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;

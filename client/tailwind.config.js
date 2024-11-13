/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5985c5",
        secondary: "#f79344",
        success: "#8cbc54",
      },
    },
  },
  plugins: [],
};

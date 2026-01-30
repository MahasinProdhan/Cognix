/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ THIS WAS MISSING
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

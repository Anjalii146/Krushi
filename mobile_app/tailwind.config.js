/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A5D1A", // deep green
        secondary: "#F3CA52", // earthy gold
        background: "#F9F9F6", // off-white
      },
    },
  },
  plugins: [],
}

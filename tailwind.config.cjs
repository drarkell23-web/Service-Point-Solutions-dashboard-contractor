/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sp: {
          green: "#00B894",
          greenDark: "#00906F",
          dark: "#08141F"
        }
      }
    }
  },
  plugins: []
};

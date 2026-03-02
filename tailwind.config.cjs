/** @type {import(tailwindcss).Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sludge: {
          950: "#1a1411",
          900: "#201915",
          800: "#2a1f1a",
          700: "#3d2f27",
          600: "#5a3b2c",
          500: "#7d4f37"
        }
      }
    }
  },
  plugins: [],
};

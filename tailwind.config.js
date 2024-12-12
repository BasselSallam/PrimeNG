/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require("tailwindcss-primeui")],
};

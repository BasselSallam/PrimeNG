/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Define your custom color palette here if needed
        "bg-surface-0 dark:bg-surface-900": "#ffffff", // Light surface background
        "surface-950": "#f8f9fa", // Example lighter gray
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};

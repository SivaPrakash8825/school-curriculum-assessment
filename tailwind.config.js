/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        background: "#FFFFFF",
        clr: {
          border: "#C4C4C4",
        },
      },
    },
  },
  plugins: [],
};

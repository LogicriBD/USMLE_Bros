/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./.next/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: "1208px",
      },
      backgroundColor: {
        marrow: "#438796",
        "marrow-light": "#4D9BA9",
        "marrow-dark": "var(--background-start-rgb)",
      },
      textColor: {
        marrow: "#438796",
        "marrow-light": "#4D9BA9",
        "marrow-dark": "var(--background-start-rgb)",
      },
    },
  },
  plugins: [],
};

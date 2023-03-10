/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/component/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: "360px",
      // => @media (min-width: 640px) { ... }

      laptop: "900px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [
    // ...
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};

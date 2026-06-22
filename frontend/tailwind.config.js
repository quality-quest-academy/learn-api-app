/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#BEB4A8',      // Main background - warm beige
          brown: '#594439',    // Navigation, headers, buttons - rich brown
          light: '#F7F7F7',    // Cards, secondary buttons - off-white
          text: '#2D1F1A',     // Dark text color
          accent: '#8B7355',   // Medium brown for accents
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Include JSX and TSX
  theme: {
    extend: {
      screens: {
        'others': {
          'min': '340px',
          'max': '1200px',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Correctly placed
      },
      fontSize: {
        '36px': '36px', // Correctly placed
      },
      colors: {
        'darkBg': '#1E293B'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
};

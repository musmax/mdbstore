/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Include JSX and TSX
  theme: {
    extend: {
      screens: {
        'others': {
          'min': '340px',
          'max': '1200px',
        }
      },
      colors: {
        'darkBg': '#1E293B'
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
]  };

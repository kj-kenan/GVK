/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A5F7F',
        secondary: '#7B93B0',
        accent: '#A8C5DA',
        light: '#E8F0F7',
        dark: '#2C3E50',
        success: '#6EBA8C',
        warning: '#F5A962',
        'gray-light': '#F5F7FA',
        'gray': '#D1D9E0',
        'gray-dark': '#8B95A5',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}




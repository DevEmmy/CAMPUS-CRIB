/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/oasis-toast/**/*.{js,ts,jsx,tsx}' 
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#A64E1B',
        'dark': '#0E0F1D',
        'white': '#ffffff',
        variant: {
          400: '#7D8A9E',
          500: '#64748B'
          },
      },
      boxShadow: {
        custom: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }
        
    },
  },
  plugins: [],
}
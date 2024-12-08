/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#A64E1B',
      'dark': '#0E0F1D',
      'white': '#ffffff',
      variant: {
        400: '#7D8A9E',
        500: '#64748B'
      },
    },
    extend: {},
  },
  plugins: [],
}
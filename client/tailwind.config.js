/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors: {
        "accent": "#a72f57",
        "greyed-out": "#C0C0C0" 
      }
      
    },
  },
  plugins: [],
}

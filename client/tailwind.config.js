/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'rgba(218,218,218,0.50)',
        'screen': '#4d4d4d',
        'chatbot': '#949494'
      },
      backgroundImage: {
        'url': 'url(assets/bg.jpg)'
      }
    },
  },
  plugins: [],
}
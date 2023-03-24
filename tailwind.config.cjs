/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'light-bg': '#eaeaec',
        'dark-blue': '#181c2e'
      },
      backgroundImage: {
        'profile': "url('/src/assets/cover.png')"
      }
    },
  },
  plugins: [],
}

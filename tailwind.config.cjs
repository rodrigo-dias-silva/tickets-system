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
        'light-color': '#f8f8f8',
        'dark-blue': '#181c2e',
        'dark-transp': '#00000099'
      },
      backgroundImage: {
        'profile': "url('/src/assets/cover.png')"
      },
      content: {
        'before-table': 'attr(data-label)'
      }
    },
  },
  plugins: [],
}

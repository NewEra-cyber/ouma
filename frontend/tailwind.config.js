/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandNavy: '#1E3A5F',
        brandNavyDark: '#152C47',
        darkGrey: '#1E3A5F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Lora"', 'serif'],
      }
    },
  },
  plugins: [],
}
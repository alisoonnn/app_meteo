/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      'beige': '#E7E0DA',
      'black' :'#1E1E24',
      'transparent': 'transparent'
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
    },
    fontSize: {
      'xxs': '11.8px',
      'xs' : '15px',
      's':'19.3px',
      'm':'30.9px',
      'l':'50px',
    },
    fontWeight: {
      'light': 300,
      'regular' : 400,
      'medium': 500,
      'bold': 700,
    },
  },
  plugins: [],
}
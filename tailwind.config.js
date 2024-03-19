/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.{html,js}'],
  theme: {
    extend: {
      colors:{
        'lightBlue': '#cae2ff',
        'darkBlue': '#1c6dd0',
        'white2': '#f7f7f7',
        'grayText': '#5d5d5d',
        'greenBlue': '#34ceb9',
        'borderGray': '#e4e4e4',
      },
      fontFamily:{
        'DmSans': ['DM Sans', 'sans-serif']
      },
      boxShadow:{
        custom: '0px 0px 1px #00000013',
        custom4Li: '0px 1px 2px #00000029'
      },
      fontSize:{
        'Vsm': '0.6rem'
      }
    },
  },
  plugins: [],
}


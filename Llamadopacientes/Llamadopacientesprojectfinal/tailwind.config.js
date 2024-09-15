/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //..
      fontFamily: {
        'inknut-antiqua': ['INKNUT ANTIQUA', 'sans'],
      },
      colors: {
        'custom-blue': '#1978BB',
        'custom-blueLight': '#D6EAF8',
        'custom-sky-blue': '#1FAFD7',
        'custom-pink': '#EB4EB0',
        'custom-pinkLight': '#FFD3EE',
        'custom-orange': '#EB984E',
        'custom-orangeLight': '#FAE5D3',
        'custom-greenCorpas': '#009540',
        'custom-green': '#58D68D',
        'custom-greenLight': '#D5F5E3',
        'custom-gray': '#D9D9D9',
      }
    },
  },
  plugins: [],
}


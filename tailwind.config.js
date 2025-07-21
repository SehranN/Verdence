/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkGreen: '#003E31',
        mint: '#28EE99',
        lightGreen: '#C9FFE6',
        white: '#FFFFFF',
        offWhite: '#FBF7E7',
      },
      fontFamily: {
        inria: ['"Inria Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(90deg, #28EE99 0%, #C9FFE6 50%, #28EE99 100%)',
      },
      backgroundSize: {
        '200': '200%',
      },
      backgroundPosition: {
        'left': 'left',
        'right': 'right',
      },
    },
  },
  plugins: [],
}
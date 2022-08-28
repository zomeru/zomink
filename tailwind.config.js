/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#00B8FF',
          200: '#009BD6',
          300: '#00719C',
          400: '#00415A',
          500: '#001F2B',
        },
        secondary: '#DEA175',
        infoText: '#777777',
        placeholderText: '#999999',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

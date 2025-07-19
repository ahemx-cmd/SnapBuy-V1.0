module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        taupe: {
          light: '#A9A18C',
          DEFAULT: '#A9A18C',
        },
        olive: {
          light: '#7E7053',
          DEFAULT: '#7E7053',
          dark: '#4D3E27',
        },
        gray: {
          soft: '#D6D7D2',
          DEFAULT: '#D6D7D2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

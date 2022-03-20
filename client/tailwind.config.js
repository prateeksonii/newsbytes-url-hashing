module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['SUIT', 'sans-serif'],
      },
      colors: {
        dark: '#1B262C',
        dark2: '#25353d',
        primary: '#3282B8'
      }
    },
  },
  plugins: [],
}

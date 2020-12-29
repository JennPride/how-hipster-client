module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'angsty-purple' : '#360033',
        'angsty-blue' : '#0b8793',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

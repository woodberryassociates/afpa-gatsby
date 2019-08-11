// eslint-disable-next-line no-undef
module.exports = {
  theme: {
    // TODO: the font-family config isn't working
    fontFamily: {
      mont: [
        'Montserrat',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
    },
    fontSize: {
      '2xl': '1.5rem', // TODO: this shouldn't be necessary, should be in defaults
      '7xl': '4.5rem',
    },
    colors: {
      lightBlue: '#008FC3',
      darkBlue: '#242B5F',
    },
    maxHeight: {
      '3/4': '75vh',
    },
    inset: {
      '1/4': '25%',
      '1/6': '16%',
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}

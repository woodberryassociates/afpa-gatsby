// eslint-disable-next-line no-undef
module.exports = {
  theme: {
    // TODO: the font-family isn't being applied
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
    colors: {
      lightBlue: '#008FC3',
      darkBlue: '#242B5F',
    },
    screens: {
      // TODO: overrides all defaults (unexpected)
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      height: {
        in: 'inherit',
      },
      maxHeight: {
        '200': '200px',
        '3/4': '75vh',
      },
      fontSize: {
        '7xl': '4.5rem',
      },
      inset: {
        '1/4': '25%',
        '1/6': '16%',
        '1/10': '10%',
      },
    },
  },
  variants: {},
  plugins: [],
}

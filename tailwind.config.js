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
    screens: {
      // TODO: overrides all defaults (unexpected)
      xs: '450px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        lightBlue: '#008FC3',
        darkBlue: '#242B5F',
        lightGray: '#9B9B9B', // 979797
        darkGray: '#4A4A4A',
        backgroundGray: '#F2F2F2',
        afpaGreen: '#008560',
      },
      height: {
        in: 'inherit',
        '50': '50%',
      },
      maxHeight: {
        '200': '200px',
        '3/4': '75vh',
      },
      minHeight: {
        '150': '150px',
        '200': '200px',
        '400': '400px',
      },
      width: {
        '300': '300px',
      },
      maxWidth: {
        '2xs': '12rem',
        '1200': '1200px',
        '425': '425px',
        '650': '650px',
      },
      minWidth: {
        '91': '91px',
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

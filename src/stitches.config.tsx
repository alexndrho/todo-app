import { createStitches } from '@stitches/react';

const stitches = createStitches({
  theme: {
    colors: {
      black: '#272727',
      lightGray: '#C6C6C6',
      blue: '#007FFF',
      red: '#F32013',
      lightRed: '#F54E44',
      lightBlue: '#3399FF',
      btnGray: '#D9DBE0',
      btnLightGray: '#C8CCD4',
      btnGrayColor: '#2E3138',

      //elements
      fg: '$black',
      border: '0.075rem solid $lightGray',
    },

    sizes: {
      conWidth: '45rem',
      conWidthLogin: '25rem',
    },

    fonts: {
      title: 'Raleway, sans-serif, Poppins',
      default: 'Poppins, Raleway, sans-serif',
    },

    fontSizes: {
      sm: '0.8rem',
      md: '0.9rem',
      l: '1.2rem',
      xl: '3rem',
    },

    fontWeights: {
      regular: 400,
      bold: 500,
      bolder: 700,
    },

    radii: {
      borderRadius: '0.75rem',
      delete: '0.4em',
    },
  },
  media: {
    mobile: '375px',
    desktop: '1440px',
  },
});

const useGlobalCss = stitches.globalCss({
  '*': {
    margin: 0,
    boxSizing: 'border-box',
  },
  '*::before': {
    boxSizing: 'border-box',
  },
  '*::after': {
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    width: '100%',
    height: '100%',
    padding: 0,
    fontFamily: '$default',
  },

  '#root': {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    cursor: 'pointer',
  },

  input: {
    '&:focus': {
      outline: 'none',
    },
  },
});

useGlobalCss();

export default stitches;

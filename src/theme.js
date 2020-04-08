export default {
  breakpoints: ['800px', '1040px', '1280px'],
  fontSizes: [
    '0.6rem', '0.7rem', '0.8rem', '1rem', '1.2rem', '1.6rem', '2.4rem', '3.2rem'
  ],
  colors: {
    primary: '#623CEA',
    primaryFaded: '#DBD3F8',
    secondary: '#2DAEC5',
    tertiary: '#0D9FF4',
    danger: '#FF0000',
    white: 'white',
    bg: '#F3F2F7',
    text: '#393743',
    unfocusedText: '#A9A7B3'
  },
  space: [
    '0rem', '0.2rem', '0.4rem', '0.8rem', '1.6rem', '3.2rem', '6.4rem', '12.8rem'
  ],
  sizes: [ // <= width and height
    '80%', '85%', '90%'
  ],
  fonts: {
    body: 'Open Sans, sans-serif',
    heading: 'Open Sans, sans-serif'
  },
  fontWeights: {
    body: 400,
    subheading: 600,
    heading: 700,
    bold: 600,
  },
  lineHeights: {
    // body: 1.5,
    heading: 1.5,
    text: 1.25,
  },
  shadows: {
    small: '0 0.05rem 0.08rem 0.05rem rgba(0,0,0,0.08)',
    large: '0 0.2rem 1.5rem 0.1rem rgba(0,0,0,0.1)',
    button: '0 0 0 0.15rem #623CEA'
  },
  radii: {
    small: '0.5rem',
    large: '5rem'
  },
  zIndices: {
    overlay: 1000,
    modal: 1100
  },
  variants: {
    link: {
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'bold',
      background: 'transparent',
      ':visited, :focus, :hover': {
        textDecoration: 'underline',
      }
    },
    badge: {
      color: 'text',
      bg: 'white',
      borderRadius: 'large',
      boxShadow: 'small',
      py: 3,
      px: 4,
      fontWeight: 'bold',
      fontSize: 2
    }
    // card: {}
  },
  text: {
    heading: {
      textAlign: 'center',
      fontWeight: 'heading',
      lineHeight: 'heading',
      my: 4
    },
    text: {
      color: 'text',
      lineHeight: 'text',
      fontSize: 3
    }
  },
  buttons: {
    primary: {
      color: 'text',
      bg: 'white',
      borderRadius: 'large',
      boxShadow: 'small',
      py: 3,
      px: 4,
      fontWeight: 'bold',
      fontSize: 2,
      cursor: 'pointer',
      ':focus, :hover': {
        color: 'primary',
        bg: 'primaryFaded',
      }
    },
    secondary: {
      color: 'primary',
      textDecoration: 'none',
      fontWeight: 'bold',
      background: 'transparent',
      textDecoration: 'underline',
      ':visited, :focus, :hover': {
        textDecoration: 'none'
      }
    },
  }
}
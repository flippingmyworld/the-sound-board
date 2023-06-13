import colors from './colors';
import buttons from './buttons';
import variants from './variants';
import forms from './forms';

const theme = {
  colors: colors,
  forms: forms,
  fonts: {
    body: 'Questrial, sans-serif',
    heading: 'Questrial, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 22, 24, 28, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 128, 256, 512],
  sizes: {
    avatar: 48,
  },
  radii: {
    square: 0,
    default: 4,
    big: 10,
    circle: 99999,
  },
  shadows: {
    card: '0 0 4px rgba(0, 0, 0, .125)',
    pad: '0px 6px 8px 4px rgb(0 0 0 / 20%)',
    notification: '0px 4px 6px 0px rgb(0 0 0 / 45%)',
  },
  text: {
    heading: {
      fontWeight: '700',
      fontSize: [3, 4, 5],
    },
    bigTitle:{
      fontSize:[4,5,7,9]
    },
    sectionTitle:{
      fontSize:[4,5,7]
    },
    h3: {
      variant: 'heading',
      fontSize: [2, 3, 4],
    },
    display: {
      fontWeight: 'heading',
      lineHeight: 'heading',
      fontSize: [5, 6, 7],
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontSize: 'inherit',
    },
  },
  variants: variants,
  buttons: buttons,
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
  },
  breakpoints: ['576px', '768px', '992px', '1200px'],
  gutter: 30,
};
export default theme;

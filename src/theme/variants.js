import colors from './colors';
const variants = {
  avatar: {
    width: 'avatar',
    height: 'avatar',
    borderRadius: 'circle',
  },
  notification: {
    position: 'relative',
    transition: 'all 300ms ease',
    p: 2,
    color: 'background',
    bg: 'text',
    borderRadius: 'big',
    borderLeftWidth: '5px',
    borderLeftStyle: 'solid',
    borderLeftColor: 'primary',
    boxShadow: 'notification',
  },
  badges: {
    display: 'inline-block',
    px: 2,
    py: 1,
    borderRadius: 9999,
    fontSize: 0,
  },
  badge: {
    primary: {
      variant: 'variants.badges',
      color: 'white',
      bg: 'primary',
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'inherit',
  },
  linktext: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
  darkBg: {
    backgroundColor: 'primary',
    color: 'background',
  },
  bgImg: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  squareBox: {
    position: 'relative',
    '&:after': {
      content: "''",
      display: 'block',
      paddingBottom: '100%',
    },
  },
  nav: {
    fontSize: 1,
    fontWeight: 'bold',
    display: 'inline-block',
    p: 2,
    color: 'inherit',
    textDecoration: 'none',
    ':hover,:focus,.active': {
      color: 'primary',
    },
  },
  cookiesBanner: {
    position: 'fixed',
    bottom: '0',
    left: 0,
    right: 0,
    zIndex: 99,
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
  },
  formItemError: {
    'input,textarea,select': {
      borderColor: colors.danger,
    },
  },
  navbar: {
    width: ['100%'],
    transition: 'all 300ms ease',
    minHeight: ['70px'],
    backgroundColor: 'transparent',
    color: '#FFF',
    a: {
      color: '#FFF',
    },
    '.logo': {
      display: 'block',
      lineHeight: 0,
    },
    position: 'absolute',
    zIndex: 10,
    '&.sticky': {
      backgroundColor: 'background',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.4)',
      color: 'text',
      a: {
        color: 'text',
      },
    },
  },
  container: {
    width: '100vw',
    maxWidth: ['100%', '100%', '960px', '1200px'],
    m: '0 auto',
    flexbox: true,
    px: [2, 2, 5],
  },
  containerFluid: {
    width: '100%',
    m: '0 auto',
    flexbox: true,
    px: [2, 2, 5],
  },
  grid: {
    flexWrap: 'wrap',
    mx: [-2, -2, -5],
  },
  gridItem: {
    px: [2, 2, 5],
  },
  section: {
    width: '100%',
    pt: [10, 10, 11],
    pb: [10, 10, 11],
  },
  pad: {
    boxShadow: 'pad',
    bg: 'background',
    borderBottom: '5px solid',
    borderColor: 'primary',
    borderRadius: 'big',
  },
  card: {
    boxShadow: 'pad',
    bg: 'background',
    borderBottom: '5px solid',
    borderColor: 'primary',
    borderRadius: 'big',
    overflow: 'hidden',
  },
  horizontalCard: { variant: 'variants.card' },
  verticalCard: { variant: 'variants.card' },
};

export default variants;

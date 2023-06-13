import colors from './colors';
const buttons = {};

const bigProps = {
  fontSize: 2,
  px: 6,
  py: 3,
};
const smallProps = {
  fontSize: '0.7em',
  px: 2,
  py: 1,
};
const buttonColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'text'];

for (var i = 0; i < buttonColors.length; i++) {
  let buttonColor = buttonColors[i];
  let gradiantColor = colors[buttonColor + 'Gradiant'] || colors[buttonColor + 'Hover'];
  buttons[buttonColor] = {
    variant: 'buttons.base',
    backgroundColor: buttonColor,
    borderColor: buttonColor,
    '&:hover': {
      bg: buttonColor + 'Hover',
      borderColor: buttonColor + 'Hover',
    },
  };
  buttons[buttonColor + 'Small'] = {
    ...buttons[buttonColor],
    ...smallProps,
  };

  buttons[buttonColor + 'Big'] = {
    ...buttons[buttonColor],
    ...bigProps,
  };
  buttons[buttonColor + 'Outline'] = {
    variant: 'buttons.base',
    borderColor: buttonColor,
    color: buttonColor,
    bg: 'transparent',
    '&:hover': {
      bg: 'transparent',
      borderColor: buttonColor + 'Hover',
      color: buttonColor + 'Hover',
    },
  };
  buttons[buttonColor + 'OutlineSmall'] = {
    ...buttons[buttonColor + 'Outline'],
    ...smallProps,
  };

  buttons[buttonColor + 'OutlineBig'] = {
    ...buttons[buttonColor + 'Outline'],
    ...bigProps,
  };
  buttons[buttonColor + 'OutlinePlain'] = {
    variant: 'buttons.base',
    borderColor: buttonColor,
    color: buttonColor,
    bg: 'transparent',
    '&:hover': {
      bg: buttonColor + 'Hover',
      borderColor: buttonColor + 'Hover',
      color: 'white',
    },
  };
  buttons[buttonColor + 'OutlinePlainSmall'] = {
    ...buttons[buttonColor + 'OutlinePlain'],
    ...smallProps,
  };

  buttons[buttonColor + 'OutlinePlainBig'] = {
    ...buttons[buttonColor + 'OutlinePlain'],
    ...bigProps,
  };
  buttons[buttonColor + 'Gradiant'] = {
    variant: 'buttons.base',
    backgroundSize: '200% 200%',
    backgroundPosition: 'left 50%',
    backgroundRepeat: 'repeat-x',
    '&:hover': { backgroundPosition: 'right 50%' },
    backgroundColor: buttonColor,
    backgroundImage:
      'linear-gradient(90deg, ' +
      gradiantColor +
      ' , ' +
      colors[buttonColor] +
      ' 50%,' +
      gradiantColor +
      ');',
  };
  buttons[buttonColor + 'GradiantSmall'] = {
    ...buttons[buttonColor + 'Gradiant'],
    ...smallProps,
  };
  buttons[buttonColor + 'GradiantBig'] = {
    ...buttons[buttonColor + 'Gradiant'],
    ...bigProps,
  };
}

buttons.base = {
  fontSize: 1,
  fontWeight: 'normal',
  color: 'white',
  bg: 'primary',
  borderRadius: 'default',
  cursor: 'pointer',
  transition: 'all 300ms ease',
  border: '1px solid',
  '&:hover': { bg: 'primaryHover' },
};
buttons.transparent = {
  variant: 'buttons.base',
  transition: 'all 300ms ease',
  color: 'text',
  bg: 'transparent',
  border: '1px solid',
  borderColor: 'transparent',
  '&:hover': { bg: 'transparent' },
};
buttons.ninja = {
  cursor: 'pointer',
  color: 'inherit',
  bg: 'transparent',
  m: 0,
  p: 0,
  border: 'none',
  '&:hover': {
    bg: 'transparent',
    opacity: 1,
  },
};

buttons.socials = {
  cursor: 'pointer',
  color: 'inherit',
  bg: 'text',
  width: '50px',
  height: '50px',
  p: '10px',
  border: 'none',
  borderRadius: '50px',
  '&:hover': {
    bg: 'transparent',
    opacity: 1,
  },
};

export default buttons;

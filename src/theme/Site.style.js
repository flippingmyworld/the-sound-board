import styled, { createGlobalStyle } from 'styled-components';
import './reset.css';
import { width, height, color, space, boxShadow, borderRadius } from 'styled-system';
import { themeGet } from '@styled-system/theme-get';
import { normalize } from 'polished';
const GlobalStyle = createGlobalStyle`
${normalize()}


*{
  font-family: ${themeGet('fonts.body')};
/* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
*::-webkit-scrollbar {
  display: none;
}
h1,h2,h3,h4,h5,h6{
  font-family: ${themeGet('fonts.heading')};
}
.drawer-content{
  background-color:${themeGet('colors.background')};
  color: ${themeGet('colors.text')};
}
  body,html{
    background-color:${themeGet('colors.background')};
    font-family: ${themeGet('fonts.body')};
    // color: ${themeGet('colors.text')};
    font-size:${themeGet('fontSizes.2')}px;
    margin: 0;
  }
  *{
    font-family: ${themeGet('fonts.body')};
    &:focus {
    outline: none;
    outline-color: transparent;
    outline-style: auto;
    outline-width: 0px;
}
a{
  color:inherit;
  text-decoration:inherit;
  font-size:inherit;
  font-weight:inherit;
  word-break: break-word;
}
  }
  img{
    max-width:100%;
  }

body,#root, .App{
min-height: 100vh;
}

`;

const SiteWrapper = styled.div`
  /* Style system supported prop */

  ${width}
  ${height}
  ${color}
  ${space}
  ${boxShadow}
  ${borderRadius}
`;

GlobalStyle.displayName = 'GlobalStyle';
SiteWrapper.displayName = 'SiteWrapper';

export { GlobalStyle, SiteWrapper };

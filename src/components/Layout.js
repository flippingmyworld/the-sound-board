import React from "react";
import { Box } from "rebass/styled-components";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { GlobalStyle, SiteWrapper } from "../theme/Site.style";
import theme from "../theme";

const Layout = ({ children, title, description }) => {
  title = title || "Soundboard";
  description = description || "A soundboard made with Appwrite.";
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SiteWrapper>
        <Helmet>
          <html lang="en" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta
            property="og:image"
            content="https://soundboard.gatsbyjs.io/img/image-og.jpg"
          />
        </Helmet>
        <Box minHeight="100vh" width="100%" bg="background" color="text">
          {children}
        </Box>
      </SiteWrapper>
    </ThemeProvider>
  );
};
export default Layout;

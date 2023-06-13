import React from "react";
import { Box } from "rebass/styled-components";
import Layout from "../components/Layout";
import Logo from "../components/Logo";
const Page = () => {
  return (
    <Layout>
      <Logo />
      <Box variant="container" textAlign="center">
        <h1 style={{ paddingTop: "30px" }}>About</h1>
        <h2>What?</h2>
        <p>The SoundBoard</p>
        <h2>Who?</h2>
        <p>
          <strong>Julien C. , just another groovy human being</strong>
        </p>
      </Box>
    </Layout>
  );
};
export default Page;

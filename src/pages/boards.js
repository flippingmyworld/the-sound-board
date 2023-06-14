import React from "react";
import { Box } from "rebass/styled-components";
import Layout from "../components/Layout";
import BoardList from "../components/BoardList";
import Logo from "../components/Logo";
const Page = () => {
  return (
    <Layout>
      <Box variant="container">
        <Logo />
        <BoardList />
      </Box>
    </Layout>
  );
};
export default Page;

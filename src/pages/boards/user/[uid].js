import React from "react";
import { Box } from "rebass/styled-components";
import Layout from "../../../components/Layout";
import BoardList from "../../../components/BoardList";
import Logo from "../../../components/Logo";
const Page = ({ uid }) => {
  return (
    <Layout>
      <Box variant="container">
        <Logo />
        <BoardList user={uid} />
      </Box>
    </Layout>
  );
};
export default Page;

import React from "react";
import { Flex, Box, Heading } from "rebass/styled-components";
import { StaticImage } from "gatsby-plugin-image";

const Loading = ({ visible, message }) => {
  message = message || "Loading";
  return visible ? (
    <Flex
      alignItems="center"
      justifyContent="center"
      width={1}
      height="100%"
      sx={{ position: "absolute", top: 0, left: 0, zIndex: 9 }}
      backgroundColor="background"
      opacity={0.9}
    >
      <Box textAlign={"center"}>
        <Heading>{message}</Heading>
        <Flex
          sx={{ animation: "fadeIn 1s infinite alternate" }}
          textAlign="center"
          py={5}
          alignItems="center"
          flexDirection="column"
        >
          <StaticImage
            src="../../static/img/soundboard.png"
            alt="Loading"
            placeholder="blurred"
            layout="fixed"
            width={250}
          />
        </Flex>
      </Box>
    </Flex>
  ) : null;
};
export default Loading;

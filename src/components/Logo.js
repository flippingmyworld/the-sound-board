import React from "react";
import { Flex } from "rebass/styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
const Page = () => {
  return (
    <Flex textAlign="center" py={5} alignItems="center" flexDirection="column">
      <Link to="/">
        <StaticImage
          src="../../static/img/soundboard.png"
          alt="Soundboard"
          placeholder="blurred"
          layout="fixed"
          width={300}
        />
      </Link>
    </Flex>
  );
};
export default Page;

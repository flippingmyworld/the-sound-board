import React, { useRef, useEffect, useState } from "react";
import { Link } from "gatsby";
import { Box, Flex, Heading, Text, Button } from "rebass/styled-components";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";

const Page = () => {
  const createRef = useRef();
  const shareRef = useRef();
  const discoverRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Layout>
      <Box
        backgroundColor={scrollPosition > 100 ? "background" : "transparent"}
        sx={{
          zIndex: 9999,
          transition: "all 200ms ease",
          position: "fixed",
          top: 0,
          width: "100%",
        }}
      >
        <Box variant="container" py={5}>
          <Flex px={2} alignItems="center" sx={{ position: "relative" }}>
            <StaticImage
              onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
              src="../../static/img/soundboard.png"
              alt="Soundboard"
              placeholder="blurred"
              height={50}
            />
            <Box mx="auto" />
            <Button
              display={["none", "block"]}
              variant="ninja"
              px={1}
              onClick={() =>
                window.scrollTo({
                  behavior: "smooth",
                  top: createRef.current.offsetTop,
                })
              }
            >
              Create
            </Button>
            <Button
              display={["none", "block"]}
              variant="ninja"
              px={1}
              onClick={() =>
                window.scrollTo({
                  behavior: "smooth",
                  top: shareRef.current.offsetTop,
                })
              }
            >
              Share
            </Button>
            <Button
              display={["none", "block"]}
              variant="ninja"
              px={1}
              onClick={() =>
                window.scrollTo({
                  behavior: "smooth",
                  top: discoverRef.current.offsetTop,
                })
              }
            >
              Discover
            </Button>
            <Button ml={2}>
              <Link to="/app">Go to the Soundboard now!</Link>
            </Button>
          </Flex>
        </Box>
      </Box>
      <Flex
        minHeight="100vh"
        py="100px"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          backgroundImage:
            "linear-gradient(to right top, #0f2026, #082c3a, #003750, #004267, #174c7e)",
        }}
      >
        <Flex textAlign="center" alignItems="center" flexDirection="column">
          <Heading variant="bigTitle">Say welcome to</Heading>
          <StaticImage
            src="../../static/img/soundboard.png"
            alt="Soundboard"
            placeholder="blurred"
            width={600}
          />
          <Heading pb={4}>A soundboard made with Appwrite & GatsbyJS</Heading>
          <Button
            variant="primaryBig"
            onClick={() =>
              window.scrollTo({
                behavior: "smooth",
                top: createRef.current.offsetTop,
              })
            }
          >
            More Infos
          </Button>
        </Flex>
        <div class="custom-shape-divider-bottom-1632974164">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </Flex>

      <Box ref={createRef} backgroundColor="text" color="background">
        <Box variant="container">
          <Flex
            alignItems="center"
            justifyContent="center"
            py={12}
            flexWrap="wrap"
          >
            <Box width={[1, 1, 1 / 2]}>
              <Flex alignItems="center" justifyContent="center" p={2}>
                <StaticImage
                  src="../../static/img/2.jpg"
                  alt="Soundboard"
                  placeholder="blurred"
                  width={400}
                />
              </Flex>
            </Box>
            <Box width={[1, 1, 1 / 2]} py={2}>
              <Heading variant="sectionTitle">Create !</Heading>
              <Text py={3}>
                Get your best groovy songs, sounds, memes from Youtube,
                Soundcloud, Vimeo...
              </Text>
              <Text pb={3}>
                Drag it, trim it, Fade it and turn it to a real{" "}
                <Text as="span" fontWeight="bold">
                  Soundboard
                </Text>
                !
              </Text>
              <Link to="/app">
                <Button variant="primaryBig">Let's Create</Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box ref={shareRef}>
        <Box variant="container">
          <Flex
            alignItems="center"
            justifyContent="center"
            py={12}
            flexWrap="wrap"
          >
            <Box
              width={[1, 1, 1 / 2]}
              py={2}
              textAlign={["left", "left", "right"]}
            >
              <Heading variant="sectionTitle">Share !</Heading>
              <Text py={3}>
                Because "sharing is caring", go socialdelic and share your best{" "}
                <Text as="span" fontWeight="bold">
                  Soundboard
                </Text>
              </Text>
              <Link to="/app">
                <Button variant="primaryBig">Let's Create!</Button>
              </Link>
            </Box>
            <Box width={[1, 1, 1 / 2]}>
              <Flex alignItems="center" justifyContent="center" p={2}>
                <StaticImage
                  src="../../static/img/6.jpg"
                  alt="Soundboard"
                  placeholder="blurred"
                  width={400}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box ref={discoverRef} backgroundColor="text" color="background">
        <Box variant="container" py={12}>
          <Heading variant="sectionTitle" textAlign="center" pb={6}>
            Featured Gasboards
          </Heading>
          <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
            <Box width={[1, 1, 1 / 3]}>
              <Flex alignItems="center" justifyContent="center" p={2}>
                <StaticImage
                  src="../../static/img/7.jpg"
                  alt="Soundboard"
                  placeholder="blurred"
                  width={300}
                />
              </Flex>
            </Box>
            <Box width={[1, 1, 1 / 3]}>
              <Flex alignItems="center" justifyContent="center" p={2}>
                <StaticImage
                  src="../../static/img/4.jpg"
                  alt="Soundboard"
                  placeholder="blurred"
                  width={300}
                />
              </Flex>
            </Box>
            <Box width={[1, 1, 1 / 3]}>
              <Flex alignItems="center" justifyContent="center" p={2}>
                <StaticImage
                  src="../../static/img/5.jpg"
                  alt="Soundboard"
                  placeholder="blurred"
                  width={300}
                />
              </Flex>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="center" p={2}>
            <Link to="/boards">
              <Button variant="primaryBig">View all Boards</Button>
            </Link>
          </Flex>
        </Box>
      </Box>
      <Box variant="container" py={10}>
        <Flex alignItems="center">
          <Text p={2} fontWeight="bold">
            Soundboard
          </Text>
          <Box mx="auto" />
          <Link to="/about">
            <Button variant="ninja" px={1}>
              About
            </Button>
          </Link>
          <a href="https://cloud.appwrite.io/" target="_blank" rel="noreferrer">
            <Button variant="ninja" px={1} href="#!">
              Appwrite Cloud
            </Button>
          </a>
          <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer">
            <Button variant="ninja" px={1} href="#!">
              GatsbyJS
            </Button>
          </a>
        </Flex>
      </Box>
    </Layout>
  );
};
export default Page;

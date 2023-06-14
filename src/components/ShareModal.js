import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button } from "rebass/styled-components";
import { Input } from "@rebass/forms/styled-components";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
const ShareModal = ({ boardId, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const textAreaRef = useRef(null);
  useEffect(() => {
    setBaseUrl(window.location.protocol + "//" + window.location.host);
  }, []);
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopySuccess("Copied! Thanks!");
    setTimeout(function () {
      setCopySuccess("");
    }, 3000);
  };
  if (!boardId) {
    return null;
  }
  const link = baseUrl + "/boards/" + boardId;
  return (
    <>
      <Button
        pl={2}
        variant="ninja"
        onClick={() => {
          setIsOpen(true);
        }}
        width="40px"
      >
        <Icon icon="share" color="text" />
      </Button>
      <Modal
        isOpen={isOpen}
        onClickBg={() => {
          setIsOpen(!isOpen);
        }}
        modalPops={{ width: "400px" }}
      >
        <Box
          width={1}
          p={2}
          variant="card"
          sx={{ position: "relative", zIndex: "2" }}
        >
          <Heading textAlign="center" pb={1}>
            Share this GatsbBoard
          </Heading>
          <Box textAlign="center" py={2}>
            <a
              href={"http://facebook.com/sharer.php?u=" + link}
              target="_blank"
              rel="noreferrer"
              style={{
                transition: "all 200ms ease",
                padding: "10px",
              }}
              className="fb"
            >
              <Button
                variant="socials"
                color="#4267B2"
                sx={{ "&:hover": { background: "#4267B2", color: "#fff" } }}
              >
                <Icon icon="facebook" size={30} />
              </Button>
            </a>
            <a
              href={
                "http://twitter.com/intent/tweet?url=" + link + "&text=" + title
              }
              target="_blank"
              rel="noreferrer"
              style={{
                transition: "all 200ms ease",
                padding: "10px",
              }}
              className="tw"
            >
              <Button
                variant="socials"
                color="#1DA1F2"
                sx={{ "&:hover": { background: "#1DA1F2", color: "#fff" } }}
              >
                <Icon icon="twitter" size={30} />
              </Button>
            </a>
            <a
              href={
                "mailto:?Subject=Soundboard : " +
                title +
                "&Body=Check my Soundboard ! :" +
                link
              }
              target="_blank"
              rel="noreferrer"
              style={{
                transition: "all 200ms ease",
                padding: "10px",
              }}
              className="mail"
            >
              <Button
                variant="socials"
                color="primary"
                sx={{
                  "&:hover": { backgroundColor: "primary", color: "#fff" },
                }}
              >
                <Icon icon="email" size={30} />
              </Button>
            </a>
          </Box>
          <Box width={1 / 1} p={2} display="none">
            <Input
              name="board-name"
              type="text"
              placeholder="My Soundboard name"
              value={baseUrl + "/board/" + boardId}
              ref={textAreaRef}
            />
          </Box>
          <Box width={1 / 1} p={2} textAlign="center">
            <Button
              onClick={copyToClipboard}
              mr={1}
              variant={!copySuccess ? "primary" : "success"}
            >
              {!copySuccess ? "Copy url" : "Copied !"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ settings }) => {
  return { boardId: settings.id, title: settings.name };
};
export default connect(mapStateToProps)(ShareModal);

import React, { useState } from "react";
import { Button, Box } from "rebass/styled-components";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";

import ConnectFrom from "./forms/Connect";
const UserModal = ({ ButtonComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {ButtonComponent ? (
        <Box
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {ButtonComponent}
        </Box>
      ) : (
        <Button
          pl={2}
          variant="ninja"
          onClick={() => {
            setIsOpen(true);
          }}
          width="40px"
        >
          <Icon icon="user" color="text" />
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClickBg={() => {
          setIsOpen(!isOpen);
        }}
        modalPops={{ width: ["100%", "500px"] }}
      >
        <Box
          width={1}
          p={2}
          variant="card"
          sx={{ position: "relative", zIndex: "2" }}
        >
          <ConnectFrom />
        </Box>
      </Modal>
    </>
  );
};

export default UserModal;

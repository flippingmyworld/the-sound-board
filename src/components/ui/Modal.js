import React from "react"
import { Flex, Box } from "rebass/styled-components"

const Modal = ({ isOpen, children, onClickBg, modalPops }) => {
  const onClickBgDefault = () => {
    return false
  }
  modalPops = modalPops || {}
  onClickBg = onClickBg || onClickBgDefault
  const sxOpen = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgb(0 0 0 / 60%)",
    zIndex: 99999,
  }
  const sx = {
    ...sxOpen,
    display: "none !important",
  }
  return (
    <Flex
      sx={isOpen ? { ...sxOpen, overflow: "scroll" } : sx}
      alignItems={["start", "start", "center"]}
      justifyContent="center"
    >
      <Flex
        py={[4, 4, 0]}
        variant="container"
        alignItems={["start", "start", "center"]}
        justifyContent="center"
        {...modalPops}
      >
        {children}
      </Flex>
      <Box
        onClick={() => onClickBg()}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      ></Box>
    </Flex>
  )
}

export default Modal

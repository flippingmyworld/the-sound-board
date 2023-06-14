import React, { useState } from "react";
import { Box, Flex, Button } from "rebass/styled-components";
import { connect } from "react-redux";
import { withTheme } from "styled-components";
import Notification from "./Notification";
import { removeAllNotifications } from "../../redux/actions/notifications";

const Notifications = ({ notifications, dispatch }) => {
  const [isOpen, setIsOpen] = useState(true);
  const closeAll = () => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(removeAllNotifications());
      setIsOpen(true);
    }, 300);
  };
  if (notifications.length > 0) {
    return (
      <Box
        width={[1 / 2, 1 / 2]}
        sx={{
          zIndex: 99999,
          position: "absolute",
          top: 0,
          right: 0,
          maxWidth: "500px",
          maxHeight: "100vh",
          overflow: "scroll",
          transition: "all 300ms ease",
        }}
        backgroundColor="transparent"
        opacity={isOpen ? 1 : 0}
      >
        <Flex px={2} justifyContent="flex-end">
          <Button
            mt={
              notifications.filter((notif) => notif.status === "visible")
                .length > 1
                ? 2
                : "-400px"
            }
            sx={{ transition: "all 300ms ease" }}
            opacity={notifications.length > 0 ? 1 : 0}
            onClick={closeAll}
          >
            Close all
          </Button>
        </Flex>
        {notifications.map((notification, index) => (
          <Notification
            key={notification.id + "-" + index}
            notification={notification}
            zIndex={index}
          />
        ))}
      </Box>
    );
  } else {
    return <></>;
  }
};
const mapStateToProps = ({ notifications }) => {
  return { notifications: notifications };
};
export default connect(mapStateToProps)(withTheme(Notifications));

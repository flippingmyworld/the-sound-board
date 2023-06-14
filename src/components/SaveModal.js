import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import { updateSettings } from "../redux/actions/settings";
import { addNotification } from "../redux/actions/notifications";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";
import { navigate } from "gatsby";
import { databases, ID } from "../utils/appwriteClient";
import UserModal from "./UserModal";
const SaveModal = ({ state, user, dispatch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = state;
  const saveSettings = (settingsToSave) => {
    dispatch(updateSettings(settingsToSave));
  };
  const save = () => {
    if (settings.name !== "" && state.pads.length) {
      if (settings.id) {
        databases
          .updateDocument("soundboard", "boards", settings.id, {
            data: JSON.stringify(state),
            user: user.user.$id,
          })
          .then(() => {
            dispatch(addNotification("Soundboard updated"));
          }, console.log);
      } else {
        const promise = databases.createDocument(
          "soundboard",
          "boards",
          ID.unique(),
          {
            data: JSON.stringify(state),
            user: user.user.$id,
          }
        );

        promise.then(
          function (response) {
            navigate("/boards/" + response.$id);
          },
          function (error) {}
        );
      }
    }
  };
  if (state.pads.length) {
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
          <Icon icon="save" color="text" />
        </Button>
        <Modal
          isOpen={isOpen}
          onClickBg={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Box
            width={1}
            p={2}
            variant="card"
            sx={{ position: "relative", zIndex: "2" }}
          >
            <Heading textAlign="center" pb={1}>
              Save this Soundboard
            </Heading>
            {!user.user && !user.session ? (
              <UserModal
                ButtonComponent={
                  <Box textAlign="center" py={3}>
                    <Button>Login to save your soundboard</Button>
                  </Box>
                }
              />
            ) : (
              <>
                <Box width={1 / 1} p={2}>
                  <Label htmlFor="board-name">Soundboard name</Label>
                  <Input
                    name="board-name"
                    type="text"
                    placeholder="My Soundboard name"
                    value={settings.name}
                    onChange={(e) =>
                      saveSettings({
                        name: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box width={1 / 1} p={2}>
                  <Button
                    opacity={settings.name !== "" ? 1 : 0.5}
                    onClick={save}
                    mr={1}
                  >
                    Save this board
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </>
    );
  }
  return null;
};

const mapStateToProps = ({ user, ...state }) => {
  return { state: state, user };
};
export default connect(mapStateToProps)(SaveModal);

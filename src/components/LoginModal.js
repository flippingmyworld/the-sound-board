import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import Icon from "./ui/Icon";
import Modal from "./ui/Modal";

import { ID, account } from "../utils/appwriteClient";

const SaveModal = () => {
  const [currentUser, setCurrentUser] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [loginValues, setLoginValues] = useState({ mail: "", pass: "" });
  useEffect(() => {
    isConnected();
  }, []);
  useEffect(() => {
    // console.log(currentUser);
  }, [isOpen]);
  const isConnected = () => {
    const promise = account.get();

    promise.then(
      function (response) {
        console.log(response); // Success
        setCurrentUser(response);
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };
  const create = () => {
    if (loginValues.mail !== "" && loginValues.pass !== "") {
      const promise = account.create(
        ID.unique(),
        loginValues.mail,
        loginValues.pass
      );

      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    }
  };
  const login = () => {
    if (loginValues.mail !== "" && loginValues.pass !== "") {
      const promise = account.createEmailSession(
        loginValues.mail,
        loginValues.pass
      );

      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    }
  };
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
        <Icon icon="user" color="text" />
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
            Login
          </Heading>

          <Box width={1 / 1} p={2}>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="text"
              placeholder="your@mail.com"
              value={loginValues.mail}
              onChange={(e) =>
                setLoginValues({
                  ...loginValues,
                  mail: e.target.value,
                })
              }
            />
          </Box>
          <Box width={1 / 1} p={2}>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              placeholder=""
              value={loginValues.pass}
              onChange={(e) =>
                setLoginValues({
                  ...loginValues,
                  pass: e.target.value,
                })
              }
            />
          </Box>
          <Box width={1 / 1} p={2}>
            <Button
              opacity={
                loginValues.mail !== "" && loginValues.pass !== "" ? 1 : 0.5
              }
              onClick={login}
              mr={1}
            >
              Log me in
            </Button>
            or
            <Button
              opacity={
                loginValues.mail !== "" && loginValues.pass !== "" ? 1 : 0.5
              }
              onClick={create}
              mr={1}
            >
              Create account
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return { state: state };
};
export default connect(mapStateToProps)(SaveModal);

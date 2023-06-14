import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button, Flex } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";
import { updateUser } from "../../redux/actions/user";

import { ID, account } from "../../utils/appwriteClient";

const LoginForm = ({ dispatch }) => {
  const [currentUser, setCurrentUser] = useState(false);

  const [formValues, setFormValues] = useState({ mail: "", pass: "" });
  useEffect(() => {
    isConnected();
  }, []);
  const isConnected = () => {
    const promise = account.get();

    promise.then(
      function (response) {
        console.log(response); // Success
        dispatch(updateUser(response)); // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  const login = () => {
    if (formValues.mail !== "" && formValues.pass !== "") {
      const promise = account.createEmailSession(
        formValues.mail,
        formValues.pass
      );

      promise.then(
        function (response) {
          isConnected();
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    }
  };
  return (
    <Box width={1} p={2}>
      <Heading textAlign="center" pb={1}>
        Login
      </Heading>

      <Box width={1 / 1} p={2}>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="text"
          placeholder="your@mail.com"
          value={formValues.mail}
          onChange={(e) =>
            setFormValues({
              ...formValues,
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
          value={formValues.pass}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              pass: e.target.value,
            })
          }
        />
      </Box>
      <Flex width={1 / 1} p={2} justifyContent="center">
        <Button
          opacity={formValues.mail !== "" && formValues.pass !== "" ? 1 : 0.5}
          onClick={login}
          mr={1}
        >
          Log me in
        </Button>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};
export default connect(mapStateToProps)(LoginForm);

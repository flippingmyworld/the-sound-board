import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";

import { ID, account } from "../../utils/appwriteClient";

const ProfileForm = () => {
  const [formValues, setFormValues] = useState({ mail: "", pass: "" });
  useEffect(() => {
    isConnected();
  }, []);
  const isConnected = () => {
    account.getSession("current").then((resp) => dispatch(updateSession(resp)));
  };

  const login = () => {
    if (formValues.mail !== "" && formValues.pass !== "") {
      const promise = account.createEmailSession(
        formValues.mail,
        formValues.pass
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
      <Box width={1 / 1} p={2}>
        <Button
          opacity={formValues.mail !== "" && formValues.pass !== "" ? 1 : 0.5}
          onClick={login}
          mr={1}
        >
          Log me in
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { state: state };
};
export default connect(mapStateToProps)(ProfileForm);

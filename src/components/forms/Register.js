import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button, Flex } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";

import { updateSession, setLoading } from "../../redux/actions/user";
import { ID, account } from "../../utils/appwriteClient";

const RegisterForm = ({ dispatch }) => {
  const [formValues, setFormValues] = useState({
    mail: "",
    pass: "",
    name: "",
  });
  const create = () => {
    if (formValues.mail !== "" && formValues.pass !== "") {
      dispatch(setLoading(true));
      account
        .create(ID.unique(), formValues.mail, formValues.pass, formValues.name)
        .then((userObj) => {
          account
            .createEmailSession(formValues.mail, formValues.pass)
            .then((resp) => {
              dispatch(updateSession(resp));
            }, console.log);
        }, console.log);
    }
  };
  return (
    <Box width={1} p={2}>
      <Heading textAlign="center" pb={1}>
        Register
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
        <Label htmlFor="name">Name</Label>
        <Input
          name="name"
          type="text"
          placeholder="Username"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              name: e.target.value,
            })
          }
        />
      </Box>
      <Flex width={1 / 1} p={2} justifyContent="center">
        <Button
          opacity={formValues.mail !== "" && formValues.pass !== "" ? 1 : 0.5}
          onClick={create}
          mr={1}
        >
          Register
        </Button>
      </Flex>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { state: state };
};
export default connect(mapStateToProps)(RegisterForm);

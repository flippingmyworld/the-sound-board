import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Box, Heading, Button, Flex } from "rebass/styled-components";
import { Input, Label } from "@rebass/forms/styled-components";
import LogoutForm from "./LogoutForm";
import { account, databases } from "../../utils/appwriteClient";
import { Link } from "gatsby";

const ProfileForm = ({ dispatch, user }) => {
  const [formValues, setFormValues] = useState({
    username: user.name,
    avatar: "",
    bio: "",
  });
  const update = () => {
    if (formValues.username !== user.name) {
      const promise = account.updateName(formValues.username);

      promise.then(
        function (response) {
          console.log(response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );

      databases
        .updateDocument("soundboard", "users", user.$id, {
          name: formValues.username,
        })
        .then(
          function (response) {
            console.log(response); // Success
          },
          function (error) {
            databases.createDocument("soundboard", "users", user.$id, {
              name: formValues.username,
            });
          }
        );
    }
  };
  return (
    <Box width={1} p={2}>
      <Heading textAlign="center" pb={1}>
        Profile
      </Heading>

      <Box width={1 / 1} p={2}>
        <Label htmlFor="username">User name</Label>
        <Input
          name="username"
          type="text"
          placeholder="User name"
          value={formValues.username}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              username: e.target.value,
            })
          }
        />
      </Box>
      <Flex width={1 / 1} p={2} justifyContent="space-between">
        <Button
          onClick={update}
          mr={1}
          opacity={formValues.username !== user.name ? 1 : 0.5}
        >
          Update
        </Button>
        <Link to={"/boards/user/" + user.$id}>
          <Button mr={1}>Go to my soundboards</Button>
        </Link>

        <LogoutForm />
      </Flex>
    </Box>
  );
};

const mapStateToProps = ({ user }) => {
  return { ...user };
};
export default connect(mapStateToProps)(ProfileForm);

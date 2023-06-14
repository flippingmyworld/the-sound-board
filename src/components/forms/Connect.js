import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Flex, Text, Button, Box } from "rebass/styled-components";
import LoginForm from "./Login";
import RegisterForm from "./Register";

import { updateUser } from "../../redux/actions/user";
import { account } from "../../utils/appwriteClient";
import LogoutForm from "./LogoutForm";

const Connect = ({ user }) => {
  const tabs = [
    <>
      <LoginForm />

      <Flex width={1 / 1} p={2} justifyContent="center">
        <Text>
          No account yet?{" "}
          <Button
            color={"primary"}
            variant="ninja"
            onClick={() => setActiveTab(1)}
            display="inline"
          >
            Register
          </Button>
        </Text>
      </Flex>
    </>,
    <>
      <RegisterForm />
      <Flex width={1 / 1} p={2} justifyContent="center">
        <Text>
          Already have an account ?{" "}
          <Button
            variant="ninja"
            color={"primary"}
            onClick={() => setActiveTab(0)}
            display="inline"
          >
            Log in
          </Button>
        </Text>
      </Flex>
    </>,
    ,
  ];
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    isConnected();
  }, []);
  const isConnected = () => {
    const promise = account.get();

    promise.then(
      function (response) {
        updateUser(response); // Success
        // setCurrentUser(response);
      },
      function (error) {
        updateUser({}); // Failure
      }
    );
  };
  if (user?.$id) {
    return (
      <Box>
        Hello
        <LogoutForm />
      </Box>
    );
  }
  return (
    <Box width={1} p={2}>
      <h1>{user.userId}</h1>
      {tabs[activeTab]}
    </Box>
  );
};

const mapStateToProps = ({ user }) => {
  return { user: user.user };
};
export default connect(mapStateToProps)(Connect);

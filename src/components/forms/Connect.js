import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Flex, Text, Button, Box } from "rebass/styled-components";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Loading from "../Loading";
import {
  updateUser,
  updateSession,
  setLoading,
} from "../../redux/actions/user";
import { account } from "../../utils/appwriteClient";
import LogoutForm from "./LogoutForm";

const Connect = ({ user, session, loading, dispatch }) => {
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
  ];
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    isConnected();
  }, []);

  useEffect(() => {
    if (user && !session) {
      isConnected();
    }
    if (!user && session) {
      dispatch(setLoading());
      account.get().then((resp) => dispatch(updateUser(resp)), console.log);
    }
  }, [user, session]);
  const isConnected = () => {
    dispatch(setLoading());
    account.getSession("current").then((resp) => {
      dispatch(updateSession(resp));
    }, console.log);
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
    <Box width={1} p={2} sx={{ position: "relative" }}>
      <Loading visible={loading} />
      {tabs[activeTab]}
    </Box>
  );
};

const mapStateToProps = ({ user }) => {
  return { ...user };
};
export default connect(mapStateToProps)(Connect);

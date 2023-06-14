import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "rebass/styled-components";

import { logout } from "../../redux/actions/user";

import { ID, account } from "../../utils/appwriteClient";

const LoginForm = ({ dispatch }) => {
  const LogOut = () => {
    const promise = account.deleteSession("current");

    promise.then(
      function (response) {
        dispatch(logout());
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <Button onClick={LogOut} mr={1}>
      Log out
    </Button>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};
export default connect(mapStateToProps)(LoginForm);

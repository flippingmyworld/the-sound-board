import React from "react";
import { connect } from "react-redux";
import { Button } from "rebass/styled-components";

import { logout } from "../../redux/actions/user";

import { account } from "../../utils/appwriteClient";

const LoginForm = ({ dispatch }) => {
  const LogOut = () => {
    const promise = account.deleteSession("current");

    promise.then(
      function () {
        dispatch(logout());
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  };

  return (
    <Button variant="primaryOutline" onClick={LogOut} mr={1}>
      Log out
    </Button>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.user };
};
export default connect(mapStateToProps)(LoginForm);

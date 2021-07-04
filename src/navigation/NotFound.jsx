import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
  };
};

let NotFound = ({ isAuth }) => {
  if (!isAuth) return <Redirect to="sign-in" />;
  return (
    <>
      <h4>This page does not exist.</h4>
    </>
  );
};

NotFound = connect(mapStateToProps)(NotFound);

export default NotFound;

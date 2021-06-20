import React from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/user";

// Redux Containers Props Injection

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (name) => {
      dispatch(login(name));
    },
  };
};

// Component

let Login = ({ onLogin, user }) => {
  return (
    <>
      <button onClick={() => onLogin("Hello world")}>Test</button>
      <button onClick={() => console.log(user)}>Log</button>
    </>
  );
};

// Connecting : Component to Containers

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;

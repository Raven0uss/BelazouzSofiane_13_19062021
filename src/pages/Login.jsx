import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";
import { loginHTTP } from "../api";
import { login } from "../redux/actions/user";
import styled from "styled-components";

const ErrorMessage = styled.p`
  color: #b02525;
  font-weight: bold;
`;

// Redux Containers Props Injection

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: async (token) => {
      dispatch(login(token));
    },
  };
};

// Component

let Login = ({ onLogin, isAuth }) => {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);

  const [status, setStatus] = React.useState({
    status: undefined,
    message: undefined,
  });

  const loginAction = async () => {
    const response = await loginHTTP({
      email: username,
      password,
    });
    setStatus(response);
    if (response.status !== 200) return undefined;
    const { token } = response.body;
    onLogin(token);
    history.push("/profile");
  };

  const loginDisabled = () => username.length === 0 || password.length === 0;

  if (isAuth) return <Redirect to="/" />;
  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {status.status !== 200 && (
            <ErrorMessage>{status.message}</ErrorMessage>
          )}
          <button
            className={`sign-in-button ${
              loginDisabled() ? "button-disabled" : ""
            }`}
            onClick={() => {
              loginAction();
            }}
            disabled={loginDisabled()}
          >
            Sign In
          </button>
        </section>
      </main>
    </>
  );
};

// Connecting : Component to Containers

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;

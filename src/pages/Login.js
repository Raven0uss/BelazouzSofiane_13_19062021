import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../redux/actions/user";

import { useHistory } from "react-router-dom";

// Redux Containers Props Injection

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
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

let Login = ({ onLogin, isAuth }) => {
  const history = useHistory();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);

  if (isAuth) return <Redirect to="/" />;
  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
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

            <button
              className="sign-in-button"
              onClick={() => {
                onLogin("Mourad");
                history.push("/profile");
              }}
            >
              Sign In
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

// Connecting : Component to Containers

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;

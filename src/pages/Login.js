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
  React.useEffect(() => {}, []);
  return (
    <>
      <button onClick={() => onLogin("Hello world")}>Test</button>
      <button onClick={() => console.log(user)}>Log</button>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label for="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label for="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            <a href="./user.html" className="sign-in-button">
              Sign In
            </a>
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            {/* <!-- <button className="sign-in-button">Sign In</button> -->
          <!--  --> */}
          </form>
        </section>
      </main>
    </>
  );
};

// Connecting : Component to Containers

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;

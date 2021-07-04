import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/user";

import argentBankLogo from "../assets/img/argentBankLogo.png";

// Redux Containers Props Injection

const mapStateToProps = (state) => {
  return {
    data: state.user.data,
    isAuth: state.user.isAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout());
    },
  };
};

// Component

let Header = ({ data, isAuth, onLogout }) => {
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuth ? (
          <>
            <Link className="main-nav-item" to="profile">
              <i className="fa fa-user-circle"></i>
              {data.firstName} {data.lastName}
            </Link>
            <Link className="main-nav-item" to="/" onClick={onLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default Header;

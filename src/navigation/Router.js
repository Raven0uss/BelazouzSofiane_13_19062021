import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import WrapComponent from "./WrapComponent";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

import NotFound from "./NotFound";

// import Header from "../layout/Header";
// import Footer from "../layout/Footer";

const routes = [
  {
    id: "login",
    path: "/",
    exact: true,
    component: (props) => <Login {...props} />,
  },
  {
    id: "home",
    path: "/home",
    exact: true,
    component: (props) => <Home {...props} />,
  },
  {
    id: "profile",
    path: "/profile",
    exact: true,
    component: (props) => <Profile {...props} />,
  },
  {
    id: "404",
    path: "*",
    exact: false,
    component: () => <NotFound />,
  },
];

const Router = () => {
  return (
    <BrowserRouter>
      {/* <div id="app-wrap"> */}
      {/* <Header />
          <WrapComponent> */}
      <Switch>
        {routes.map((route) => {
          return (
            <Route
              key={route.id}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          );
        })}
      </Switch>
      {/* </WrapComponent>
        </div>
        <Footer /> */}
    </BrowserRouter>
  );
};

export default Router;

import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isLoggedIn, isLoggedInAsAdmin } from "../../utility";
import Sidebar from "../Sidebar";
import AdminSidebar from "../AdminSidebar";
import MainHeader from "../MainHeader";
import AdminMainHeader from "../AdminMainHeader";

// import AuthFooter from "../AuthFooter";
// import AuthHeader from "../AuthHeader";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedIn() ? (
          <Redirect to="/login" />
        ) : (
          <React.Fragment>
            <MainHeader {...props} />
            <Sidebar />
            <div className="site-content">
              <Component {...props} />
            </div>
            {/* <AuthFooter /> */}
          </React.Fragment>
        )
      }
    />
  );
};

export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isLoggedInAsAdmin() ? (
          <Redirect to="/admin-login" />
        ) : (
          <React.Fragment>
            <AdminMainHeader {...props} />
            <AdminSidebar />
            <div className="site-content">
              <Component {...props} />
            </div>
            {/* <AuthFooter /> */}
          </React.Fragment>
        )
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <React.Fragment>
          <div className="main-content">
            <Component {...props} />
          </div>
          {/* <AuthFooter /> */}
        </React.Fragment>
      )}
    />
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <React.Fragment>
        {/* <AuthHeader /> */}
        <div className="auth-content">
          <Component {...props} />
        </div>
        {/* <AuthFooter /> */}
      </React.Fragment>
    )}
  />
);

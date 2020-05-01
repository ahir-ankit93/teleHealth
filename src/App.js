import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Login,
  AdminLogin,
  Register,
  LandingPage,
  ForgotPassword,
  ResetPassword
} from "./pages/Auth";

import {
  PatientLandingPage,
  CreateProfile,
  UpdateProfile,
  SearchDoctors,
  BillingEngine,
  ScheduleAppointment,
  FormOne,
  FormTwo,
  FormThree,
  PatientAudit
} from "./pages/Patient";
import {
  ManageUsers,
  SuiteCRMContacts,
  AdminLandingPage,
  AuditReports,
  PatientAuditForm
} from "./pages/Admin";
import { Chat, ZoomMeeting } from "./pages/Omnichannel";
import {
  AuthRoute,
  AdminRoute,
  PublicRoute,
  PrivateRoute
} from "./components/routes";
import { setupHttpConfig } from "./utils/http";

function App() {
  useEffect(() => {
    setupHttpConfig();
    window.addEventListener("beforeunload", ev => {
      ev.preventDefault();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    });
  }, []);

  return (
    <div className="app-container">
      <ToastContainer autoClose={3000} />
      <Provider store={store}>
        <Router>
          <PublicRoute path="/" exact component={LandingPage} />

          <AuthRoute path="/login" exact component={Login} />
          <AuthRoute path="/admin-login" exact component={AdminLogin} />
          <AuthRoute path="/sign-up" exact component={Register} />
          <AuthRoute path="/forgot-password" exact component={ForgotPassword} />
          <AuthRoute path="/reset-password" exact component={ResetPassword} />

          <AdminRoute path="/admin-home" exact component={AdminLandingPage} />
          <AdminRoute path="/meeting" exact component={ZoomMeeting} />
          <AdminRoute path="/manage-users" exact component={ManageUsers} />
          <AdminRoute path="/audit-reports" exact component={AuditReports} />
          <AdminRoute
            path="/patient-audit-form"
            exact
            component={PatientAuditForm}
          />
          <AdminRoute
            path="/suiteCRM-contacts"
            exact
            component={SuiteCRMContacts}
          />

          <PrivateRoute path="/home" exact component={PatientLandingPage} />
          <PrivateRoute path="/form-one" exact component={FormOne} />
          <PrivateRoute path="/form-two" exact component={FormTwo} />
          <PrivateRoute path="/form-three" exact component={FormThree} />
          <PrivateRoute path="/patient-audit" exact component={PatientAudit} />
          <PrivateRoute
            path="/create-profile"
            exact
            component={CreateProfile}
          />
          <PrivateRoute
            path="/update-profile"
            exact
            component={UpdateProfile}
          />
          <PrivateRoute
            path="/search-doctors"
            exact
            component={SearchDoctors}
          />

          <PrivateRoute path="/billing" exact component={BillingEngine} />
          <PrivateRoute
            path="/appointment"
            exact
            component={ScheduleAppointment}
          />
          <PrivateRoute path="/chat" exact component={Chat} />
          {/* <PrivateRoute path="/meeting" exact component={ZoomMeeting} /> */}
        </Router>
      </Provider>
    </div>
  );
}

export default App;

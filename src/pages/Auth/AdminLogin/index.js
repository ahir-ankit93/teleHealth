import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import ValidatedInput from "../../../components/ValidatedInput";
import { adminLogin, resetFlags } from "../../../redux/actions/AuthAction";
import { isLoggedInAsAdmin } from "../../../utility";

const AdminLogin = ({
  authAdminFlags,
  authAdminErrors,
  admin,
  adminLogin,
  resetFlags,
  history,
  handleSubmit
}) => {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isLoggedInAsAdmin()) {
      history.push("/admin-home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authAdminErrors && authAdminErrors.adminLogin) {
      toast.error(authAdminErrors.adminLogin);
      resetFlags();
      setProcessing(false);
    }

    if (authAdminFlags && authAdminFlags.adminLogin) {
      resetFlags();
      history.push("/admin-home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authAdminErrors, authAdminFlags]);

  const handleAdminLogin = formData => {
    const { username, password } = formData;
    setProcessing(true);
    adminLogin({ username, password });
  };

  return (
    <div className="auth-page-wrapper">
      <Form
        className="form-container"
        onSubmit={handleSubmit(handleAdminLogin)}
      >
        <div className="form-header">
          <h2>Welcome Back Admin!</h2>
        </div>
        <div className="back-btn">
          <Link to="/">Home</Link>
        </div>
        <FormGroup>
          <Row>
            <Label sm={4}>Username</Label>
            <Col sm={8} className="label-redirection"></Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                component={ValidatedInput}
                type="text"
                name="username"
                placeholder="Username "
              />
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <Label sm={4}>Password</Label>
            <Col sm={8} className="label-redirection"></Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Field
                component={ValidatedInput}
                type="password"
                name="password"
                placeholder="Password"
              />
            </Col>
          </Row>
        </FormGroup>
        <div className="button_wrapper">
          <button
            className="custom-btn-primary"
            type="submit"
            disabled={processing}
          >
            LOGIN {processing && <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </div>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Field is required";
  }

  if (!values.password) {
    errors.password = "Field is required";
  }
  return errors;
};

const mapStateToProps = state => ({
  authAdminErrors: state.Auth.errors,
  authAdminFlags: state.Auth.flags,
  admin: state.Auth.admin
});

const mapDispatchToProps = dispatch => ({
  adminLogin: payload => {
    dispatch(adminLogin(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const AdminLoginComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLogin);

export default reduxForm({
  form: "AdminLoginForm",
  validate
})(AdminLoginComponent);

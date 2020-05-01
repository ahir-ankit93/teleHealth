import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Col, Form, FormGroup, Label, Row } from "reactstrap";
import { toast } from "react-toastify";
import ValidatedInput from "../../../components/ValidatedInput";
import { login, resetFlags } from "../../../redux/actions/AuthAction";
import { isLoggedIn } from "../../../utility";

const Login = ({
  authFlags,
  authErrors,
  user,
  login,
  resetFlags,
  history,
  handleSubmit
}) => {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      history.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authErrors && authErrors.login) {
      toast.error(authErrors.login);
      resetFlags();
      setProcessing(false);
    }

    if (authFlags && authFlags.loginSuccess) {
      resetFlags();
      history.push("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrors, authFlags]);

  const handleLogin = formData => {
    const { username, password } = formData;
    setProcessing(true);
    login({ username, password });
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(handleLogin)}>
        <div className="form-header">
          <h2>Welcome Back!</h2>
        </div>
        <div className="back-btn">
          <Link to="/">Home</Link>
        </div>
        <FormGroup>
          <Row>
            <Label sm={4}>Username</Label>
            <Col sm={8} className="label-redirection">
              <Link to="/sign-up">Create Account?</Link>
            </Col>
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
            <Col sm={8} className="label-redirection">
              <Link to="/forgot-password">Forgot Password?</Link>
            </Col>
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
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
  user: state.Auth.user
});

const mapDispatchToProps = dispatch => ({
  login: payload => {
    dispatch(login(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginComponent);

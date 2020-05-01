import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Col, FormGroup, Label, Row } from "reactstrap";
import ValidatedInput from "../../../components/ValidatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { resetPassword, resetFlags } from "../../../redux/actions/AuthAction";

const ResetPassword = ({
  handleSubmit,
  authErrors,
  authFlags,
  resetPassword,
  history,
  resetFlags
}) => {
  const [processing, setProcessing] = useState(false);
  const [pid, setPid] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const search = history.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      const pid = params.get("pid");
      const token = params.get("token");
      if (token && pid) {
        setPid(pid);
        setToken(token);
      } else {
        toast.error("Invalid Reset password link");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authErrors && authErrors.resetPassword) {
      toast.error(authErrors.resetPassword);
      resetFlags();
      setProcessing(false);
    }

    if (authFlags && authFlags.resetPasswordSuccess) {
      resetFlags();
      setProcessing(false);
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrors, authFlags]);

  const handleResetPassword = formData => {
    if (pid && token) {
      const payload = {
        new_password1: formData.password,
        new_password2: formData.confirmPassword,
        pid,
        token
      };
      setProcessing(true);
      resetPassword(payload);
    } else {
      toast.error("Invalid Reset password link");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <form
        className="form-container"
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <div className="back-btn">
          <Link to="/login">back</Link>
        </div>
        <div className="form-header mt-md-3 mt-0">
          <h2>Reset your password</h2>
          {/* <span>Please enter new password.</span> */}
        </div>
        <div className="form_wrapper">
          <FormGroup>
            <Row>
              <Label sm={4} xs={12}>
                New Password
              </Label>
            </Row>
            <Row>
              <Col sm={12}>
                <Field
                  component={ValidatedInput}
                  type="password"
                  name="password"
                  placeholder="Password"
                  displayShowPassword
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm={4} xs={12}>
                Confirm Password
              </Label>
            </Row>
            <Row>
              <Col sm={12}>
                <Field
                  component={ValidatedInput}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  displayShowPassword
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
              SUBMIT {processing && <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Field is required";
  }
  if (
    values.password &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must include uppercase, lowercase, digit and special character";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Field is required";
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Password doesn't match";
  }
  return errors;
};

const mapStateToProps = state => ({
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
  user: state.Auth.user
});

const mapDispatchToProps = dispatch => ({
  resetPassword: payload => {
    dispatch(resetPassword(payload));
  },
  resetFlags: () => {
    dispatch(resetFlags());
  }
});

const ResetPasswordComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default reduxForm({
  form: "ResetPasswordForm",
  validate
})(ResetPasswordComponent);

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm, reset } from "redux-form";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import ValidatedInput from "../../../components/ValidatedInput";
import { forgotPassword, resetFlags } from "../../../redux/actions/AuthAction";

const ForgotPassword = ({
  handleSubmit,
  authErrors,
  authFlags,
  forgotPassword,
  resetFlags,
  resetForm
}) => {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (authErrors && authErrors.forgotPassword) {
      resetFlags();
      toast.error(authErrors.forgotPassword);
      setProcessing(false);
    }

    if (authFlags && authFlags.forgotPasswordSuccess) {
      resetFlags();
      setProcessing(false);
      resetForm("ForgotPasswordForm");
      toast.success("Reset password link has been sent to your email.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrors, authFlags]);

  const handleForgot = formData => {
    setProcessing(true);
    forgotPassword(formData);
  };
  return (
    <div className="auth-page-wrapper">
      <form className="form-container" onSubmit={handleSubmit(handleForgot)}>
        <div className="back-btn">
          <Link to="/login">back</Link>
        </div>
        <div className="form-header mt-md-3 mt-0">
          <h2>Forgot your password?</h2>
          <span>
            We will send you instructions on how to reset your password
          </span>
        </div>
        <div className="form_wrapper">
          <FormGroup>
            <Row>
              <Label sm={4} xs={12}>
                Email
              </Label>
            </Row>
            <Row>
              <Col sm={12}>
                <Field
                  component={ValidatedInput}
                  type="email"
                  name="email"
                  placeholder="Email"
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
        {/* <div className="links-forgot">
          <h5>Still having trouble?</h5>
          <a href="mailto:Support@MyraWealth.com">Support@MyraWealth.com</a>
        </div> */}
      </form>
    </div>
  );
};
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Field is required";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapStateToProps = state => ({
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
  user: state.Auth.user
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: payload => {
    dispatch(forgotPassword(payload));
  },
  resetFlags: () => {
    dispatch(resetFlags());
  },
  resetForm: name => {
    dispatch(reset(name));
  }
});

const ForgotPasswordComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

export default reduxForm({
  form: "ForgotPasswordForm",
  validate
})(ForgotPasswordComponent);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset, change } from "redux-form";
import { toast } from "react-toastify";

import { Col, FormGroup, Label, Form, Row } from "reactstrap";
import {
  updateProfile,
  resetFlags
} from "../../../redux/actions/PatientAction";
import ValidatedInput from "../../../components/ValidatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

const UpdateProfile = ({
  getUser,
  userDetails,
  updateProfileFlags,
  updateProfileErrors,
  updateProfile,
  resetFlags,
  history,
  dispatch,
  resetForm,
  handleSubmit
}) => {
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (updateProfileErrors && updateProfileErrors.updateProfile) {
      toast.error(updateProfileErrors.updateProfile);
      resetFlags();
      setProcessing(false);
    }

    if (updateProfileFlags && updateProfileFlags.updateProfile) {
      resetFlags();
      setProcessing(false);
      toast.success(updateProfileFlags.updateProfile);
      resetForm("UpdateProfileForm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfileErrors, updateProfileFlags]);

  if (getUser && userDetails) {
    // dispatch(change("UpdateProfileForm", "DOB", getUser.dob));
    dispatch(change("UpdateProfileForm", "email", userDetails.email));
    dispatch(change("UpdateProfileForm", "username", userDetails.username));
    dispatch(change("UpdateProfileForm", "first_name", userDetails.first_name));
    dispatch(change("UpdateProfileForm", "last_name", userDetails.last_name));
    dispatch(change("UpdateProfileForm", "phone", getUser.phone_contact));
    dispatch(change("UpdateProfileForm", "city", getUser.city));
  }

  const handleUpdateProfile = formData => {
    setProcessing(true);
    const {
      age,
      address,
      DOB,
      FatherHusband_Name,
      email,
      username,
      first_name,
      last_name,
      phone,
      city
    } = formData;
    updateProfile({
      age,
      address,
      DOB: moment(DOB).format("YYYY-MM-DD"),
      "Father/Husband_Name": FatherHusband_Name,
      email,
      username,
      first_name,
      last_name,
      phone,
      city
    });
  };

  return (
    <div className="auth-page-wrapper">
      <Form
        className="form-container"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <div className="form-title">
          <h1>Update Profile</h1>
        </div>
        <br />
        {getUser && (
          <React.Fragment>
            <FormGroup row>
              <Label sm={4}>Age</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="age"
                  placeholder="Age"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Address</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="textarea"
                  name="address"
                  placeholder="Address"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Date of Birth</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="date"
                  name="DOB"
                  value={getUser.dob}
                  placeholder="Date of Birth"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Father/Husband_Name</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="FatherHusband_Name"
                  placeholder="Father or Husband Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4} xs={12}>
                Email
              </Label>
              <Col sm={7} xs={10}>
                <Field
                  component={ValidatedInput}
                  type="email"
                  name="email"
                  value={userDetails.email}
                  placeholder="Email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Username</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="username"
                  value={userDetails.username}
                  placeholder="Username"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>First Name</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="first_name"
                  value={userDetails.first_name}
                  placeholder="First Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Last Name</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="last_name"
                  value={userDetails.last_name}
                  placeholder="Last Name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>Phone Number</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="phone"
                  value={getUser.phone}
                  placeholder="Phone Number"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={4}>City</Label>
              <Col sm={7}>
                <Field
                  component={ValidatedInput}
                  type="text"
                  name="city"
                  value={getUser.city}
                  placeholder="City"
                />
              </Col>
            </FormGroup>

            <Row>
              <Col sm={6}></Col>
              <Col sm={5}>
                <div className="button_wrapper">
                  <button
                    className="custom-btn-primary"
                    type="submit"
                    disabled={processing}
                  >
                    Save{" "}
                    {processing && <FontAwesomeIcon icon={faSpinner} spin />}
                  </button>
                </div>
              </Col>
              <Col sm={1}></Col>
            </Row>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};

  if (!values.age) {
    errors.age = "Field is required";
  }
  if (!values.address) {
    errors.address = "Field is required";
  }
  if (!values.DOB) {
    errors.DOB = "Field is required";
  }
  if (!values.FatherHusband_Name) {
    errors.FatherHusband_Name = "Field is required";
  }
  if (!values.email) {
    errors.email = "Field is required";
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.phone) {
    errors.phone = "Field is required";
  }
  if (!values.city) {
    errors.city = "Field is required";
  }
  if (!values.username) {
    errors.username = "Field is required";
  }
  if (!values.first_name) {
    errors.first_name = "Field is required";
  }
  if (!values.last_name) {
    errors.last_name = "Field is required";
  }

  return errors;
};

const mapStateToProps = state => ({
  updateProfileErrors: state.Patient.errors,
  updateProfileFlags: state.Patient.flags,
  getUser: state.Auth.getUser,
  userDetails: state.Auth.userDetails
});

const mapDispatchToProps = dispatch => ({
  updateProfile: payload => {
    dispatch(updateProfile(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: UpdateProfileForm => {
    dispatch(reset(UpdateProfileForm));
  }
});

const UpdateProfileComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);

export default reduxForm({
  form: "UpdateProfileForm",
  validate
})(UpdateProfileComponent);

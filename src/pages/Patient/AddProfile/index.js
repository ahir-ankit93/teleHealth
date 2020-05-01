import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import moment from "moment";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input as InputComponent,
  Form
} from "reactstrap";
import {
  createProfile,
  resetFlags
} from "../../../redux/actions/PatientAction";
import ValidatedInput from "../../../components/ValidatedInput";
// import ValidatedSelect from "../../../components/ValidatedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const CreateProfile = ({
  createProfileFlags,
  createProfileErrors,
  createProfile,
  resetFlags,
  history,
  handleSubmit
}) => {
  const [processing, setProcessing] = useState(false);
  const [gender, setGender] = useState("");
  useEffect(() => {
    if (createProfileErrors && createProfileErrors.createProfile) {
      toast.error(createProfileErrors.createProfile);
      resetFlags();
      setProcessing(false);
    }

    if (createProfileFlags && createProfileFlags.createProfile) {
      resetFlags();
      setProcessing(false);
      toast.success(createProfileFlags.createProfile);
      // history.push("/update-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProfileErrors, createProfileFlags]);

  const handleCreateProfile = formData => {
    setProcessing(true);
    const { age, address, DOB, FatherHusband_Name } = formData;
    createProfile({
      gender: gender,
      age,
      address,
      DOB: moment(DOB).format("YYYY-MM-DD"),
      "Father/Husband_Name": FatherHusband_Name
    });
  };

  const onGenderChange = ({ target }) => {
    setGender(target.value);
  };

  return (
    <div className="auth-page-wrapper">
      <Form
        className="form-container"
        onSubmit={handleSubmit(handleCreateProfile)}
      >
        <div className="form-title">
          <h1>Set Profile</h1>
        </div>
        <Row>
          <Label sm={4}>Gender</Label>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={onGenderChange}
                />{" "}
                Male
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="gender"
                  onChange={onGenderChange}
                  value="female"
                />{" "}
                Female
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  onChange={onGenderChange}
                  name="gender"
                  value="other"
                />
                Other
              </Label>
            </FormGroup>
          </Col>
        </Row>
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

        <div className="button_wrapper">
          <button
            className="custom-btn-primary"
            type="submit"
            disabled={processing}
          >
            Save {processing && <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </div>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.gender) {
    errors.gender = "Field is required";
  }
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

  return errors;
};

const mapStateToProps = state => ({
  createProfileErrors: state.Patient.errors,
  createProfileFlags: state.Patient.flags
});

const mapDispatchToProps = dispatch => ({
  createProfile: payload => {
    dispatch(createProfile(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const CreateProfileComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProfile);

export default reduxForm({
  form: "ProfileForm",
  validate
})(CreateProfileComponent);

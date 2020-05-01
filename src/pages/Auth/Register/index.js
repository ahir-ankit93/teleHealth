import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { getCountries } from "../../../utils/helper";
import {
  Col,
  Row,
  FormGroup,
  Label,
  Input as InputComponent,
  UncontrolledTooltip,
  Form
} from "reactstrap";
import { register, resetFlags } from "../../../redux/actions/AuthAction";
import ValidatedInput from "../../../components/ValidatedInput";
import ValidatedSelect from "../../../components/ValidatedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { COUNTIES } from "../../../utils/constants";

const Register = ({
  authFlags,
  authErrors,
  user,
  register,
  resetFlags,
  history,
  handleSubmit
}) => {
  const [termsChecked, setTerms] = useState(false);
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [processing, setProcessing] = useState(false);
  const [countries] = useState(getCountries());

  useEffect(() => {
    if (authErrors && authErrors.register) {
      toast.error(authErrors.register);
      resetFlags();
      setProcessing(false);
    }

    if (authFlags && authFlags.registerSuccess) {
      resetFlags();
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authErrors, authFlags]);

  const handleCheck = () => {
    setTerms(!termsChecked);
  };

  const handleRegister = formData => {
    if (!termsChecked) {
      toast.error("Please accept terms and conditions");
      return;
    }
    setProcessing(true);
    const {
      fname,
      mname,
      lname,
      street,
      postal_code,
      city,
      state,
      countryVal,
      phone_contact,
      dob,
      race,
      ethnicity,
      username,
      email,
      password
    } = formData;

    const country = COUNTIES.find(country => country.name === countryVal);
    register({
      title: title,
      fname,
      mname,
      lname,
      street,
      postal_code,
      city,
      state,
      country_code: country.code,
      phone_contact,
      dob: moment(dob).format("YYYY-MM-DD"),
      sex: gender,
      race,
      ethnicity,
      username,
      email,
      password
    });
  };

  const onGenderChange = ({ target }) => {
    setGender(target.value);
  };

  const onTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(handleRegister)}>
        <div className="back-btn">
          <Link to="/">Home</Link>
        </div>
        <div className="form-title">
          <h2>New User</h2>
          <p>
            Already a user? <Link to="/login">Log In</Link>
          </p>
        </div>

        <Row>
          <Label sm={4}>Title</Label>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="title"
                  onChange={onTitleChange}
                  value="mr"
                />{" "}
                Mr.
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="title"
                  onChange={onTitleChange}
                  value="ms"
                />{" "}
                Ms.
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="title"
                  onChange={onTitleChange}
                  value="mrs"
                />{" "}
                Mrs.
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="title"
                  onChange={onTitleChange}
                  value="miss"
                />{" "}
                Miss.
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup row>
          <Label sm={4}>First Name</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="fname"
              placeholder="First Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Middle Name</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="mname"
              placeholder="Middle Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Last Name</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="lname"
              placeholder="Last Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Street</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="street"
              placeholder="Street"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Postal Code</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="postal_code"
              placeholder="Postal Code"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>City</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="city"
              placeholder="City"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>State</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="state"
              placeholder="State"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="countrySelect" sm={4}>
            Country of Residence
          </Label>
          <Col sm={8}>
            <Field
              component={ValidatedSelect}
              name="countryVal"
              value={countries[0].name}
              placeholder="Select Country"
              isSearchable={true}
              isClearable={true}
              options={countries}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Phone Number</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="phone_contact"
              placeholder="Phone Number"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="dob" sm={4}>
            Date of Birth
          </Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="date"
              name="dob"
              placeholder="Date of Birth"
            />
          </Col>
        </FormGroup>

        <Row>
          <Label sm={4}>Gender</Label>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="sex"
                  value="male"
                  onChange={onGenderChange}
                />
                Male
              </Label>
            </FormGroup>
          </Col>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <InputComponent
                  type="radio"
                  name="sex"
                  onChange={onGenderChange}
                  value="female"
                />
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
                  name="sex"
                  value="other"
                />
                Other
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup row>
          <Label sm={4}>Race</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="race"
              placeholder="Race"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Ethnicity</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="ethnicity"
              placeholder="Ethnicity"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>User Name</Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="text"
              name="username"
              placeholder="Username"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4} xs={12}>
            Email Address
          </Label>
          <Col sm={8} xs={10}>
            <Field
              component={ValidatedInput}
              type="email"
              name="email"
              placeholder="Email"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} xs={12}>
            Password
          </Label>
          <Col sm={7} xs={10}>
            <Field
              component={ValidatedInput}
              type="password"
              name="password"
              placeholder="Password"
            />
          </Col>
          <div sm={1} xs={2}>
            <span id="password-tooltip">
              <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            <UncontrolledTooltip placement="right" target="password-tooltip">
              Please use at least one upper-case, one lower-case, one numbers,
              and one symbol in your password to make it more secure.
            </UncontrolledTooltip>
          </div>
        </FormGroup>
        <FormGroup row>
          <Label sm={4} xs={12}>
            Confirm Password
          </Label>
          <Col sm={8}>
            <Field
              component={ValidatedInput}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />
          <Label check for="terms-check" sm={1} xs={1}></Label>
          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              check
              type="checkbox"
              id="terms-check"
              name="termsCheck"
              checked={termsChecked}
              onChange={handleCheck}
            />
            <Label check>I AGREE: I have read T & C.</Label>
          </Col>
        </FormGroup>

        <div className="button_wrapper">
          <button
            className="custom-btn-primary"
            type="submit"
            disabled={processing}
          >
            SIGN UP {processing && <FontAwesomeIcon icon={faSpinner} spin />}
          </button>
        </div>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.fname) {
    errors.fname = "Field is required";
  }
  if (!values.mname) {
    errors.mname = "Field is required";
  }
  if (!values.lname) {
    errors.lname = "Field is required";
  }
  if (!values.street) {
    errors.street = "Field is required";
  }
  if (!values.postal_code) {
    errors.postal_code = "Field is required";
  }
  if (!values.city) {
    errors.city = "Field is required";
  }
  if (!values.state) {
    errors.state = "Field is required";
  }
  if (!values.countryVal) {
    errors.countryVal = "Please select the country";
  }
  if (!values.phone_contact) {
    errors.phone_contact = "Field is required";
  }
  if (!values.dob) {
    errors.dob = "Please select Date of birth";
  }
  if (!values.race) {
    errors.race = "Field is required";
  }
  if (!values.ethnicity) {
    errors.ethnicity = "Field is required";
  }
  if (!values.username) {
    errors.username = "Field is required";
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
  if (!values.password) {
    errors.password = "Field is required";
  }
  if (
    values.password &&
    !/^(?=[A-Z])(?=.*?[0-9])(?=.*?[^\w\s]).+$/.test(values.password)
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
  authFlags: state.Auth.flags
});

const mapDispatchToProps = dispatch => ({
  register: payload => {
    dispatch(register(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const RegisterComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default reduxForm({
  form: "RegisterForm",
  validate
})(RegisterComponent);

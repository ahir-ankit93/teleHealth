import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, reset, change } from "redux-form";
import { toast } from "react-toastify";
import {
  Col,
  FormGroup,
  Label,
  Form,
  Row,
  Input as InputComponent
} from "reactstrap";
import {
  savePatientForm,
  resetFlags
} from "../../../redux/actions/PatientAction";
import ValidatedInput from "../../../components/ValidatedInput";
import "./formOne.scss";
// import moment from "moment";
const FormOne = ({
  formOneFlags,
  formOneErrors,
  savePatientForm,
  resetFlags,
  history,
  resetForm,
  dispatch,
  handleSubmit
}) => {
  useEffect(() => {
    if (formOneErrors && formOneErrors.formOne) {
      toast.error(formOneErrors.formOne);
      resetFlags();
    }

    if (formOneFlags && formOneFlags.savePatientForm) {
      resetFlags();
      toast.success(formOneFlags.savePatientForm);
      resetForm("FormOneForm");
      // history.push("/update-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOneErrors, formOneFlags]);

  dispatch(change("FormOneForm", "date", new Date()));

  const handleFormOne = formData => {
    const { patient_signature } = formData;
    savePatientForm({
      form_name: "authorization_form",
      patient_signature
    });
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(handleFormOne)}>
        <div className="back-btn">
          <Link to="/home">Home</Link>
        </div>
        <div className="form-title">
          <h1>Authorization for Release</h1>
        </div>
        <hr />

        <Row className="title-bloc">
          <Col sm={1}></Col>
          <Col sm={10}>
            <h3>
              <i>Medication Assisted Recovery Institute</i>
            </h3>
            <h5>
              <b>2900 N Military Trail, Boca Raton, FL 33431</b>
            </h5>
            <h5>
              <b>AUTHORIZATION FOR RELEASE of PHI</b>
            </h5>
          </Col>
          <Col sm={1}></Col>
        </Row>
        <br />

        <FormGroup row>
          <Label sm={4}>Name</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="name"
              placeholder="Name"
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
          <Label sm={4}>Date(s) of Treatment</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="date_treatment"
              placeholder="Date of treatment"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>I hereby authorize</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="authorize"
              placeholder="Medication Assisted Recovery Institute"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1}></Label>
          <Label sm={8}>To release information in my medical record to:</Label>
          <Label sm={1}></Label>
        </FormGroup>

        <FormGroup row>
          <Label sm={4}>Name</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="rname"
              placeholder="Name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>RELATIOSHIP</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="relation"
              placeholder="Relationship"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Phone</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="number"
              placeholder="Phone Number"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Fax</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="fax"
              placeholder="Fax"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={4}>Address</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="address"
              placeholder="Address"
            />
          </Col>
        </FormGroup>

        <p>
          I understand that my records are protected under Federal
          Confidentiality regulations (42 CFR Part 2), published August 10,
          1987, and the Health Insurance Portability and Accountability Act of
          1996 (P.L. 104-191), 42 U.S.C. Section 1320d, et. Seq and cannot be
          disclosed without my written consent unless otherwise provided for in
          the regulations. I understand that my medical record may contain
          information concerning my psychiatric, psychological, drug or alcohol
          abuse, HIV/Acquired Immune Deficiency Syndrome (AIDS) and/or related
          conditions.
        </p>

        <p>
          I understand that I have the right to revoke this authorization, in
          writing, at any time by sending such written notification to
          Medication Assisted Recovery Institute Privacy Liaison at
          954-915-7444. I understand that revocation is not effective to the
          extent that my treatment professional has relied on the use or
          disclosure of the protected health information or if my authorization
          has relied on the use or disclosure of the protected health
          information or if my authorization was obtained as a condition of
          obtaining insurance coverage and the insurer has a legal right to
          contest a claim.
        </p>
        <h5>
          <u>PROHIBITION ON REDISCLOSURE</u>
        </h5>
        <p>
          This information has been disclosed to you from records protected by
          Federal Law. Federal regulations prohibit making any further
          disclosure of this information unless expressly permitted by written
          consent of the person to whom it pertains or as otherwise permitted by
          CFR 42, part 2. A general authorization for release of medical or
          other information is not sufficient for this purpose.
        </p>

        <FormGroup row>
          <Label sm={4}>Reason for Request:</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="reason"
              placeholder="Reason"
            />
          </Col>
        </FormGroup>

        <h5>I SPECIFICALLY AUTHORIZE RELEASE OF THE FOLLOWING:</h5>

        <FormGroup row>
          <Label sm={1} xs={2} />
          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              id="medical_history_physical_exam"
              name="medical_history_physical_exam"
              value="med_his_pe"
            />
            <Label for="medical_history_physical_exam" check>
              Medical History & Physical Examination
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              id="progress_notes"
              name="progress_notes"
              value="prog_notes"
            />
            <Label for="progress_notes" check>
              Progress Notes
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              id="staff_conference"
              name="staff_conference"
              value="staff_conf"
            />
            <Label check for="staff_conference">
              Staff conference/Treatment Plans & reviews
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="discharge_summary"
              value="dis_sum"
            />
            <Label check for="discharge_summary">
              Discharge Summary
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="consultation_reports"
              value="cons_repo"
            />
            <Label check for="consultation_reports">
              Consultation Reports
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent type="checkbox" name="other" value="other" />
            <Label check for="other">
              Other: Copies as needed for treatment
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="entire_contents"
              value="entire_cont"
            />
            <Label check for="entire_contents">
              Entire Contents of my Patient Chart
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="admission_eval"
              value="adm_eval"
            />
            <Label check for="admission_eval">
              Admission/Evaluation Summary (ies)
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="psychological_evaluation"
              value="psych_eval"
            />
            <Label check for="psychological_evaluation">
              Psychological Evaluation
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="physicians_orders"
              value="phy_orders"
            />
            <Label check for="physicians_orders">
              Physicians Orders
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="discharge_treatment_summary"
              value="dis_treat_sum"
            />
            <Label check for="discharge_treatment_summary">
              Discharge Treatment Summary
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="laboratory_x_ray_reports"
              value="lab_x_ray"
            />
            <Label check for="laboratory_x_ray_reports">
              Laboratory & X-ray reports
            </Label>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="acknowledgement_presense"
              value="ackn"
            />
            <Label check for="acknowledgement_presense">
              Acknowledgement of Presence
            </Label>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={1} xs={2} />

          <Col sm={{ size: 10 }} xs={{ size: 8 }}>
            <InputComponent
              type="checkbox"
              name="disclosure_treatment"
              value="disc"
            />
            <Label check for="disclosure_treatment">
              Disclosure of Treatment Progress
            </Label>
          </Col>
        </FormGroup>

        <p>
          This authorization is valid for 1 year from date of signature. I may
          revoke this authorization at any time upon written notice to
          Medication Assisted Recovery Institute. I acknowledge that such
          revocation if Medication Assisted Recovery Institute: has already
          acted in reliance upon this authorization. I hereby release Medication
          Assisted Recovery Institute: from any liability which may arise as a
          result of the use of the information released in accordance with this
          authorization.
        </p>

        <FormGroup row>
          <Label sm={4}>Signature of Patient</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="signature"
              placeholder="Signature"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={3}>Date</Label>
          <Col sm={9}>
            <Field
              component={ValidatedInput}
              type="text"
              name="date"
              disabled={true}
              placeholder="Date Signature"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4}>Witness</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="witness"
              placeholder="Witness"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={3}>Date</Label>
          <Col sm={9}>
            <Field
              component={ValidatedInput}
              type="text"
              name="date"
              disabled={true}
              placeholder="Date"
            />
          </Col>
        </FormGroup>

        {/* <FormGroup row>
          <Label sm={3}> test Date</Label>
          <Col sm={9}>
            <Field
              component={ValidatedInput}
              type="text"
              name="date"
              disabled={true}
              placeholder="Date"
            />
          </Col>
        </FormGroup> */}

        <FormGroup row>
          <Label sm={12}>I REVOKE THIS ATHORIZATION FOR RELEASE DATE: </Label>
          <Label sm={7}></Label>
          <Col sm={4}>
            <Field
              component={ValidatedInput}
              type="date"
              name="date1"
              disabled={true}
              placeholder="Date"
            />
          </Col>
        </FormGroup>

        <FormGroup row className="signature">
          <Label sm={4}>SIGNATURE: </Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="patient_signature"
              placeholder="Signature"
            />
          </Col>
        </FormGroup>
        <br />
        <div className="button_wrapper">
          <button className="custom-btn-primary" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.patient_signature) {
    errors.patient_signature = "Field is required";
  }
  return errors;
};

const mapStateToProps = state => ({
  formOneErrors: state.Patient.errors,
  formOneFlags: state.Patient.flags
});

const mapDispatchToProps = dispatch => ({
  savePatientForm: payload => {
    dispatch(savePatientForm(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: FormOneForm => {
    dispatch(reset(FormOneForm));
  }
});

const FormOneComponent = connect(mapStateToProps, mapDispatchToProps)(FormOne);

export default reduxForm({
  form: "FormOneForm",
  validate
})(FormOneComponent);

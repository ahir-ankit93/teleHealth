import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, reset, change } from "redux-form";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Form, Row } from "reactstrap";
import {
  savePatientForm,
  resetFlags
} from "../../../redux/actions/PatientAction";
import ValidatedInput from "../../../components/ValidatedInput";
import "./formTwo.scss";
// import moment from "moment";
const FormTwo = ({
  formTwoFlags,
  formTwoErrors,
  savePatientForm,
  resetFlags,
  history,
  dispatch,
  resetForm,
  handleSubmit
}) => {
  useEffect(() => {
    if (formTwoErrors && formTwoErrors.formTwo) {
      toast.error(formTwoErrors.formTwo);
      resetFlags();
    }

    if (formTwoFlags && formTwoFlags.savePatientForm) {
      resetFlags();
      toast.success(formTwoFlags.savePatientForm);
      resetForm("FormTwoForm");
      // history.push("/update-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formTwoErrors, formTwoFlags]);

  dispatch(change("FormTwoForm", "date", new Date()));

  const handleFormTwo = formData => {
    const { patient_signature } = formData;
    savePatientForm({
      form_name: "consent_form",
      patient_signature
    });
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(handleFormTwo)}>
        <div className="back-btn">
          <Link to="/home">Home</Link>
        </div>
        <div className="form-title">
          <h1>Consent to Treatment</h1>
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
              <b>CONSENT TO TREATMENT</b>
            </h5>
          </Col>
          <Col sm={1}></Col>
        </Row>
        <br />

        <p>
          I authorize Medication Assisted Recovery Institute, LLC to assess,
          evaluate, treat and perform all clinical services deemed necessary, in
          the evaluation and/or treatment of chemical dependency and diagnosed
          co-occurring disorder. It is the intention of Medication Assisted
          Recovery Institute to provide substance abuse and dual diagnosis
          treatment for patients who desire and can benefit from these services.
          Prior to beginning treatment, we would like to inform you of
          conditions that may have an effect on your clinical relationship with
          Medication Assisted Recovery Institute. Your signature below indicates
          that you have read and understand these conditions.
        </p>

        <h6>
          <u>Your Treatment Team:</u>
        </h6>
        <p>
          This facilities providers are licensed or certified with the State of
          Florida Department of Business and Professional Regulations. We take
          special care in hiring clinicians that understand the unique needs of
          the substance abuse population. Additionally, the agency may provide
          training to qualified students of addiction, medical or mental health
          fields. These students are enrolled in training programs and are
          provided supervision by a licensed or certified clinician.
        </p>

        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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
        <h6>
          <u>Confidentiality:</u>
        </h6>
        <p>
          Everything said to a clinician is considered confidential, within the
          bounds of the treatment team. However, there are limitations to this
          confidentiality which are dictated by State Law. These limitations
          are: 1) Receipt of a Court Order from a Judge requiring the release of
          the information specified by the Court Order; 2) Statements of intent
          to harm oneself or another person may result in the notification of
          the appropriate authorities and/or the intended victim; 3) Information
          regarding suspected child, disabled adult, or elderly adult abuse or
          neglect must be reported as mandated by Florida Statutes; 4)
          Information regarding treatment of a minor without parental consent
          may be shared with the parent(s), legal guardian, or legal
          authorities; or 5) If the patients brings suit against this agency.
        </p>

        <p>
          Additionally, information may be shared in supervision or in case
          conference among the mental health staff only for purposes of
          treatment planning. If applicable, case files may be reviewed and
          other treatment information provided to representatives of a third
          party payer, (e.g.: Medicare, Insurance Company, etc.). Certain
          demographic data, (address, age, appointment dates, benefits, etc.),
          may be provided to other facility employees in order to assist in
          providing services to you. This data is discrete in nature, and will
          not include personal things you discuss in treatment.
        </p>
        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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

        <h6>
          <u>Urine Toxicology/ Blood Test/Breathalyzer:</u>
        </h6>
        <p>
          I agree to submit to every request for urine sample and/or
          Breathalyzer. I am aware that positive test results will be discussed
          as part of my treatment. I know that if I refuse to comply, I may be
          discharged from the treatment program. A staff member of the same sex
          may observe the collection of a urine specimen. Be advised that for
          your convenience and optimal screening, in addition to CLIA instant
          drug testing at our facility, Medication Assisted Recovery Institute
          sends urines and blood tests out to non-affiliate companies.
          Medication Assisted Recovery Institute will submit demographics as
          well as insurance billing information if applicable. You may notify us
          if you do not wish to use your insurance for such testing. I am aware
          that a urine toxicology screening is to help in the diagnosis of
          chemical dependency, and to insure compliance with my treatment plan
          and program rules. I will always be given an explanation of the
          results, and consequences will be discussed with me. I know I have the
          right, at my expense, to have any positive urine re-tested. I
          understand that this whole procedure and the results are confidential,
          and protected under Federal Law. These results could be reported to
          the person/ organization that I give written consent to, or without my
          consent if treatment was court ordered or the results are otherwise
          ordered by law.
        </p>

        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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

        <h6>
          <u>Security Cameras:</u>
        </h6>
        <p>
          For purposes of security and protection, security cameras have been
          installed in some hallways, entrances, and common areas. Cameras are
          not located within therapy rooms, individual offices, bathrooms, or
          areas where confidential information is likely to be divulged.
          Additionally, security cameras are not viewed or shared outside of
          MARI, except law enforcement personal should a crime occur. Footage is
          erased on a regular basis.
        </p>

        <h6>
          <u>Photography:</u>
        </h6>
        <p>
          For the purpose of patient identification within our facility a
          photograph will be taken and placed in your patient chart.
        </p>

        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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

        <h6>
          <u>Patient and Service Provider Rights and Responsibilities:</u>
        </h6>
        <p>
          There are certain things we expect of our patients and certain things
          you should expect of us. We have written the most obvious in the{" "}
          <b>Program Rules</b> and <b>Patients Rights& Responsibilities.</b> If
          you have any questions about this document, please ask your therapist.
          By signing below, you acknowledge receipt of this document and that
          you have been provided an orientation to the program.{" "}
        </p>

        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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

        <p>
          I recognize that by signing this document, I voluntarily consent to
          the assessment and treatment provided by MARI. I hereby willingly
          authorize Medication Assisted Recovery Institute to provide treatment
          including, without limitation, medical; evaluative and
          psychotherapeutic services. Such services shall continue in full force
          and in effect even if the clinician leaves the employment of the
          Agency. I have had the Consent to Treatment clearly explained. I
          further acknowledge that a copy of this document has been offered and
          has been <b>accepted</b> or <b>declined.</b>
        </p>

        <FormGroup row>
          <Label sm={4}>Patient Signature:</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="patient_signature"
              placeholder="Signature"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={3}>Date:</Label>
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

        <FormGroup row>
          <Label sm={4}>Staff Signature:</Label>
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
          <Label sm={3}>Date:</Label>
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
  formTwoErrors: state.Patient.errors,
  formTwoFlags: state.Patient.flags
});

const mapDispatchToProps = dispatch => ({
  savePatientForm: payload => {
    dispatch(savePatientForm(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: FormTwoForm => {
    dispatch(reset(FormTwoForm));
  }
});

const FormTwoComponent = connect(mapStateToProps, mapDispatchToProps)(FormTwo);

export default reduxForm({
  form: "FormTwoForm",
  validate
})(FormTwoComponent);

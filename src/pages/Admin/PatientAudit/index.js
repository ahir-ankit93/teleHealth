import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import "./patientAudit.scss";
import {
  Form,
  Table,
  FormGroup,
  Label,
  Input as InputComponent
} from "reactstrap";
import {
  auditQuestions,
  auditAnswers,
  savePatientAuditForm,
  resetFlags
} from "../../../redux/actions/PatientAction";
import { toast } from "react-toastify";
import PageLoader from "../../../components/PageLoader";
import AuditPatients from "./auditPatients";

const PatientAudit = ({
  patientAuditFlags,
  patientAuditErrors,
  auditQuestions,
  patientAuditAnswerErrors,
  patientAuditAnswerFlags,
  auditAnswers,
  formQuestions,
  formAnswers,
  patientAuditFormErrors,
  patientAuditFormFlags,
  userDetails,
  resetFlags,
  history,
  resetForm,
  dispatch,
  handleSubmit,
  savePatientAuditForm

  // savePatientAuditMessage
}) => {
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [pastData, setPastData] = useState(null);

  const handleChange = ({ target: { value, checked } }) => {
    setPastData(value);
  };

  useEffect(() => {
    auditQuestions();
    auditAnswers();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (patientAuditErrors && patientAuditErrors.auditQuestions) {
      toast.error(patientAuditErrors.auditQuestions);
      resetFlags();
    }

    if (
      (patientAuditFlags && patientAuditFlags.auditQuestions) ||
      (patientAuditAnswerFlags && patientAuditAnswerFlags.auditAnswers)
    ) {
      setLoading(false);
      resetFlags();
      const allQuestions = formQuestions.map(question => ({
        ...question,
        answers: formAnswers.filter(answer => answer.question === question.id),
        selected: null
      }));
      setAllQuestions(allQuestions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    patientAuditErrors,
    patientAuditFlags,
    patientAuditAnswerErrors,
    patientAuditAnswerFlags
  ]);

  useEffect(() => {
    if (patientAuditFormErrors && patientAuditFormErrors.savePatientAuditForm) {
      toast.error(patientAuditFormErrors.savePatientAuditForm);
      resetFlags();
    }

    if (patientAuditFormFlags && patientAuditFormFlags.savePatientAuditForm) {
      resetFlags();
      toast.success(patientAuditFormFlags.savePatientAuditForm);

      let setQue = allQuestions.map(question => ({
        ...question,
        selected: null
      }));
      setAllQuestions(setQue);

      history.push("/audit-reports");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientAuditFormErrors, patientAuditFormFlags]);

  const handleAnswerChange = ({ target: { value, checked } }, id) => {
    let que = allQuestions.findIndex(question => question.id === id);
    const questions = allQuestions;
    const question = questions[que];
    if (question.selected === value) {
      question.selected = null;
    } else {
      question.selected = value;
    }
    questions[que] = question;

    setAllQuestions([...questions]);
  };

  const handleSavePatientAuditForm = id => {
    let totalScore = 0;
    let answersList = {};
    const filter = allQuestions.filter(question => !question.selected);
    if (filter.length) {
      return toast.error("Please answers to all questions!");
    }

    allQuestions.forEach(question => {
      if (question.selected) {
        totalScore += +question.selected;
      }
    });

    allQuestions.forEach(question => {
      answersList[question.id] = question.selected;
    });

    if (pastData) {
      savePatientAuditForm({
        score: totalScore,
        patient_id: pastData,
        answers_list: answersList
      });
    } else {
      toast.error("Please select any Patient!");
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="auth-page-wrapper" style={{ maxWidth: "850px" }}>
      <Form className="form-container" style={{ maxWidth: "800px" }}>
        <div className="back-btn">
          <Link to="/audit-reports">Back</Link>
        </div>
        <div className="form-title">
          <h1>Patient Audit Form</h1>
        </div>

        <AuditPatients handleChange={handleChange} pastData={pastData} />
        <hr />

        {allQuestions && allQuestions.length ? (
          <Table borderless responsive>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {allQuestions && (
                <React.Fragment>
                  {allQuestions.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {result.question}
                        <tbody size="sm">
                          <React.Fragment>
                            {result.answers.map((resultAnswer, index1) => (
                              <tr key={index1} className="tdManage">
                                <td className="tdManage">
                                  <FormGroup row className="tdManage">
                                    <InputComponent
                                      className="checkboxForm"
                                      type="checkbox"
                                      value={resultAnswer.value}
                                      checked={
                                        resultAnswer.value === result.selected
                                      }
                                      onChange={e =>
                                        handleAnswerChange(e, result.id)
                                      }
                                    />
                                    <Label check className="labelManage">
                                      {" "}
                                      {resultAnswer.answers}
                                    </Label>
                                  </FormGroup>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        </tbody>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </Table>
        ) : (
          <h1>No data found</h1>
        )}

        <div className="button_wrapper">
          <button
            className="custom-btn-primary"
            type="submit"
            onClick={handleSubmit(handleSavePatientAuditForm)}
          >
            Submit
          </button>
        </div>
      </Form>
      <br />
    </div>
  );
};

const mapStateToProps = state => ({
  patientAuditErrors: state.Patient.errors,
  patientAuditFlags: state.Patient.flags,
  formQuestions: state.Patient.questions,
  patientAuditAnswerErrors: state.Patient.errors,
  patientAuditAnswerFlags: state.Patient.flags,
  patientAuditFormFlags: state.Patient.flags,
  patientAuditFormErrors: state.Patient.errors,

  // savePatientAuditMessage: state.Patient.savePatientAuditForm,
  formAnswers: state.Patient.answers,
  userDetails: state.Auth.userDetails
});

const mapDispatchToProps = dispatch => ({
  auditQuestions: payload => {
    dispatch(auditQuestions(payload));
  },
  auditAnswers: payload => {
    dispatch(auditAnswers(payload));
  },
  savePatientAuditForm: payload => {
    dispatch(savePatientAuditForm(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const PatientAuditComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientAudit);

export default reduxForm({
  form: "PatientAuditForm"
})(PatientAuditComponent);

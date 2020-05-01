import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  Form,
  Table,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
  Input as InputComponent
} from "reactstrap";
import {
  auditQuestions,
  auditAnswers,
  resetFlags
} from "../../redux/actions/PatientAction";
import { toast } from "react-toastify";
import "./auditReports.scss";
import PageLoader from "../../components/PageLoader";
const AuditReportsModal = ({
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
  className,
  toggle,
  open,
  result,
  history,
  dispatch
}) => {
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  useEffect(() => {
    if (result) {
      auditQuestions();
      auditAnswers();
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

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
      if (!result || !result.answers_list) return;
      const allQuestions = formQuestions.map(question => {
        const ans = JSON.parse(result.answers_list)[question.id];
        return {
          ...question,
          answers: formAnswers.filter(
            answer => answer.question === question.id
          ),
          selected: ans
        };
      });

      setAllQuestions(allQuestions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    patientAuditErrors,
    patientAuditFlags,
    patientAuditAnswerErrors,
    patientAuditAnswerFlags
  ]);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle} className={className} size="lg">
        <ModalHeader toggle={toggle} className="headingManage">
          Patient Audit Form &nbsp;(&nbsp;{result.patient_name}&nbsp;)&nbsp;
        </ModalHeader>

        <ModalBody>
          <Form className="form-container">
            {allQuestions && allQuestions.length ? (
              <Table borderless responsive>
                <thead>
                  <tr>
                    <th className="headingManage">Sr.No</th>
                    <th className="headingManage">Question</th>
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
                                            resultAnswer.value ===
                                            result.selected
                                          }
                                          disabled={true}
                                        />
                                        <Label check className="labelManage">
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
          </Form>

          <ModalFooter style={{ flexWrap: "wrap" }}>
            <Label sm={3} xs={3} className="hmf">
              Patient Name{" "}
            </Label>
            <Label sm={1} xs={1} className="hmf">
              :
            </Label>
            <Label sm={7} xs={7} className="hmf">
              {result.patient_name}
            </Label>
            <br />
            <Label sm={3} xs={3} className="hmf">
              Score
            </Label>
            <Label sm={1} xs={1} className="hmf">
              :
            </Label>
            <Label sm={7} xs={7} className="hmf">
              {result.score}
            </Label>
            <br />
            <div className="futManage">
              A score of 8 or more is associated with harmful or hazardous
              drinking,
              <br />A score of 13 or more in women, and 15 or more in men, is
              likely to indicate alcohol dependence.
            </div>
            <br />
            <hr />
            <Button color="secondary" onClick={toggle}>
              Close
            </Button>
            <br />
          </ModalFooter>
        </ModalBody>
      </Modal>
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
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const AuditReportsModalComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditReportsModal);

export default reduxForm({
  form: "AuditReportsModalForm"
})(AuditReportsModalComponent);

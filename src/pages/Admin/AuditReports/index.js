import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { Form, Table, Col, FormGroup } from "reactstrap";
import {
  getPatientsAudit,
  resetFlags
} from "../../../redux/actions/AdminAction";
import AuditReportsModal from "../../../components/AuditReportsModal";
import PageLoader from "../../../components/PageLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const AuditReports = ({
  getPatientsAuditFlags,
  getPatientsAuditErrors,
  getPatientsAudit,
  auditReports,
  resetFlags,
  history,
  handleSubmit,
  handleChange,
  pastData,
  users
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, toggle] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    getPatientsAudit();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getPatientsAuditErrors && getPatientsAuditErrors.getPatientsAudit) {
      toast.error(getPatientsAuditErrors.getPatientsAudit);
      resetFlags();
    }

    if (getPatientsAuditFlags && getPatientsAuditFlags.getPatientsAudit) {
      setLoading(false);
      resetFlags();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPatientsAuditErrors, getPatientsAuditFlags]);

  const handleAuditForm = () => {
    history.push("/patient-audit-form");
  };

  const handleViewUser = (e, result) => {
    e.preventDefault();
    handleToggle();
    setResult(result);
  };

  const handleToggle = () => {
    toggle(!isOpen);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container">
      <Form className="container">
        <div className="form-title">
          <h1>Audit Reports</h1>
        </div>
        <AuditReportsModal
          toggle={handleToggle}
          open={isOpen}
          result={result}
        />
        <FormGroup row>
          <Col sm={9}></Col>
          <Col sm={2}>
            <div className="button_wrapper">
              <button
                className="custom-btn-primary"
                type="submit"
                onClick={handleSubmit(handleAuditForm)}
              >
                Add New
              </button>
            </div>
          </Col>
          <Col sm={1}></Col>
        </FormGroup>

        {auditReports && auditReports.length ? (
          <Table hover>
            <thead>
              <tr className="headerHeading">
                <th>Sr.No</th>
                <th>Patient Name</th>
                <th>Report Status</th>
                <th>Score</th>
                <th>
                  Action &nbsp; <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {auditReports.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.patient_name}</td>
                  <td className="font-weight-bold">{result.report_status}</td>
                  <td>{result.score}</td>
                  <td>
                    <button
                      className="btn-primary btn-sm"
                      onClick={e => handleViewUser(e, result)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h3>No data found</h3>
        )}
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  return errors;
};

const mapStateToProps = state => ({
  getPatientsAuditErrors: state.Admin.errors,
  getPatientsAuditFlags: state.Admin.flags,
  auditReports: state.Admin.patientsAudit
});

const mapDispatchToProps = dispatch => ({
  getPatientsAudit: payload => {
    dispatch(getPatientsAudit(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const AuditReportsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditReports);

export default reduxForm({
  form: "AuditReportsForm",
  validate
})(AuditReportsComponent);

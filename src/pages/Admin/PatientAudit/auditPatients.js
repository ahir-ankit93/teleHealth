import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import moment from "moment";
import { toast } from "react-toastify";
import {
  Col,
  FormGroup,
  Table,
  Form,
  Input as InputComponent
} from "reactstrap";
import { auditPatients, resetFlags } from "../../../redux/actions/AdminAction";
import PageLoader from "../../../components/PageLoader";

const AuditPatients = ({
  auditPatientsFlags,
  auditPatientsErrors,
  auditPatients,
  dispatch,
  resetFlags,
  history,
  handleSubmit,
  searchResults,
  handleChange,
  pastData
}) => {
  const getChecked = id => {
    return parseInt(pastData) === parseInt(id);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auditPatients();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (auditPatientsErrors && auditPatientsErrors.auditPatients) {
      toast.error(auditPatientsErrors.auditPatients);
      resetFlags();
    }

    if (auditPatientsFlags && auditPatientsFlags.auditPatients) {
      resetFlags();
      toast.success(auditPatientsFlags.auditPatients);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auditPatientsErrors, auditPatientsFlags]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container" style={{ padding: "0px" }}>
      <div className="form-title">
        <h2>Audit Patients</h2>
      </div>
      <Form>
        <FormGroup row>
          <Col sm={12}>
            {searchResults && searchResults.length ? (
              <Table hover>
                <thead>
                  <tr className="headerHeading">
                    <th>Sr.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Join</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <InputComponent
                          type="checkbox"
                          value={result.id}
                          checked={getChecked(result.id)}
                          onChange={handleChange}
                        />
                        {index + 1}
                      </td>
                      <td>{result.first_name}</td>
                      <td>{result.last_name}</td>
                      <td>{moment(result.date_joined).format("MM-DD-YYYY")}</td>
                      <td>{result.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h3>No data found</h3>
            )}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  // if (!values.name && !values.provider_type) {
  //   errors.provider_type = "Please enter name or select provider types";
  // }

  return errors;
};

const mapStateToProps = state => ({
  auditPatientsErrors: state.Admin.errors,
  auditPatientsFlags: state.Admin.flags,
  searchResults: state.Admin.auditPatients
});

const mapDispatchToProps = dispatch => ({
  auditPatients: payload => {
    dispatch(auditPatients(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const AuditPatientsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuditPatients);

export default reduxForm({
  form: "AuditPatientsForm",
  validate
})(AuditPatientsComponent);

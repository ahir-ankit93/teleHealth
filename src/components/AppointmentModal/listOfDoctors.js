import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { toast } from "react-toastify";
import {
  Col,
  FormGroup,
  Table,
  Form,
  Input as InputComponent
} from "reactstrap";
import { listOfDoctors, resetFlags } from "../../redux/actions/PatientAction";
import "./searchDoctor.scss";
import PageLoader from "../../components/PageLoader";

const ListOfDoctors = ({
  listOfDoctorsFlags,
  listOfDoctorsErrors,
  listOfDoctors,
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
    listOfDoctors();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (listOfDoctorsErrors && listOfDoctorsErrors.listOfDoctors) {
      toast.error(listOfDoctorsErrors.listOfDoctors);
      resetFlags();
    }

    if (listOfDoctorsFlags && listOfDoctorsFlags.listOfDoctors) {
      resetFlags();
      toast.success(listOfDoctorsFlags.listOfDoctors);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOfDoctorsErrors, listOfDoctorsFlags]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container">
      <div className="form-title">
        <h2>List Of Doctors</h2>
      </div>
      <Form>
        <FormGroup row>
          <Col sm={12}>
            {searchResults && searchResults.length ? (
              <Table hover>
                <thead>
                  <tr className="headerHeading1">
                    <th>Sr.No</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Physician Type</th>
                    <th>Facility</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <InputComponent
                          type="checkbox"
                          name="myPastAppointment"
                          value={result.id}
                          checked={getChecked(result.id)}
                          onChange={handleChange}
                        />
                        {index + 1}
                      </td>
                      <td>{result.username}</td>
                      <td>{result.fname}</td>
                      <td>{result.lname}</td>
                      <td>{result.physician_type}</td>
                      <td>{result.facility}</td>
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

  return errors;
};

const mapStateToProps = state => ({
  listOfDoctorsErrors: state.Patient.errors,
  listOfDoctorsFlags: state.Patient.flags,
  searchResults: state.Patient.listOfDoctors
});

const mapDispatchToProps = dispatch => ({
  listOfDoctors: payload => {
    dispatch(listOfDoctors(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const ListOfDoctorsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListOfDoctors);

export default reduxForm({
  form: "ListOfDoctorsForm",
  validate
})(ListOfDoctorsComponent);

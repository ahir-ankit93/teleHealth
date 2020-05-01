import React, { useEffect, useState } from "react";
import "./adminLandingPage.scss";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Col, Form, Row, Table } from "reactstrap";
import { Card, CardTitle, CardHeader, CardBody } from "reactstrap";

import {
  getAllAppointments,
  getAllUsersForms,
  approvePatientForm,
  resetFlags
} from "../../../redux/actions/AdminAction";
import PageLoader from "../../../components/PageLoader";
import moment from "moment";
const AdminLandingPage = ({
  getAllAppointmentsErrors,
  getAllAppointmentsFlags,
  getAllAppointments,
  UpcomingAppointments,
  PastAppointments,
  todaysAppointment,
  thisWeekAppointment,
  getAllUsersFormsErrors,
  getAllUsersFormsFlags,
  getAllUsersForms,
  AllUsersForms,
  approvePatientFormErrors,
  approvePatientFormFlags,
  approvePatientForm,
  resetFlags,
  history,
  handleSubmit
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAppointments();
    getAllUsersForms();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      getAllAppointmentsErrors &&
      getAllAppointmentsErrors.getAllAppointments
    ) {
      toast.error(getAllAppointmentsErrors.getAllAppointments);
      resetFlags();
    }

    if (getAllAppointmentsFlags && getAllAppointmentsFlags.getAllAppointments) {
      setLoading(false);
      resetFlags();
      // toast.success(getUserAppointmentsFlags.getUserAppointments);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllAppointmentsErrors, getAllAppointmentsFlags]);

  useEffect(() => {
    if (getAllUsersFormsErrors && getAllUsersFormsErrors.getAllUsersForms) {
      toast.error(getAllUsersFormsErrors.getAllUsersForms);
      resetFlags();
    }

    if (getAllUsersFormsFlags && getAllUsersFormsFlags.getAllUsersForms) {
      setLoading(false);
      resetFlags();
      // toast.success(getUserAppointmentsFlags.getUserAppointments);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllUsersFormsErrors, getAllUsersFormsFlags]);

  useEffect(() => {
    if (
      approvePatientFormErrors &&
      approvePatientFormErrors.approvePatientForm
    ) {
      toast.error(approvePatientFormErrors.approvePatientForm);
      resetFlags();
    }

    if (approvePatientFormFlags && approvePatientFormFlags.approvePatientForm) {
      setLoading(false);
      resetFlags();
      toast.success(approvePatientFormFlags.approvePatientForm);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvePatientFormErrors, approvePatientFormFlags]);

  const handleApprovePatientForm = (e, id, patient_id) => {
    e.preventDefault();
    approvePatientForm({
      form_id: id,
      patient_id
    });
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className=" container align-items-center">
      <Form>
        <Row>
          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">
                Today's Appointments
              </CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                {todaysAppointment && todaysAppointment.length ? (
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="headingManage">Sr.No</th>
                        <th className="headingManage">Event Date</th>
                        <th className="headingManage">Start Time</th>
                        <th className="headingManage">Facility Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todaysAppointment && (
                        <React.Fragment>
                          {todaysAppointment.map((result, index1) => (
                            <tr key={index1}>
                              <td>{index1 + 1}</td>
                              <td>
                                {moment(result.pc_eventDate).format(
                                  "MM-DD-YYYY"
                                )}
                              </td>
                              <td>{result.pc_startTime}</td>
                              <td>{result.facility_name}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <h3>No data found</h3>
                )}
              </CardBody>
              {/* <Button className="border">View</Button> */}
            </Card>
          </Col>

          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">
                This Week's Appointments
              </CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                {thisWeekAppointment && thisWeekAppointment.length ? (
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="headingManage">Sr.No</th>
                        <th className="headingManage">Event Date</th>
                        <th className="headingManage">Start Time</th>
                        <th className="headingManage">Facility Name</th>
                      </tr>
                    </thead>

                    <tbody>
                      {thisWeekAppointment && (
                        <React.Fragment>
                          {thisWeekAppointment.map((result, index1) => (
                            <tr key={index1}>
                              <td>{index1 + 1}</td>
                              <td>
                                {moment(result.pc_eventDate).format(
                                  "MM-DD-YYYY"
                                )}
                              </td>
                              <td>{result.pc_startTime}</td>
                              <td>{result.facility_name}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <h3>No data found</h3>
                )}
              </CardBody>
              {/* <Button className="border">View</Button> */}
            </Card>
          </Col>
          <br />
        </Row>
        <br />
        <Row>
          <Col sm="12">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">
                Patient consent forms for approval
              </CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="align-items-center align-content-center padManage card-body-inner">
                {AllUsersForms && AllUsersForms.length ? (
                  <Table hover>
                    <thead>
                      <tr>
                        <th className="headingManage">Sr.No</th>
                        <th className="headingManage">Username</th>
                        <th className="headingManage">Form Name</th>
                        <th className="headingManage">Form Status</th>
                        <th className="headingManage">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllUsersForms && (
                        <React.Fragment>
                          {AllUsersForms.map((result, index1) => (
                            <tr key={index1}>
                              <td>{index1 + 1}</td>
                              <td>{result.user}</td>
                              <td>{result.form_name}</td>
                              <td>{result.form_status}</td>
                              <td>
                                {result.form_status === "Approved" ? (
                                  <button
                                    className="btn-success btn-sm"
                                    disabled
                                  >
                                    Approved
                                  </button>
                                ) : (
                                  <button
                                    className="btn-primary btn-sm"
                                    onClick={e =>
                                      handleApprovePatientForm(
                                        e,
                                        result.id,
                                        result.user_id
                                      )
                                    }
                                  >
                                    Approve
                                  </button>
                                )}
                              </td>
                              {/* (result.form_status === "Approved" ?) */}
                            </tr>
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </Table>
                ) : (
                  <h3>No data found</h3>
                )}
              </CardBody>
            </Card>
          </Col>
          <br />
        </Row>
        <br /> <br />
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
  getAllAppointmentsErrors: state.Admin.errors,
  getAllAppointmentsFlags: state.Admin.flags,
  UpcomingAppointments: state.Admin.UpcomingAppointments,
  PastAppointments: state.Admin.PastAppointments,
  thisWeekAppointment: state.Admin.thisWeekAppointment,
  todaysAppointment: state.Admin.todaysAppointment,
  getAllUsersFormsErrors: state.Admin.errors,
  getAllUsersFormsFlags: state.Admin.flags,
  AllUsersForms: state.Admin.getAllUsersForms,
  approvePatientFormErrors: state.Admin.errors,
  approvePatientFormFlags: state.Admin.flags
});

const mapDispatchToProps = dispatch => ({
  getAllAppointments: payload => {
    dispatch(getAllAppointments(payload));
  },
  getAllUsersForms: payload => {
    dispatch(getAllUsersForms(payload));
  },
  approvePatientForm: payload => {
    dispatch(approvePatientForm(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const AdminLandingPageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLandingPage);

export default reduxForm({
  form: "AdminLandingPageForm",
  validate
})(AdminLandingPageComponent);

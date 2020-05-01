import React, { useEffect, useState } from "react";
import "./patientlandingpage.scss";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import {
  Col,
  FormGroup,
  Form,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Table,
  Label,
  Input as InputComponent
} from "reactstrap";
import classnames from "classnames";
import moment from "moment";
import {
  getUserAppointments,
  getAppointmentDetails,
  resetFlags
} from "../../../redux/actions/PatientAction";
import PageLoader from "../../../components/PageLoader";
const PatientLandingPage = ({
  getUserAppointmentsErrors,
  getUserAppointmentsFlags,
  getUserAppointments,
  getPastUserAppointments,
  getAppointmentDetailsErrors,
  getAppointmentDetailsFlags,
  getAppointmentDetails,
  getUser,
  userDetails,
  MyAppointments,
  MyPastAppointments,
  AppointmentDetails,
  resetFlags,
  history,
  handleSubmit,
  getUserDetails,
  getAppointmentSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [pastData, setPastData] = useState(null);
  const [pastFormData, setPastFromData] = useState(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (getUserDetails) {
      getUserAppointments({ p_id: getUser.pid });
    }
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserDetails]);

  useEffect(() => {
    if (
      getUserAppointmentsErrors &&
      getUserAppointmentsErrors.getUserAppointments
    ) {
      toast.error(getUserAppointmentsErrors.getUserAppointments);
      resetFlags();
    }

    if (
      getUserAppointmentsFlags &&
      getUserAppointmentsFlags.getUserAppointments
    ) {
      setLoading(false);
      resetFlags();
      // toast.success(getUserAppointmentsFlags.getUserAppointments);
    }

    if (
      getUserAppointmentsErrors &&
      getUserAppointmentsErrors.getPastUserAppointments
    ) {
      toast.error(getUserAppointmentsErrors.getPastUserAppointments);
      resetFlags();
    }

    if (
      getUserAppointmentsFlags &&
      getUserAppointmentsFlags.getPastUserAppointments
    ) {
      resetFlags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserAppointmentsErrors, getUserAppointmentsFlags]);

  useEffect(() => {
    if (
      getAppointmentDetailsErrors &&
      getAppointmentDetailsErrors.getAppointmentDetails
    ) {
      toast.error(getAppointmentDetailsErrors.getAppointmentDetails);
      resetFlags();
    }

    if (getAppointmentSuccess) {
      setLoading(false);
      resetFlags();
      toggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAppointmentDetailsErrors, getAppointmentSuccess]);

  const getChecked = id => {
    return pastData === id;
  };

  const handleChange = ({ target: { value, checked } }) => {
    setPastData(value);
  };

  const handleView = id => {
    if (pastData) {
      getAppointmentDetails({ appointment_id: pastData });
      if (getAppointmentSuccess) {
        toggle();
      }
    } else {
      toast.error("Please select any visit for more detail ");
    }
    return;
  };

  const getFormChecked = id => {
    return pastFormData === id;
  };

  const handleFormChange = ({ target: { value, checked } }) => {
    setPastFromData(value);
  };

  const handleFormView = id => {
    if (pastFormData) {
      if (pastFormData === "termsChecked1") {
        history.push("/form-one");
      }
      if (pastFormData === "termsChecked2") {
        history.push("/form-two");
      }
      if (pastFormData === "termsChecked3") {
        history.push("/patient-audit");
      }
      if (pastFormData === "termsChecked4") {
        history.push("/form-three");
      }
    } else {
      toast.error("Please select any Form");
    }
  };

  const handleNewAppointment = () => {
    history.push("/appointment");
  };

  const handleEdit = () => {
    history.push("/update-profile");
  };

  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className=" container align-items-center">
      <Form>
        <Modal isOpen={modal} toggle={toggle} className="className">
          <ModalHeader toggle={toggle} className="headerHeading">
            Appointment Details
          </ModalHeader>
          <ModalBody>
            <Row>
              <Table hover>
                <thead>
                  <tr>
                    <th className="headingManage">Event Date</th>
                    <th className="headingManage">Start Time</th>
                    <th className="headingManage">End Time</th>
                    <th className="headingManage">Facility Name</th>
                  </tr>
                </thead>
                <tbody>
                  {modal && (
                    <React.Fragment>
                      <tr>
                        <td>
                          {moment(AppointmentDetails.pc_eventDate).format(
                            "MM-DD-YYYY"
                          )}
                        </td>
                        <td>{AppointmentDetails.pc_startTime}</td>
                        <td>{AppointmentDetails.pc_endTime}</td>
                        <td>{AppointmentDetails.facility_name}</td>
                      </tr>
                    </React.Fragment>
                  )}
                </tbody>
              </Table>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" className="border" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Row>
          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">
                Upcoming Appointments
              </CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                {MyAppointments && MyAppointments.length ? (
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
                      {MyAppointments && (
                        <React.Fragment>
                          {MyAppointments.map((result, index1) => (
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
              <br />
              <Row>
                <Col sm={6}></Col>
                <Col sm={5}>
                  <div className="button_wrapper">
                    <button
                      className="custom-btn-primary lhManage "
                      type="submit"
                      onClick={handleSubmit(handleNewAppointment)}
                    >
                      New Appointment
                    </button>
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Card>
          </Col>
          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">My Forms</CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggleTab("1");
                      }}
                    >
                      Consent Forms
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggleTab("2");
                      }}
                    >
                      Audit Forms
                    </NavLink>
                  </NavItem>
                </Nav>
                <br />
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <FormGroup row>
                          <InputComponent
                            className="checkboxForm bigCheckbox"
                            type="checkbox"
                            name="termsCheck1"
                            value="termsChecked1"
                            checked={getFormChecked("termsChecked1")}
                            onChange={handleFormChange}
                          />
                          <Label check className="labelManage">
                            Authorization for release
                          </Label>
                        </FormGroup>

                        <FormGroup row>
                          <InputComponent
                            className="checkboxForm bigCheckbox"
                            type="checkbox"
                            name="termsCheck2"
                            value="termsChecked2"
                            checked={getFormChecked("termsChecked2")}
                            onChange={handleFormChange}
                          />
                          <Label check className="labelManage">
                            Consent to treatment
                          </Label>
                        </FormGroup>
                        <FormGroup row>
                          <InputComponent
                            className="checkboxForm bigCheckbox"
                            type="checkbox"
                            name="termsCheck4"
                            value="termsChecked4"
                            checked={getFormChecked("termsChecked4")}
                            onChange={handleFormChange}
                          />
                          <Label check className="labelManage">
                            Patient Financial Responsibilities Notice
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <FormGroup row>
                          <InputComponent
                            className="checkboxForm bigCheckbox"
                            type="checkbox"
                            name="termsCheck3"
                            value="termsChecked3"
                            checked={getFormChecked("termsChecked3")}
                            onChange={handleFormChange}
                          />
                          <Label check className="labelManage">
                            Patient audit form
                          </Label>
                        </FormGroup>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
              <br />
              <Row>
                <Col sm={6}></Col>
                <Col sm={5}>
                  <div className="button_wrapper">
                    <button
                      className="custom-btn-primary lhManage"
                      type="submit"
                      onClick={handleSubmit(handleFormView)}
                    >
                      View
                    </button>
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">My Past Visits</CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                {MyPastAppointments && MyPastAppointments.length ? (
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
                      {MyPastAppointments && (
                        <React.Fragment>
                          {MyPastAppointments.map((result, index1) => (
                            <tr key={index1}>
                              <td>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <InputComponent
                                  type="checkbox"
                                  name="myPastAppointment"
                                  value={result.pc_eid}
                                  checked={getChecked(result.pc_eid)}
                                  onChange={handleChange}
                                />
                                {index1 + 1}
                              </td>
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
              <br />
              <Row>
                <Col sm={6}></Col>
                <Col sm={5}>
                  <div className="button_wrapper">
                    <button
                      className="custom-btn-primary lhManage"
                      type="submit"
                      onClick={handleSubmit(handleView)}
                    >
                      View
                    </button>
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Card>
          </Col>
          <br />
          <br />
          <Col sm="6">
            <Card body outline color="secondary">
              <CardHeader className="headerHeading">My Profile</CardHeader>
              <CardTitle></CardTitle>
              <CardBody className="card-body-inner padManage">
                <Row>
                  <Label className="labelManage" sm={4}>
                    &#9670; Username
                  </Label>
                  <Label sm={1}>:</Label>
                  <Label sm={6}>{userDetails && userDetails.username}</Label>
                </Row>
                <Row>
                  <Label className="labelManage" sm={4}>
                    &#9670; First Name
                  </Label>
                  <Label sm={1}>:</Label>
                  <Label sm={6}>{userDetails && userDetails.first_name}</Label>
                </Row>
                <Row>
                  <Label className="labelManage" sm={4}>
                    &#9670; Last Name
                  </Label>
                  <Label sm={1}>:</Label>
                  <Label sm={6}>{userDetails && userDetails.last_name}</Label>
                </Row>
                <Row>
                  <Label className="labelManage" sm={4}>
                    &#9670; Email
                  </Label>
                  <Label sm={1}>:</Label>
                  <Label sm={6}>{userDetails && userDetails.email}</Label>
                </Row>
              </CardBody>
              <br />
              <Row>
                <Col sm={6}></Col>
                <Col sm={5}>
                  <div className="button_wrapper">
                    <button
                      className="custom-btn-primary lhManage"
                      type="submit"
                      onClick={handleSubmit(handleEdit)}
                    >
                      Edit
                    </button>
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
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
  getUserAppointmentsErrors: state.Patient.errors,
  getUserAppointmentsFlags: state.Patient.flags,
  MyAppointments: state.Patient.currentUserAppointments,
  MyPastAppointments: state.Patient.MyPastAppointments,
  getAppointmentSuccess: state.Patient.flags.getAppointmentDetails,
  AppointmentDetails: state.Patient.AppointmentDetails,
  getUser: state.Auth.getUser,
  userDetails: state.Auth.userDetails,
  getUserDetails: state.Auth.flags.getUserDetail
});

const mapDispatchToProps = dispatch => ({
  getUserAppointments: payload => {
    dispatch(getUserAppointments(payload));
  },
  getAppointmentDetails: payload => {
    dispatch(getAppointmentDetails(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const PatientLandingPageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientLandingPage);

export default reduxForm({
  form: "PatientLandingPageForm",
  validate
})(PatientLandingPageComponent);

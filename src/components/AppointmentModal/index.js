import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { toast } from "react-toastify";
import moment from "moment";
import { getDurations } from "../../utils/helper";
import {
  FormGroup,
  Label,
  Form,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import ValidatedInput from "../../components/ValidatedInput";
import ValidatedSelect from "../../components/ValidatedSelect";
import {
  scheduleAppointment,
  getUserAppointments,
  resetFlags
} from "../../redux/actions/PatientAction";
import { DURATIONS } from "../../utils/constants";
// import SearchDoctors from "./searchDoctor";
import ListOfDoctors from "./listOfDoctors";
import "./searchDoctor.scss";
const AppointmentModal = props => {
  const {
    getUser,
    className,
    open,
    toggle,
    start,
    resetForm,
    scheduleAppointment,
    scheduleAppointmentErrors,
    scheduleAppointmentFlags,
    handleSubmit
  } = props;
  const [pastData, setPastData] = useState(null);
  const [duration] = useState(getDurations());

  const handleChange = ({ target: { value, checked } }) => {
    setPastData(value);
  };

  useEffect(() => {
    getUserAppointments();
    // setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      scheduleAppointmentErrors &&
      scheduleAppointmentErrors.scheduleAppointment
    ) {
      toast.error(scheduleAppointmentErrors.scheduleAppointment);
      resetFlags();
    }

    if (
      scheduleAppointmentFlags &&
      scheduleAppointmentFlags.scheduleAppointment
    ) {
      resetFlags();
      toggle();
      toast.success(scheduleAppointmentFlags.scheduleAppointment);
      resetForm("AppointmentModalForm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleAppointmentErrors, scheduleAppointmentFlags]);

  const handleScheduleAppointment = formData => {
    const { title, durationVal, hometext } = formData;

    const duration = DURATIONS.find(duration => duration.name === durationVal);

    if (!pastData) {
      toast.error("Please select Doctor");
    } else {
      scheduleAppointment({
        title,
        visit_type: duration.value,
        hometext,
        eventDate:
          start && start.toString() && moment(start).format("YYYY-MM-DD"),
        startTime: start && start.toString() && moment(start).format("HH:00"),
        patient_id: getUser.pid,
        doctor_id: pastData
      });
    }
  };

  return (
    <div>
      <div className="form-container">
        <Modal isOpen={open} toggle={toggle} className={className} size="lg">
          <ModalHeader toggle={toggle}>New Appointment </ModalHeader>

          <ModalBody>
            {/* <SearchDoctors handleChange={handleChange} pastData={pastData} /> */}
            <ListOfDoctors handleChange={handleChange} pastData={pastData} />
            <hr />
            <Form>
              <Row>
                <Col sm={1}></Col>
                <Col sm={10}>
                  <FormGroup row>
                    <Label sm={4} className="lblMng">
                      Patient Name
                    </Label>
                    <Col sm={1}>:</Col>
                    <Label sm={7}>
                      {getUser && getUser.fname}&nbsp;&nbsp;&nbsp;
                      {getUser && getUser.lname}
                    </Label>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={4} className="lblMng">
                      Title
                    </Label>
                    <Col sm={1}>:</Col>
                    <Col sm={7}>
                      <Field
                        component={ValidatedInput}
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="duration" sm={4} className="lblMng">
                      Type of Visit
                    </Label>
                    <Col sm={1}>:</Col>
                    <Col sm={7}>
                      <Field
                        component={ValidatedSelect}
                        name="durationVal"
                        value={duration[0].name}
                        placeholder="Select Type of Visit"
                        isSearchable={true}
                        isClearable={true}
                        options={duration}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={4} className="lblMng">
                      Reason for Visit
                    </Label>
                    <Col sm={1}>:</Col>
                    <Col sm={7}>
                      <Field
                        component={ValidatedInput}
                        type="text"
                        name="hometext"
                        placeholder="Please enter reason for visit"
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label sm={4} className="lblMng">
                      Appointment Date
                    </Label>
                    <Col sm={1}>:</Col>
                    <Label sm={7}>
                      {start &&
                        start.toString() &&
                        moment(start).format("MM-DD-YYYY")}
                    </Label>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={4} className="lblMng">
                      Start Time
                    </Label>
                    <Col sm={1}>:</Col>
                    <Label sm={7}>
                      {start &&
                        start.toString() &&
                        moment(start).format("HH:00")}
                    </Label>
                  </FormGroup>
                </Col>
                <Col sm={1}></Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={handleSubmit(handleScheduleAppointment)}
            >
              Request Appointment
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Field is required";
  }
  if (!values.hometext) {
    errors.hometext = "Field is required";
  }

  if (!values.durationVal) {
    errors.durationVal = "Please select the Type of Visit";
  }

  return errors;
};

const mapStateToProps = state => ({
  // searchDoctorsErrors: state.Patient.errors,
  // searchDoctorsFlags: state.Patient.flags,
  // searchResults: state.Patient.searchResults,
  scheduleAppointmentErrors: state.Patient.errors,
  scheduleAppointmentFlags: state.Patient.flags,
  getUser: state.Auth.getUser
});

const mapDispatchToProps = dispatch => ({
  // searchDoctors: payload => {
  //   dispatch(searchDoctors(payload));
  // },
  scheduleAppointment: payload => {
    dispatch(scheduleAppointment(payload));
  },
  getUserAppointments: payload => {
    dispatch(getUserAppointments(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: AppointmentModalForm => {
    dispatch(reset(AppointmentModalForm));
  }
});

const AppointmentModalComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentModal);

export default reduxForm({
  form: "AppointmentModalForm",
  validate
})(AppointmentModalComponent);

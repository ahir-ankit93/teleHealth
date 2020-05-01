import React from "react";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { scheduleAppointment } from "../../redux/actions/PatientAction";
const MakeAppointmentModal = props => {
  const { newAppoinmentOpen, toggleAppoinment } = props;

  const handleScheduleAppointment = formData => {
    const {
      title,
      duration,
      hometext,
      eventDate,
      startTime,
      patient_id
    } = formData;
    scheduleAppointment({
      title,
      duration,
      hometext,
      eventDate,
      startTime,
      patient_id
    });
  };

  return (
    <div>
      <Modal isOpen={newAppoinmentOpen} toggle={toggleAppoinment}>
        <ModalHeader>
          <strong>New Appointment</strong> ( Monday, Jan 27, 4:45pm )
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="exampleEmail2" sm={8}>
                <strong> Ankit, Ahir </strong>19/05/1993 (26 y/o male)
              </Label>
              <Col sm={4}>
                <div className="back-btn">
                  <Link to="/schedule-appointment">Edit </Link>
                  <Link to="/schedule-appointment"> Change</Link>
                </div>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="exampleContact" sm={2}>
                Contact
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="contact"
                  id="exampleContact"
                  value="Surat, Gujarat - India"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleInsurance" sm={2}>
                Insurance
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="insurance"
                  id="exampleInsurance"
                  value="Tata AIG"
                />
              </Col>
              <Col sm={4}>
                <div className="back-btn">
                  <Link to="/schedule-appointment">Edit </Link>
                </div>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleEligibility" sm={2}>
                Eligibility
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="eligibility"
                  id="exampleEligibility"
                  value=""
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleBalance" sm={2}>
                Balance
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="balance"
                  id="exampleBalance"
                  value="$0.00"
                />
              </Col>
            </FormGroup>
          </Form>
          <hr />
          <ModalHeader>Appointment Details</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for="exampleProvider" sm={4}>
                  Provider/Resource
                </Label>
                <Col sm={8}>
                  <Input type="select" name="provider" id="exampleProvider">
                    {" "}
                    <option>Harrison, Paul</option>
                    <option>Camille Abboud, MD</option>
                    <option>James Avery, MD</option>
                    <option>Dennis Balfe, MD </option>
                    <option>Sanjeev Bhalla, MD</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleDate" sm={4}>
                  Date/Time
                </Label>
                <Col sm={4}>
                  <Input
                    type="text"
                    name="appointment_date"
                    id="exampleDate"
                    value="27/01/2020"
                  />
                </Col>
                <Col sm={4}>
                  <Input
                    type="datetime"
                    name="appointment_date"
                    id="exampleDate"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleVisit" sm={4}>
                  Visit Reason
                </Label>
                <Col sm={8}>
                  <Input type="select" name="visit_reason" id="exampleVisit">
                    <option>- Select a Visit Reason -</option>
                    <option>Chest Pains</option>
                    <option>Abdominal Pains</option>
                    <option>Toothaches</option>
                    <option>Broken Bones and Sprains</option>
                    <option>Back Pain</option>
                    <option>Skin Infections</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleDuration" sm={4}>
                  Duration
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="duration"
                    value="15"
                    id="exampleDuration"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleLocation" sm={4}>
                  Location
                </Label>
                <Col sm={8}>
                  <Input type="select" name="location" id="exampleLocation">
                    <option>- Select a Location -</option>
                    <option>Chicago, Illinois</option>
                    <option>Charleston, South Carolina</option>
                    <option>Las Vegas, Nevada</option>
                    <option>Seattle, Washington</option>
                    <option>San Francisco, California</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleText" sm={4}>
                  Note
                  <br />
                  (optional)
                </Label>
                <Col sm={8}>
                  <Input type="textarea" name="text" id="exampleText" />
                  <p>
                    You can put in a chief complaint or any related to the
                    appointment{" "}
                  </p>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleText" sm={4}>
                  Recurrence
                  <br />
                  (optional)
                </Label>
                <Col sm={8}>
                  <Button>+ Recurrence</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleScheduleAppointment}>
            Make An Appointment
          </Button>{" "}
          <Button color="secondary" onClick={toggleAppoinment}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MakeAppointmentModal;

import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./schedule.scss";
import AppoinmentModal from "../../../components/AppointmentModal";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FormGroup, Col } from "reactstrap";
import { connect } from "react-redux";
import {
  getUserAppointments,
  resetFlags
} from "../../../redux/actions/PatientAction";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);

class scheduleAppointment extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: ""
      }
    ],
    isModalOpen: false,
    start: null,
    end: null
  };

  componentDidMount() {
    if (this.props.getUserDetails) {
      getUserAppointments({ p_id: this.props.getUser.pid });
    }
    if (this.props.MyAppointments) {
      const events = this.props.MyAppointments.map(appointment => {
        return {
          title: "Appointment",
          start: new Date(
            appointment.pc_eventDate + " " + appointment.pc_startTime
          ),
          end: new Date(
            appointment.pc_eventDate + " " + appointment.pc_endTime
          ),
          ...appointment
        };
      });
      this.setState({ events });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      getUserDetails,
      getUserAppointments,
      MyAppointments
      // MyPastAppointments
    } = this.props;
    if (nextProps.getUserDetails !== getUserDetails) {
      getUserAppointments({ p_id: nextProps.getUser.pid });
    }

    if (
      (!this.props.MyAppointments && MyAppointments) ||
      (this.props.MyAppointments &&
        nextProps.MyAppointments.length !== MyAppointments.length)
    ) {
      const events = nextProps.MyAppointments.map(appointment => {
        return {
          title: "Appointment",
          start: new Date(
            appointment.pc_eventDate + " " + appointment.pc_startTime
          ),
          end: new Date(
            appointment.pc_eventDate + " " + appointment.pc_endTime
          ),
          ...appointment
        };
      });
      this.setState({ events });
    }
    //  setLoading(true);
  }

  handleSelect = ({ start, end, title }) => {
    if (start < new Date()) {
      toast.error("Can not book an appointment for past time");
      return false;
    }

    this.setState({
      isModalOpen: true,
      start: start,
      end: end,
      title: title
    });
  };

  toggle = () => this.setState(state => ({ isModalOpen: !state.isModalOpen }));

  toggleAppoinment = () => {
    this.setState(state => ({
      isModalOpen: false
    }));
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    let isCurrent =
      this.props.CurrentUserAppointments &&
      this.props.CurrentUserAppointments.length &&
      this.props.CurrentUserAppointments.find(
        appointment => appointment.pc_eid === event.pc_eid
      );

    const style = {
      backgroundColor: "green"
    };
    if (isCurrent) {
      style.backgroundColor = "green";
    } else {
      style.backgroundColor = "red";
    }

    return {
      style: style
    };
  };

  render() {
    const { isModalOpen, start, end, title, events } = this.state;

    return (
      <div className="container">
        <div className="form-title hadMng">
          <h1>Schedule Appointment</h1>
        </div>
        <br />
        <FormGroup row>
          <Col sm={1}></Col>
          <Col sm={10}>
            {" "}
            <AppoinmentModal
              open={isModalOpen}
              toggle={this.toggle}
              toggleAppoinment={this.toggleAppoinment}
              start={start}
              end={end}
              title={title}
            />
            <Calendar
              style={{ height: "100vh" }}
              selectable
              localizer={localizer}
              events={events}
              defaultView="day"
              views={["month", "week", "day"]}
              defaultDate={new Date()}
              onSelectEvent={title}
              onSelectSlot={this.handleSelect}
              min={new Date(0, 0, 0, 7, 0, 0)}
              max={new Date(0, 0, 0, 18, 0, 0)}
              eventPropGetter={this.eventStyleGetter}
            />
          </Col>
          <Col sm={1}></Col>
        </FormGroup>

        <br />
        <br />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUserAppointments: payload => {
    dispatch(getUserAppointments(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const mapStateToProps = state => ({
  getUser: state.Auth.getUser,
  userDetails: state.Auth.userDetails,
  MyPastAppointments: state.Patient.getUserPastAppointments,
  MyAppointments: state.Patient.MyAppointments,
  CurrentUserAppointments: state.Patient.currentUserAppointments,
  getUserDetails: state.Auth.flags.getUserDetail,
  showMobileMenu: state.Auth.showMobileMenu,
  appointments: state.Patient.appointments || []
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(scheduleAppointment);

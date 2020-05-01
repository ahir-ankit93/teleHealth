import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import "./ocZoomMeeting.scss";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Input as InputComponent,
  UncontrolledTooltip
} from "reactstrap";
import { toast } from "react-toastify";
import ValidatedInput from "../../../components/ValidatedInput";
import {
  createMeeting,
  inviteUser,
  resetFlags
} from "../../../redux/actions/OCZoomMeetingAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const VideoConference = ({
  omniChannelErrors,
  omniChannelFlags,
  resetFlags,
  history,
  handleSubmit,
  createMeeting,
  inviteUser,
  createdMeeting,
  dispatch
}) => {
  const [inviteEmails, setInviteEmails] = useState([]);
  const emailInvite = useRef(null);

  useEffect(() => {
    if (omniChannelErrors && omniChannelErrors.createMeeting) {
      toast.error(omniChannelErrors.createMeeting);
      resetFlags();
    }

    if (omniChannelFlags && omniChannelFlags.createMeeting) {
      resetFlags();
      dispatch(
        change("VideoConferenceForm", "start_url", createdMeeting.start_url)
      );
      dispatch(
        change("VideoConferenceForm", "join_url", createdMeeting.join_url)
      );
    }

    if (omniChannelErrors && omniChannelErrors.inviteUser) {
      toast.error(omniChannelErrors.inviteUser);
      resetFlags();
    }

    if (omniChannelFlags && omniChannelFlags.inviteUser) {
      resetFlags();
      toast.success(omniChannelFlags.inviteUser);
      // dispatch(change("VideoConferenceForm", "invite_email", null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [omniChannelErrors, omniChannelFlags]);

  const submitForm = formData => {
    createMeeting({ topic: formData.topic });
  };

  const handleInviteUser = formData => {
    inviteUser({
      joinee_email: inviteEmails.join(","),
      join_url: createdMeeting.join_url
    });
  };

  const _handleKeyDown = e => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      if (value) {
        if (inviteEmails.indexOf(value) !== -1) {
          toast.error("Email already added");
          return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          toast.error("Invalid email");
          return;
        }
        setInviteEmails([...inviteEmails, value]);
        emailInvite.current.value = "";
      }
    }
  };

  const removeEmail = index => {
    if (inviteEmails.length) {
      const temp = [...inviteEmails];
      temp.splice(index, 1);
      setInviteEmails(temp);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <Form className="form-container" onSubmit={handleSubmit(submitForm)}>
        <div className="form-title">
          <h1>Create Zoom Meeting</h1>
        </div>
        <br />
        <FormGroup row>
          <Label sm={4}>Topic</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="topic"
              placeholder="Meeting Topic"
            />
          </Col>
        </FormGroup>
        <div className="button_wrapper">
          <button className="custom-btn-primary" type="submit">
            Create
          </button>
        </div>
        <br />
        {createdMeeting && (
          <React.Fragment>
            <FormGroup row>
              <Col sm={5}>
                <a
                  href={createdMeeting.start_url}
                  name="start_url"
                  target="blank"
                  className="btn btn-success"
                >
                  Start Meeting
                </a>
              </Col>
              {/* <Label sm={3}>Start URL</Label>
              <Col sm={9}>
                <Field
                  component={ValidatedInput}
                  type="textarea"
                  name="start_url"
                  disabled={true}
                  rows="5"
                />
              </Col> */}
            </FormGroup>
            {/* <FormGroup row>
              <Label sm={3}>Join URL</Label>
              <Col sm={9}>
                <Field
                  component={ValidatedInput}
                  type="textarea"
                  name="join_url"
                  disabled={true}
                  rows="5"
                />
              </Col>
            </FormGroup> */}
            <div className="form-title">
              <h1>Invite For Meeting</h1>
              <br />
            </div>
            <FormGroup row>
              <Label sm={4}>Email</Label>
              <Col sm={7}>
                <InputComponent
                  innerRef={emailInvite}
                  type="text"
                  onKeyDown={_handleKeyDown}
                  name="invite_email"
                  placeholder="Email"
                  // placeholder="e.g.- abc@abc.com, xyz@xyz.com"
                />
              </Col>
              <div sm={1} xs={2}>
                <span id="email-tooltip">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                </span>
                <UncontrolledTooltip placement="right" target="email-tooltip">
                  Press enter to add one or multiple email address
                </UncontrolledTooltip>
              </div>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col sm={12}>
                  <ul className="email-list">
                    {!!inviteEmails.length &&
                      inviteEmails.map((email, index) => {
                        return (
                          <li key={index}>
                            <span>{email}</span>
                            <button onClick={() => removeEmail(index)}>
                              X
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                </Col>
              </Row>
            </FormGroup>

            <div className="button_wrapper">
              <button
                className="custom-btn-primary"
                type="button"
                onClick={handleSubmit(handleInviteUser)}
              >
                Invite
              </button>
            </div>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.topic) {
    errors.topic = "Field is required";
  }
  if (!values.invite_email) {
    errors.invite_email = "Field is required";
  }
  return errors;
};

const mapStateToProps = state => ({
  omniChannelErrors: state.OmniChannel.errors,
  omniChannelFlags: state.OmniChannel.flags,
  createdMeeting: state.OmniChannel.createdMeeting
});

const mapDispatchToProps = dispatch => ({
  createMeeting: payload => {
    dispatch(createMeeting(payload));
  },
  inviteUser: payload => {
    dispatch(inviteUser(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const VideoConferenceComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoConference);

export default reduxForm({
  form: "VideoConferenceForm",
  validate
})(VideoConferenceComponent);

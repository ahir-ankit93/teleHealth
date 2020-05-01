import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import "./chat.scss";
// import { toast } from "react-toastify";
import { Form } from "reactstrap";

import {
  newMessages,
  inOutMessages,
  sendMessages,
  resetFlags
} from "../../../redux/actions/OCChatAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faComment } from "@fortawesome/free-solid-svg-icons";

const OCChat = ({
  oCChatErrors,
  oCChatFlags,
  resetFlags,
  history,
  handleSubmit,
  newMessages,
  inOutMessages,
  sendMessages,
  createdNewMessages,
  dispatch
}) => {
  // useEffect(() => {
  //   if (oCChatErrors && oCChatErrors.newMessages) {
  //     toast.error(oCChatErrors.newMessages);
  //     resetFlags();
  //   }
  // }, [oCChatErrors, oCChatFlags]);

  const submitForm = formData => {
    newMessages({ username: formData.username });
  };

  // const handleInOutMessages = formData => {
  //   inOutMessages({ phone: formData.phone });
  // };

  // const handleSendMessages = formData => {
  //   sendMessages({
  //     receiver: formData.phone,
  //     sms_body: formData.sms_body,
  //     username: formData.username
  //   });
  // };

  return (
    <div className="container">
      <div className="form-title">
        <h1>Chat</h1>
      </div>
      <Form className="form-container" onSubmit={handleSubmit(submitForm)}>
        <button className="btn-messages" type="submit">
          New Messages
        </button>
        <br />
        <br />

        {/* <button
            className="btn-messages"
            type="submit"
            onClick={handleSubmit(handleInOutMessages)}
          >
            InOutMessages
          </button>{" "}
          <br />
          <br />
          <FormGroup row>
            <Label sm={4}>Username</Label>
            <Col sm={7}>
              <Field
                component={ValidatedInput}
                type="text"
                name="username"
                placeholder="User Name"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={4}>phone</Label>
            <Col sm={7}>
              <Field
                component={ValidatedInput}
                type="text"
                name="phone"
                placeholder="phone number"
              />
            </Col>
          </FormGroup> */}
        <div className="chat">
          <div className="chat__sidebar">
            <h3>
              Contacts&nbsp;
              <FontAwesomeIcon icon={faUsers} />
            </h3>
            <hr />
            <h3 id="users">
              &nbsp;Ankit &nbsp;
              <FontAwesomeIcon icon={faComment} />{" "}
            </h3>
            <h3 id="users">&nbsp;Vijay &nbsp;</h3>
          </div>
          <div className="chat__main">
            <h3 className="current_user">
              Ankit&nbsp;
              <FontAwesomeIcon icon={faUser} />
            </h3>

            <ol id="messages" className="chat__messages">
              <ul className="message-list">
                <li>Hello, How are you?</li>
              </ul>
            </ol>
          </div>
        </div>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = "Field is required";
  }
  return errors;
};

const mapStateToProps = state => ({
  ocChatErrors: state.OCChat.errors,
  ocChatFlags: state.OCChat.flags,
  newMessages: state.OCChat.newMessages,
  inOutMessages: state.OCChat.inOutMessages,
  sendMessages: state.OCChat.sendMessages
});

const mapDispatchToProps = dispatch => ({
  newMessages: payload => {
    dispatch(newMessages(payload));
  },
  inOutMessages: payload => {
    dispatch(inOutMessages(payload));
  },
  sendMessages: payload => {
    dispatch(sendMessages(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const OCChatComponent = connect(mapStateToProps, mapDispatchToProps)(OCChat);

export default reduxForm({
  form: "OCChatForm",
  validate
})(OCChatComponent);

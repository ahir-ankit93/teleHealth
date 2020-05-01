import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, convertToFormData } from "../../utils/http";
import {
  NEW_MESSAGES_REQUEST,
  NEW_MESSAGES_SUCCESS,
  NEW_MESSAGES_ERROR,
  INOUT_MESSAGES_REQUEST,
  INOUT_MESSAGES_SUCCESS,
  INOUT_MESSAGES_ERROR,
  SEND_MESSAGES_REQUEST,
  SEND_MESSAGES_SUCCESS,
  SEND_MESSAGES_ERROR
} from "../reducers/OCChatReducer";

function newMessages(payload) {
  return request.post(
    "/user/api/v1/getUserMessages/",
    convertToFormData(payload)
  );
}

function* handleNewMessages(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(newMessages, action.payload);
    if (status === 200) {
      yield put({
        type: NEW_MESSAGES_SUCCESS,
        messages: data.messages
      });
    } else {
      yield put({
        type: NEW_MESSAGES_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("create new messages error :", error.response);
    yield put({
      type: NEW_MESSAGES_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function inOutMessages(payload) {
  return request.post(
    "/user/api/v1/getInOutMessages/",
    convertToFormData(payload)
  );
}

function* handleInOutMessages(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(inOutMessages, action.payload);
    if (status === 200) {
      yield put({
        type: INOUT_MESSAGES_SUCCESS,
        inOutMessages: data.inOutMessages
      });
    } else {
      yield put({
        type: INOUT_MESSAGES_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("InOut messages error :", error.response);
    yield put({
      type: INOUT_MESSAGES_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function sendMessages(payload) {
  return request.post("/user/sendSms/", convertToFormData(payload));
}

function* handleSendMessages(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(sendMessages, action.payload);
    if (status === 200) {
      yield put({
        type: SEND_MESSAGES_SUCCESS,
        sendMessages: data.sendMessages
      });
    } else {
      yield put({
        type: SEND_MESSAGES_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Send messages error :", error.response);
    yield put({
      type: SEND_MESSAGES_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

export default all([
  takeLatest(NEW_MESSAGES_REQUEST, handleNewMessages),
  takeLatest(INOUT_MESSAGES_REQUEST, handleInOutMessages),
  takeLatest(SEND_MESSAGES_REQUEST, handleSendMessages)
]);

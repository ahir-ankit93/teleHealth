import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, convertToFormData } from "../../utils/http";
import {
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_ERROR,
  INVITE_USER_REQUEST,
  INVITE_USER_SUCCESS,
  INVITE_USER_ERROR
} from "../reducers/OCZoomMeetingReducer";

function createMeeting(payload) {
  return request.post(
    "/user/api/v1/startZoomMeeting/",
    convertToFormData(payload)
  );
}

function* handleCreateMeeting(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(createMeeting, action.payload);
    if (status === 200) {
      yield put({
        type: CREATE_MEETING_SUCCESS,
        meeting: data.meeting
      });
    } else {
      yield put({
        type: CREATE_MEETING_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("create meeting error :", error.response);
    yield put({
      type: CREATE_MEETING_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function inviteUser(payload) {
  return request.post("/user/api/v1/inviteUser/", convertToFormData(payload));
}

function* handleInviteUser(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(inviteUser, action.payload);

    if (status === 200) {
      yield put({
        type: INVITE_USER_SUCCESS,
        message: data.message
      });
    } else {
      yield put({
        type: INVITE_USER_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("invite user error :", error.response);
    yield put({
      type: INVITE_USER_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

export default all([
  takeLatest(CREATE_MEETING_REQUEST, handleCreateMeeting),
  takeLatest(INVITE_USER_REQUEST, handleInviteUser)
]);

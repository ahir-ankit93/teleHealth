import { all } from "redux-saga/effects";
import AuthSaga from "./AuthSaga";
import PatientSaga from "./PatientSaga";
import AdminSaga from "./AdminSaga";
import OCZoomMeetingSaga from "./OCZoomMeetingSaga";
import OCChatSaga from "./OCChatSaga";

export function* index() {
  yield all([AuthSaga]);
  yield all([PatientSaga]);
  yield all([AdminSaga]);
  yield all([OCZoomMeetingSaga]);
  yield all([OCChatSaga]);
}

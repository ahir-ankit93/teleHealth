import {
  CREATE_MEETING_REQUEST,
  INVITE_USER_REQUEST,
  RESET_FLAGS
} from "../reducers/OCZoomMeetingReducer";

export const createMeeting = payload => ({
  type: CREATE_MEETING_REQUEST,
  payload
});

export const inviteUser = payload => ({
  type: INVITE_USER_REQUEST,
  payload
});

export const resetFlags = () => ({
  type: RESET_FLAGS
});

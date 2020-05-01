export const CREATE_MEETING_REQUEST = "CREATE_MEETING_REQUEST";
export const CREATE_MEETING_SUCCESS = "CREATE_MEETING_SUCCESS";
export const CREATE_MEETING_ERROR = "CREATE_MEETING_ERROR";

export const INVITE_USER_REQUEST = "INVITE_USER_REQUEST";
export const INVITE_USER_SUCCESS = "INVITE_USER_SUCCESS";
export const INVITE_USER_ERROR = "INVITE_USER_ERROR";

export const CLEAR_STORE_REQUEST = "CLEAR_STORE_REQUEST";

export const RESET_FLAGS = "RESET_FLAGS";

const initialState = {
  createdMeeting: null,
  errors: {
    createMeeting: null,
    inviteUser: null
  },
  flags: {
    createMeeting: false,
    inviteUser: false
  }
};

export const OCZoomMeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MEETING_SUCCESS:
      return {
        ...state,
        createdMeeting: action.meeting,
        flags: { createMeeting: true }
      };
    case CREATE_MEETING_ERROR:
      return {
        ...state,
        errors: { createMeeting: action.error }
      };

    case CLEAR_STORE_REQUEST:
      return { ...initialState };

    case INVITE_USER_SUCCESS:
      return {
        ...state,
        flags: { inviteUser: action.message }
      };
    case INVITE_USER_ERROR:
      return {
        ...state,
        errors: { inviteUser: action.error }
      };
    case RESET_FLAGS:
      return {
        ...state,
        errors: initialState.errors,
        flags: initialState.flags
      };
    default:
      return state;
  }
};

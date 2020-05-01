export const NEW_MESSAGES_REQUEST = "NEW_MESSAGES_REQUEST";
export const NEW_MESSAGES_SUCCESS = "NEW_MESSAGES_SUCCESS";
export const NEW_MESSAGES_ERROR = "NEW_MESSAGES_ERROR";

export const INOUT_MESSAGES_REQUEST = "INOUT_MESSAGES_REQUEST";
export const INOUT_MESSAGES_SUCCESS = "INOUT_MESSAGES_SUCCESS";
export const INOUT_MESSAGES_ERROR = "INOUT_MESSAGES_ERROR";

export const SEND_MESSAGES_REQUEST = "SEND_MESSAGES_REQUEST";
export const SEND_MESSAGES_SUCCESS = "SEND_MESSAGES_SUCCESS";
export const SEND_MESSAGES_ERROR = "SEND_MESSAGES_ERROR";

export const CLEAR_STORE_REQUEST = "CLEAR_STORE_REQUEST";

export const RESET_FLAGS = "RESET_FLAGS";

const initialState = {
  errors: {
    newMessages: null,
    inOutMessages: null,
    sendMessages: null
  },
  flags: {
    newMessages: false,
    inOutMessages: false,
    sendMessages: false
  }
};

export const OCChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGES_SUCCESS:
      return {
        ...state,
        newMessages: action.messages,
        flags: { newMessages: true }
      };
    case NEW_MESSAGES_ERROR:
      return {
        ...state,
        errors: { newMessages: action.error }
      };

    case CLEAR_STORE_REQUEST:
      return { ...initialState };

    case INOUT_MESSAGES_SUCCESS:
      return {
        ...state,
        inOutMessages: action.inOutmessages,
        flags: { inOutMessages: true }
      };
    case INOUT_MESSAGES_ERROR:
      return {
        ...state,
        errors: { inOutMessages: action.error }
      };

    case SEND_MESSAGES_SUCCESS:
      return {
        ...state,
        sendMessages: action.sendMessages,
        flags: { sendMessages: true }
      };
    case SEND_MESSAGES_ERROR:
      return {
        ...state,
        errors: { sendMessages: action.error }
      };

    default:
      return state;
  }
};

import {
  NEW_MESSAGES_REQUEST,
  INOUT_MESSAGES_REQUEST,
  SEND_MESSAGES_REQUEST,
  RESET_FLAGS
} from "../reducers/OCChatReducer";

export const newMessages = payload => ({
  type: NEW_MESSAGES_REQUEST,
  payload
});

export const inOutMessages = payload => ({
  type: INOUT_MESSAGES_REQUEST,
  payload
});

export const sendMessages = payload => ({
  type: SEND_MESSAGES_REQUEST,
  payload
});

export const resetFlags = () => ({
  type: RESET_FLAGS
});

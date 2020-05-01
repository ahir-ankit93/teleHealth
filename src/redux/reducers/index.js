import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { AuthReducer } from "./AuthReducer";
import { PatientReducer } from "./PatientReducer";
import { AdminReducer } from "./AdminReducer";
import { OCZoomMeetingReducer } from "./OCZoomMeetingReducer";
import { OCChatReducer } from "./OCChatReducer";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    Auth: AuthReducer,
    Admin: AdminReducer,
    OmniChannel: OCZoomMeetingReducer,
    OCChat: OCChatReducer,
    Patient: PatientReducer,
    form: FormReducer
  });

export default createRootReducer;

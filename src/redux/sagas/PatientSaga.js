import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, convertToFormData } from "../../utils/http";
import {
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  SEARCH_DOCTORS_REQUEST,
  SEARCH_DOCTORS_SUCCESS,
  SEARCH_DOCTORS_ERROR,
  SCHEDULE_APPOINTMENT_REQUEST,
  SCHEDULE_APPOINTMENT_SUCCESS,
  SCHEDULE_APPOINTMENT_ERROR,
  GET_USER_APPOINTMENTS_REQUEST,
  GET_USER_APPOINTMENTS_SUCCESS,
  GET_USER_APPOINTMENTS_ERROR,
  GET_APPOINTMENT_DETAILS_REQUEST,
  GET_APPOINTMENT_DETAILS_SUCCESS,
  GET_APPOINTMENT_DETAILS_ERROR,
  BILLING_ENGINE_REQUEST,
  BILLING_ENGINE_SUCCESS,
  BILLING_ENGINE_ERROR,
  SAVE_PATIENT_FORM_REQUEST,
  SAVE_PATIENT_FORM_SUCCESS,
  SAVE_PATIENT_FORM_ERROR,
  AUDIT_QUESTIONS_REQUEST,
  AUDIT_QUESTIONS_SUCCESS,
  AUDIT_QUESTIONS_ERROR,
  AUDIT_ANSWERS_REQUEST,
  AUDIT_ANSWERS_SUCCESS,
  AUDIT_ANSWERS_ERROR,
  SAVE_PATIENT_AUDIT_FORM_SUCCESS,
  SAVE_PATIENT_AUDIT_FORM_ERROR,
  SAVE_PATIENT_AUDIT_FORM_REQUEST,
  LIST_OF_DOCTORS_SUCCESS,
  LIST_OF_DOCTORS_REQUEST,
  LIST_OF_DOCTORS_ERROR
} from "../reducers/PatientReducer";
import { toast } from "react-toastify";

function createProfile(payload) {
  return request.post(
    "/user/api/v1/addPatientProfile/",
    convertToFormData(payload)
  );
}

function* handleCreateProfile(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(createProfile, action.payload);
    if (status === 200) {
      yield put({
        type: CREATE_PROFILE_SUCCESS,
        profile: data.message
      });
    } else {
      yield put({
        type: CREATE_PROFILE_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("create profile error :", error.response);
    yield put({
      type: CREATE_PROFILE_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function updateProfile(payload) {
  return request.post(
    "/user/api/v1/updatePatientProfile/",
    convertToFormData(payload)
  );
}

function* handleUpdateProfile(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(updateProfile, action.payload);
    if (status === 200) {
      yield put({
        type: UPDATE_PROFILE_SUCCESS,
        updateProfile: data.message
      });
    } else {
      yield put({
        type: UPDATE_PROFILE_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("update profile error :", error.response);
    yield put({
      type: UPDATE_PROFILE_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function searchDoctors(payload) {
  return request.post("/user/api/v1/searchDoctor/", convertToFormData(payload));
}

function* handleSearchDoctors(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(searchDoctors, action.payload);
    if (status === 200) {
      yield put({
        type: SEARCH_DOCTORS_SUCCESS,
        searchDoctors: data.search_results
      });
    } else {
      yield put({
        type: SEARCH_DOCTORS_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("search doctors error :", error.response);
    yield put({
      type: SEARCH_DOCTORS_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function scheduleAppointment(payload) {
  return request.post(
    "/user/api/v1/scheduleAppointment/",
    convertToFormData(payload)
  );
}

function* handleScheduleAppointment(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(scheduleAppointment, action.payload);

    if (status === 200) {
      yield put({
        type: SCHEDULE_APPOINTMENT_SUCCESS,
        data: action.payload,
        message: data.message
      });
    } else {
      yield put({
        type: SCHEDULE_APPOINTMENT_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    // console.log("schedule appointment error :", error.response);
    yield put({
      type: SCHEDULE_APPOINTMENT_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function getUserAppointments(payload) {
  return request.post(
    "user/api/v1/getUserAppointments/",
    convertToFormData(payload)
  );
}

function* handleGetUserAppointments(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getUserAppointments, action.payload);
    if (status === 200) {
      yield put({
        type: GET_USER_APPOINTMENTS_SUCCESS,
        getAllUsersAppointments: data.all_users_appointments,
        getUserAppointments: data.my_appointments,
        getUserPastAppointments: data.past_appointments
      });
    } else {
      yield put({
        type: GET_USER_APPOINTMENTS_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("schedule appointment error :", error.response);
    yield put({
      type: GET_USER_APPOINTMENTS_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function getAppointmentDetails(payload) {
  return request.post(
    "user/api/v1/getAppointmentDetails/",
    convertToFormData(payload)
  );
}

function* handleGetAppointmentDetails(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getAppointmentDetails, action.payload);
    if (status === 200) {
      yield put({
        type: GET_APPOINTMENT_DETAILS_SUCCESS,
        getAppointmentDetails: data.appointments
      });
    } else {
      yield put({
        type: GET_APPOINTMENT_DETAILS_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("GET APPOINTMENT DETAILS error :", error.response);
    yield put({
      type: GET_APPOINTMENT_DETAILS_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function billingEngine(payload) {
  return request.post("/charge/user/", convertToFormData(payload));
}

function* handleBillingEngine(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(billingEngine, action.payload);
    if (status === 200) {
      yield put({
        type: BILLING_ENGINE_SUCCESS,
        message: data.message
      });
    } else {
      yield put({
        type: BILLING_ENGINE_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("billing engine error :", error.response);
    yield put({
      type: BILLING_ENGINE_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function savePatientForm(payload) {
  return request.post(
    "user/api/v1/savePatientForm/",
    convertToFormData(payload)
  );
}

function* handleSavePatientForm(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(savePatientForm, action.payload);

    if (status === 200) {
      yield put({
        type: SAVE_PATIENT_FORM_SUCCESS,
        message: data.response
      });
    } else {
      yield put({
        type: SAVE_PATIENT_FORM_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    // console.log("schedule appointment error :", error.response);
    yield put({
      type: SAVE_PATIENT_FORM_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function auditQuestions(payload) {
  return request.get("api/v1/getAllAuditQuestions/");
}

function* handleAuditQuestions(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(auditQuestions);

    if (status === 200) {
      yield put({
        type: AUDIT_QUESTIONS_SUCCESS,
        auditQuestions: data.questions
      });
    } else {
      yield put({
        type: AUDIT_QUESTIONS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Audit Questions error :", error.response);
    yield put({
      type: AUDIT_QUESTIONS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function auditAnswers(payload) {
  return request.get("api/v1/getAllAnswersChoices/");
}

function* handleAuditAnswers(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(auditAnswers);

    if (status === 200) {
      yield put({
        type: AUDIT_ANSWERS_SUCCESS,
        auditAnswers: data.answers_choices
      });
    } else {
      yield put({
        type: AUDIT_ANSWERS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Audit Answers error :", error.response);
    yield put({
      type: AUDIT_ANSWERS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function listOfDoctors(payload) {
  return request.get("user/api/v1/getAllDoctors/");
}

function* handleListOfDoctors(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(listOfDoctors);

    if (status === 200) {
      yield put({
        type: LIST_OF_DOCTORS_SUCCESS,
        listOfDoctors: data.search_results
      });
    } else {
      yield put({
        type: LIST_OF_DOCTORS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("list of all doctors error :", error.response);
    yield put({
      type: LIST_OF_DOCTORS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function savePatientAuditForm(payload) {
  payload.answers_list = JSON.stringify(payload.answers_list);
  return request.post("user/api/v1/saveAuditForm/", convertToFormData(payload));
}

function* handleSavePatientAuditForm(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(savePatientAuditForm, action.payload);

    if (status === 200) {
      yield put({
        type: SAVE_PATIENT_AUDIT_FORM_SUCCESS,
        message: data.message
      });
    } else {
      yield put({
        type: SAVE_PATIENT_AUDIT_FORM_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.error(error.response.data.message);
    }

    // console.log("save patient audit form error :", error.response);
    // yield put({
    //   type: SAVE_PATIENT_AUDIT_FORM_ERROR,
    //   error: "Something went wrong, Please try again later"
    // });
  }
}

export default all([
  takeLatest(CREATE_PROFILE_REQUEST, handleCreateProfile),
  takeLatest(UPDATE_PROFILE_REQUEST, handleUpdateProfile),
  takeLatest(SEARCH_DOCTORS_REQUEST, handleSearchDoctors),
  takeLatest(SCHEDULE_APPOINTMENT_REQUEST, handleScheduleAppointment),
  takeLatest(GET_USER_APPOINTMENTS_REQUEST, handleGetUserAppointments),
  takeLatest(GET_APPOINTMENT_DETAILS_REQUEST, handleGetAppointmentDetails),
  takeLatest(BILLING_ENGINE_REQUEST, handleBillingEngine),
  takeLatest(SAVE_PATIENT_FORM_REQUEST, handleSavePatientForm),
  takeLatest(AUDIT_QUESTIONS_REQUEST, handleAuditQuestions),
  takeLatest(AUDIT_ANSWERS_REQUEST, handleAuditAnswers),
  takeLatest(SAVE_PATIENT_AUDIT_FORM_REQUEST, handleSavePatientAuditForm),
  takeLatest(LIST_OF_DOCTORS_REQUEST, handleListOfDoctors)
]);

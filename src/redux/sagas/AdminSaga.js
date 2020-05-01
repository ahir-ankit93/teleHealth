import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, convertToFormData } from "../../utils/http";
import {
  MANAGE_USERS_REQUEST,
  MANAGE_USERS_SUCCESS,
  MANAGE_USERS_ERROR,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  SUITE_CRM_CONTACTS_REQUEST,
  SUITE_CRM_CONTACTS_SUCCESS,
  SUITE_CRM_CONTACTS_ERROR,
  SEND_TO_OPEN_EMR_REQUEST,
  SEND_TO_OPEN_EMR_SUCCESS,
  SEND_TO_OPEN_EMR_ERROR,
  GET_ALL_APPOINTMENTS_SUCCESS,
  GET_ALL_APPOINTMENTS_ERROR,
  GET_ALL_APPOINTMENTS_REQUEST,
  GET_ALL_USERS_FORMS_SUCCESS,
  GET_ALL_USERS_FORMS_ERROR,
  GET_ALL_USERS_FORMS_REQUEST,
  APPROVE_PATIENT_FORM_SUCCESS,
  APPROVE_PATIENT_FORM_ERROR,
  APPROVE_PATIENT_FORM_REQUEST,
  GET_PATIENTS_AUDIT_REQUEST,
  GET_PATIENTS_AUDIT_SUCCESS,
  GET_PATIENTS_AUDIT_ERROR,
  AUDIT_PATIENTS_REQUEST,
  AUDIT_PATIENTS_SUCCESS,
  AUDIT_PATIENTS_ERROR
} from "../reducers/AdminReducer";

function manageUsers() {
  return request.get("/admin/api/v1/getAllUsers/");
}

function* handleManageUsers(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(manageUsers);
    if (status === 200) {
      yield put({
        type: MANAGE_USERS_SUCCESS,
        manageUsers: data.users
      });
    } else {
      yield put({
        type: MANAGE_USERS_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("manage users error :", error.response);
    yield put({
      type: MANAGE_USERS_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function deleteUser(payload) {
  return request.post("admin/api/v1/deleteUser/", convertToFormData(payload));
}

function* handleDeleteUser(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(deleteUser, action.payload);

    if (status === 200) {
      yield put({
        type: DELETE_USER_SUCCESS,
        message: data.message,
        id: action.payload.user_id
      });
    } else {
      yield put({
        type: DELETE_USER_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("delete users error :", error.response);
    yield put({
      type: DELETE_USER_ERROR,
      error: "Something went wrong, Please try again later"
    });
  }
}

function suiteCRMContacts(payload) {
  return request.get("admin/api/v1/getSuiteCRMContacts/");
}

function* handleSuiteCRMContacts(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(suiteCRMContacts);

    if (status === 200) {
      yield put({
        type: SUITE_CRM_CONTACTS_SUCCESS,
        suiteCRMContacts: data.search_results
      });
    } else {
      yield put({
        type: SUITE_CRM_CONTACTS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Suite CRM Contacts error :", error.response);
    yield put({
      type: SUITE_CRM_CONTACTS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function sendToOpenEMR(payload) {
  return request.post(
    "admin/api/v1/sendToOpenEMR/",
    convertToFormData(payload)
  );
}

function* handleSendToOpenEMR(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(sendToOpenEMR, action.payload);

    if (status === 200) {
      yield put({
        type: SEND_TO_OPEN_EMR_SUCCESS,
        message: data.message,
        contact_id: action.payload.contact_id
      });
    } else {
      yield put({
        type: SEND_TO_OPEN_EMR_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("delete users error :", error.response);
    yield put({
      type: SEND_TO_OPEN_EMR_ERROR,
      error:
        error.response.data.message ||
        "Something went wrong, Please try again later"
    });
  }
}

function getAllAppointments(payload) {
  return request.get("/admin/api/v1/getAllAppointments/");
}

function* handleGetAllAppointments(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getAllAppointments);

    if (status === 200) {
      yield put({
        type: GET_ALL_APPOINTMENTS_SUCCESS,
        UpcomingAppointments: data.users_appointments,
        PastAppointments: data.past_appointments,
        todaysAppointment: data.today_appointments,
        thisWeekAppointment: data.this_week_appointments
      });
    } else {
      yield put({
        type: GET_ALL_APPOINTMENTS_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Suite CRM Contacts error :", error.response);
    yield put({
      type: GET_ALL_APPOINTMENTS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function getAllUsersForms(payload) {
  return request.get("/admin/api/v1/getAllUsersForms/");
}

function* handleGetAllUsersForms(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getAllUsersForms);

    if (status === 200) {
      yield put({
        type: GET_ALL_USERS_FORMS_SUCCESS,
        getAllUsersForms: data.response
      });
    } else {
      yield put({
        type: GET_ALL_USERS_FORMS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("Suite CRM Contacts error :", error.response);
    yield put({
      type: GET_ALL_USERS_FORMS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function approvePatientForm(payload) {
  return request.post(
    "/admin/api/v1/approvePatientForm/",
    convertToFormData(payload)
  );
}

function* handleApprovePatientForm(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(approvePatientForm, action.payload);

    if (status === 200) {
      yield put({
        type: APPROVE_PATIENT_FORM_SUCCESS,
        message: data.response,
        data: action.payload
      });
    } else {
      yield put({
        type: APPROVE_PATIENT_FORM_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("approve patient error :", error.response);
    yield put({
      type: APPROVE_PATIENT_FORM_ERROR,
      error: error.response || "Something went wrong, Please try again later"
    });
  }
}

function getPatientsAudit(payload) {
  return request.get("admin/api/v1/getAuditReports/");
}

function* handleGetPatientsAudit(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getPatientsAudit);

    if (status === 200) {
      yield put({
        type: GET_PATIENTS_AUDIT_SUCCESS,
        getPatientsAudit: data.reports
      });
    } else {
      yield put({
        type: GET_PATIENTS_AUDIT_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("get patients audit error :", error.response);
    yield put({
      type: GET_PATIENTS_AUDIT_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

function auditPatients(payload) {
  return request.get("admin/api/v1/getAuditPatients/");
}

function* handleAuditPatients(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(auditPatients);

    if (status === 200) {
      yield put({
        type: AUDIT_PATIENTS_SUCCESS,
        getAuditPatients: data.patients
      });
    } else {
      yield put({
        type: AUDIT_PATIENTS_ERROR,
        error: data.error || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("audit patients error :", error.response);
    yield put({
      type: AUDIT_PATIENTS_ERROR,
      error:
        error.response.error || "Something went wrong, Please try again later"
    });
  }
}

export default all([
  takeLatest(MANAGE_USERS_REQUEST, handleManageUsers),
  takeLatest(DELETE_USER_REQUEST, handleDeleteUser),
  takeLatest(SEND_TO_OPEN_EMR_REQUEST, handleSendToOpenEMR),
  takeLatest(SUITE_CRM_CONTACTS_REQUEST, handleSuiteCRMContacts),
  takeLatest(GET_ALL_APPOINTMENTS_REQUEST, handleGetAllAppointments),
  takeLatest(GET_ALL_USERS_FORMS_REQUEST, handleGetAllUsersForms),
  takeLatest(APPROVE_PATIENT_FORM_REQUEST, handleApprovePatientForm),
  takeLatest(GET_PATIENTS_AUDIT_REQUEST, handleGetPatientsAudit),
  takeLatest(AUDIT_PATIENTS_REQUEST, handleAuditPatients)
]);

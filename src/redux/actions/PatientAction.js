import {
  CREATE_PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  SAVE_PATIENT_FORM_REQUEST,
  SEARCH_DOCTORS_REQUEST,
  SCHEDULE_APPOINTMENT_REQUEST,
  GET_USER_APPOINTMENTS_REQUEST,
  GET_APPOINTMENT_DETAILS_REQUEST,
  BILLING_ENGINE_REQUEST,
  AUDIT_QUESTIONS_REQUEST,
  AUDIT_ANSWERS_REQUEST,
  LIST_OF_DOCTORS_REQUEST,
  SAVE_PATIENT_AUDIT_FORM_REQUEST,
  RESET_FLAGS
} from "../reducers/PatientReducer";

export const createProfile = payload => ({
  type: CREATE_PROFILE_REQUEST,
  payload
});

export const updateProfile = payload => ({
  type: UPDATE_PROFILE_REQUEST,
  payload
});

export const savePatientForm = payload => ({
  type: SAVE_PATIENT_FORM_REQUEST,
  payload
});

export const searchDoctors = payload => ({
  type: SEARCH_DOCTORS_REQUEST,
  payload
});

export const scheduleAppointment = payload => ({
  type: SCHEDULE_APPOINTMENT_REQUEST,
  payload
});

export const auditQuestions = payload => ({
  type: AUDIT_QUESTIONS_REQUEST,
  payload
});

export const auditAnswers = payload => ({
  type: AUDIT_ANSWERS_REQUEST,
  payload
});

export const savePatientAuditForm = payload => ({
  type: SAVE_PATIENT_AUDIT_FORM_REQUEST,
  payload
});

export const listOfDoctors = payload => ({
  type: LIST_OF_DOCTORS_REQUEST,
  payload
});

export const getUserAppointments = payload => ({
  type: GET_USER_APPOINTMENTS_REQUEST,
  payload
});

export const getAppointmentDetails = payload => ({
  type: GET_APPOINTMENT_DETAILS_REQUEST,
  payload
});

export const billingEngine = payload => ({
  type: BILLING_ENGINE_REQUEST,
  payload
});

export const resetFlags = () => ({
  type: RESET_FLAGS
});

import {
  MANAGE_USERS_REQUEST,
  SUITE_CRM_CONTACTS_REQUEST,
  SEND_TO_OPEN_EMR_REQUEST,
  DELETE_USER_REQUEST,
  GET_ALL_APPOINTMENTS_REQUEST,
  GET_ALL_USERS_FORMS_REQUEST,
  APPROVE_PATIENT_FORM_REQUEST,
  GET_PATIENTS_AUDIT_REQUEST,
  AUDIT_PATIENTS_REQUEST,
  RESET_FLAGS
} from "../reducers/AdminReducer";

export const manageUsers = payload => ({
  type: MANAGE_USERS_REQUEST,
  payload
});

export const deleteUser = payload => ({
  type: DELETE_USER_REQUEST,
  payload
});

export const suiteCRMContacts = payload => ({
  type: SUITE_CRM_CONTACTS_REQUEST,
  payload
});

export const sendToOpenEMR = payload => ({
  type: SEND_TO_OPEN_EMR_REQUEST,
  payload
});

export const getAllAppointments = payload => ({
  type: GET_ALL_APPOINTMENTS_REQUEST,
  payload
});

export const getAllUsersForms = payload => ({
  type: GET_ALL_USERS_FORMS_REQUEST,
  payload
});

export const approvePatientForm = payload => ({
  type: APPROVE_PATIENT_FORM_REQUEST,
  payload
});

export const getPatientsAudit = payload => ({
  type: GET_PATIENTS_AUDIT_REQUEST,
  payload
});

export const auditPatients = payload => ({
  type: AUDIT_PATIENTS_REQUEST,
  payload
});

export const resetFlags = () => ({
  type: RESET_FLAGS
});

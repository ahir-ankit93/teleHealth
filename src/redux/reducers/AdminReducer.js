export const MANAGE_USERS_REQUEST = "MANAGE_USERS_REQUEST";
export const MANAGE_USERS_SUCCESS = "MANAGE_USERS_SUCCESS";
export const MANAGE_USERS_ERROR = "MANAGE_USERS_ERROR";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";

export const SUITE_CRM_CONTACTS_REQUEST = "SUITE_CRM_CONTACTS_REQUEST";
export const SUITE_CRM_CONTACTS_SUCCESS = "SUITE_CRM_CONTACTS_SUCCESS";
export const SUITE_CRM_CONTACTS_ERROR = "SUITE_CRM_CONTACTS_ERROR";

export const SEND_TO_OPEN_EMR_REQUEST = "SEND_TO_OPEN_EMR_REQUEST";
export const SEND_TO_OPEN_EMR_SUCCESS = "SEND_TO_OPEN_EMR_SUCCESS";
export const SEND_TO_OPEN_EMR_ERROR = "SEND_TO_OPEN_EMR_ERROR";

export const GET_ALL_APPOINTMENTS_REQUEST = "GET_ALL_APPOINTMENTS_REQUEST";
export const GET_ALL_APPOINTMENTS_SUCCESS = "GET_ALL_APPOINTMENTS_SUCCESS";
export const GET_ALL_APPOINTMENTS_ERROR = "GET_ALL_APPOINTMENTS_ERROR";

export const GET_ALL_USERS_FORMS_REQUEST = "GET_ALL_USERS_FORMS_REQUEST";
export const GET_ALL_USERS_FORMS_SUCCESS = "GET_ALL_USERS_FORMS_SUCCESS";
export const GET_ALL_USERS_FORMS_ERROR = "GET_ALL_USERS_FORMS_ERROR";

export const APPROVE_PATIENT_FORM_REQUEST = "APPROVE_PATIENT_FORM_REQUEST";
export const APPROVE_PATIENT_FORM_SUCCESS = "APPROVE_PATIENT_FORM_SUCCESS";
export const APPROVE_PATIENT_FORM_ERROR = "APPROVE_PATIENT_FORM_ERROR";

export const GET_PATIENTS_AUDIT_REQUEST = "GET_PATIENTS_AUDIT_REQUEST";
export const GET_PATIENTS_AUDIT_SUCCESS = "GET_PATIENTS_AUDIT_SUCCESS";
export const GET_PATIENTS_AUDIT_ERROR = "GET_PATIENTS_AUDIT_ERROR";

export const AUDIT_PATIENTS_REQUEST = "AUDIT_PATIENTS_REQUEST";
export const AUDIT_PATIENTS_SUCCESS = "AUDIT_PATIENTS_SUCCESS";
export const AUDIT_PATIENTS_ERROR = "AUDIT_PATIENTS_ERROR";

export const CLEAR_STORE_REQUEST = "CLEAR_STORE_REQUEST";
export const RESET_FLAGS = "RESET_FLAGS";

const initialState = {
  errors: {
    manageUsers: null,
    deleteUser: null,
    suiteCRMContacts: null,
    sendToOpenEMR: null,
    getAllAppointments: null,
    getAllUsersForms: null,
    approvePatientForm: null,
    getPatientsAudit: null,
    auditPatients: null
  },
  flags: {
    manageUsers: false,
    deleteUser: false,
    suiteCRMContacts: false,
    sendToOpenEMR: false,
    getAllAppointments: false,
    getAllUsersForms: false,
    approvePatientForm: false,
    getPatientsAudit: false,
    auditPatients: false
  },
  users: [],
  contacts: [],
  suiteCRMContacts: []
};

export const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case MANAGE_USERS_SUCCESS:
      return {
        ...state,
        flags: { manageUsers: true },
        users: action.manageUsers
      };
    case MANAGE_USERS_ERROR:
      return {
        ...state,
        errors: { manageUsers: action.error }
      };

    case DELETE_USER_SUCCESS:
      const users = state.users;
      const index = users.findIndex(user => user.id === action.id);

      users.splice(index, 1);
      return {
        ...state,
        flags: { deleteUser: true },
        users: users
      };
    case DELETE_USER_ERROR:
      return {
        ...state,
        errors: { deleteUser: action.error }
      };

    case SUITE_CRM_CONTACTS_SUCCESS:
      return {
        ...state,
        flags: { suiteCRMContacts: true },
        suiteCRMContacts: action.suiteCRMContacts
      };
    case SUITE_CRM_CONTACTS_ERROR:
      return {
        ...state,
        errors: { suiteCRMContacts: action.error }
      };

    case SEND_TO_OPEN_EMR_SUCCESS:
      return {
        ...state,
        flags: { sendToOpenEMR: action.message }
      };
    case SEND_TO_OPEN_EMR_ERROR:
      return {
        ...state,
        errors: { sendToOpenEMR: action.error }
      };

    case CLEAR_STORE_REQUEST:
      return { ...initialState };

    case GET_ALL_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        flags: { getAllAppointments: true },
        UpcomingAppointments: action.UpcomingAppointments,
        PastAppointments: action.PastAppointments,
        todaysAppointment: action.todaysAppointment,
        thisWeekAppointment: action.thisWeekAppointment
      };
    case GET_ALL_APPOINTMENTS_ERROR:
      return {
        ...state,
        errors: { getAllAppointments: action.error }
      };

    case GET_ALL_USERS_FORMS_SUCCESS:
      return {
        ...state,
        flags: { getAllUsersForms: true },
        getAllUsersForms: action.getAllUsersForms
      };
    case GET_ALL_USERS_FORMS_ERROR:
      return {
        ...state,
        errors: { getAllUsersForms: action.error }
      };

    case APPROVE_PATIENT_FORM_SUCCESS:
      const form = action.data;
      const getAllUsersForms = state.getAllUsersForms.map(f => {
        if (f.id === form.form_id) {
          f.form_status = "Approved";
        }
        return f;
      });
      return {
        ...state,
        flags: { approvePatientForm: action.message },
        getAllUsersForms
      };
    case APPROVE_PATIENT_FORM_ERROR:
      return {
        ...state,
        errors: { approvePatientForm: action.error }
      };

    case GET_PATIENTS_AUDIT_SUCCESS:
      return {
        ...state,
        patientsAudit: action.getPatientsAudit,
        flags: { getPatientsAudit: true }
      };
    case GET_PATIENTS_AUDIT_ERROR:
      return {
        ...state,
        errors: { getPatientsAudit: action.error }
      };

    case AUDIT_PATIENTS_SUCCESS:
      return {
        ...state,
        auditPatients: action.getAuditPatients,
        flags: { auditPatients: true }
      };
    case AUDIT_PATIENTS_ERROR:
      return {
        ...state,
        errors: { auditPatients: action.error }
      };

    case RESET_FLAGS:
      return {
        ...state,
        errors: {
          manageUsers: null,
          deleteUser: null,
          suiteCRMContacts: null,
          sendToOpenEMR: null,
          getAllAppointments: null,
          getAllUsersForms: null,
          approvePatientForm: null,
          getPatientsAudit: null,
          auditPatients: null,
          addPhone: null
        },
        flags: {
          manageUsers: false,
          deleteUser: false,
          suiteCRMContacts: false,
          getAllAppointments: false,
          getAllUsersForms: false,
          sendToOpenEMR: false,
          approvePatientForm: false,
          getPatientsAudit: false,
          auditPatients: false,
          addPhoneSuccess: false
        }
      };
    default:
      return state;
  }
};

import moment from "moment";

export const CREATE_PROFILE_REQUEST = "CREATE_PROFILE_REQUEST";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const SEARCH_DOCTORS_REQUEST = "SEARCH_DOCTORS_REQUEST";
export const SEARCH_DOCTORS_SUCCESS = "SEARCH_DOCTORS_SUCCESS";
export const SEARCH_DOCTORS_ERROR = "SEARCH_DOCTORS_ERROR";

export const SCHEDULE_APPOINTMENT_REQUEST = "SCHEDULE_APPOINTMENT_REQUEST";
export const SCHEDULE_APPOINTMENT_SUCCESS = "SCHEDULE_APPOINTMENT_SUCCESS";
export const SCHEDULE_APPOINTMENT_ERROR = "SCHEDULE_APPOINTMENT_ERROR";

export const GET_USER_APPOINTMENTS_REQUEST = "GET_USER_APPOINTMENTS_REQUEST";
export const GET_USER_APPOINTMENTS_SUCCESS = "GET_USER_APPOINTMENTS_SUCCESS";
export const GET_USER_APPOINTMENTS_ERROR = "GET_USER_APPOINTMENTS_ERROR";

export const GET_APPOINTMENT_DETAILS_REQUEST =
  "GET_APPOINTMENT_DETAILS_REQUEST";
export const GET_APPOINTMENT_DETAILS_SUCCESS =
  "GET_APPOINTMENT_DETAILS_SUCCESS";
export const GET_APPOINTMENT_DETAILS_ERROR = "GET_APPOINTMENT_DETAILS_ERROR";

export const BILLING_ENGINE_REQUEST = "BILLING_ENGINE_REQUEST";
export const BILLING_ENGINE_SUCCESS = "BILLING_ENGINE_SUCCESS";
export const BILLING_ENGINE_ERROR = "BILLING_ENGINE_ERROR";

export const SAVE_PATIENT_FORM_REQUEST = "SAVE_PATIENT_FORM_REQUEST";
export const SAVE_PATIENT_FORM_SUCCESS = "SAVE_PATIENT_FORM_SUCCESS";
export const SAVE_PATIENT_FORM_ERROR = "SAVE_PATIENT_FORM_ERROR";

export const AUDIT_QUESTIONS_REQUEST = "AUDIT_QUESTIONS_REQUEST";
export const AUDIT_QUESTIONS_SUCCESS = "AUDIT_QUESTIONS_SUCCESS";
export const AUDIT_QUESTIONS_ERROR = "AUDIT_QUESTIONS_ERROR";

export const AUDIT_ANSWERS_REQUEST = "AUDIT_ANSWERS_REQUEST";
export const AUDIT_ANSWERS_SUCCESS = "AUDIT_ANSWERS_SUCCESS";
export const AUDIT_ANSWERS_ERROR = "AUDIT_ANSWERS_ERROR";

export const LIST_OF_DOCTORS_REQUEST = "LIST_OF_DOCTORS_REQUEST";
export const LIST_OF_DOCTORS_SUCCESS = "LIST_OF_DOCTORS_SUCCESS";
export const LIST_OF_DOCTORS_ERROR = "LIST_OF_DOCTORS_ERROR";

export const SAVE_PATIENT_AUDIT_FORM_REQUEST =
  "SAVE_PATIENT_AUDIT_FORM_REQUEST";
export const SAVE_PATIENT_AUDIT_FORM_SUCCESS =
  "SAVE_PATIENT_AUDIT_FORM_SUCCESS";
export const SAVE_PATIENT_AUDIT_FORM_ERROR = "SAVE_PATIENT_AUDIT_FORM_ERROR";

export const CLEAR_STORE_REQUEST = "CLEAR_STORE_REQUEST";

export const RESET_FLAGS = "RESET_FLAGS";

const initialState = {
  errors: {
    createProfile: null,
    updateProfile: null,
    searchDoctors: null,
    scheduleAppointment: null,
    getUserAppointments: null,
    getAppointmentDetails: null,
    billingEngine: null,
    savePatientForm: null,
    auditQuestions: null,
    auditAnswers: null,
    savePatientAuditForm: null,
    listOfDoctors: null
  },
  flags: {
    createProfile: false,
    updateProfile: false,
    searchDoctors: false,
    scheduleAppointment: false,
    getUserAppointments: false,
    getAppointmentDetails: false,
    billingEngine: false,
    savePatientForm: false,
    auditQuestions: false,
    auditAnswers: false,
    savePatientAuditForm: false,
    listOfDoctors: false
  },
  searchResults: [],
  // listOfDoctors: [],
  MyAppointments: [],
  answers: [],
  questions: []
};

export const PatientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        createdProfile: action.message,
        flags: { createProfile: true }
      };
    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        errors: { createProfile: action.error }
      };

    case CLEAR_STORE_REQUEST:
      return { ...initialState };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfile: action.updateProfile,
        flags: { updateProfile: action.updateProfile }
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        errors: { updateProfile: action.error }
      };

    case SEARCH_DOCTORS_SUCCESS:
      return {
        ...state,
        searchResults: action.searchDoctors
      };
    case SEARCH_DOCTORS_ERROR:
      return {
        ...state,
        errors: { searchDoctors: action.error }
      };

    case SCHEDULE_APPOINTMENT_SUCCESS:
      const min = action.data.visit_type;
      const date = new Date(
        action.data.eventDate + " " + action.data.startTime
      );
      const newDate = moment(date).add("minutes", min);
      const etime = moment(newDate).format("HH:mm:00");
      const events = {
        pc_eventDate: action.data.eventDate,
        pc_startTime: action.data.startTime,
        pc_endTime: etime
      };

      return {
        ...state,
        searchResults: null,
        MyAppointments: [...state.MyAppointments, events],
        flags: { scheduleAppointment: action.message }
      };
    case SCHEDULE_APPOINTMENT_ERROR:
      return {
        ...state,
        errors: { scheduleAppointment: action.error }
      };

    case GET_USER_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        MyAppointments: action.getAllUsersAppointments,
        currentUserAppointments: action.getUserAppointments,
        MyPastAppointments: action.getUserPastAppointments,
        flags: { getUserAppointments: true }
      };
    case GET_USER_APPOINTMENTS_ERROR:
      return {
        ...state,
        errors: { getUserAppointments: action.error }
      };

    case GET_APPOINTMENT_DETAILS_SUCCESS:
      return {
        ...state,
        AppointmentDetails: action.getAppointmentDetails,
        flags: { getAppointmentDetails: true }
      };
    case GET_APPOINTMENT_DETAILS_ERROR:
      return {
        ...state,
        errors: { getAppointmentDetails: action.error }
      };

    case BILLING_ENGINE_SUCCESS:
      return {
        ...state,
        flags: { billingEngine: action.message }
      };
    case BILLING_ENGINE_ERROR:
      return {
        ...state,
        errors: { billingEngine: action.error }
      };

    case SAVE_PATIENT_FORM_SUCCESS:
      return {
        ...state,
        flags: { savePatientForm: action.message }
      };
    case SAVE_PATIENT_FORM_ERROR:
      return {
        ...state,
        errors: { savePatientForm: action.error }
      };

    case AUDIT_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: action.auditQuestions,
        flags: { auditQuestions: true }
      };
    case AUDIT_QUESTIONS_ERROR:
      return {
        ...state,
        errors: { auditQuestions: action.error }
      };

    case AUDIT_ANSWERS_SUCCESS:
      return {
        ...state,
        answers: action.auditAnswers,
        flags: { auditAnswers: true }
      };
    case AUDIT_ANSWERS_ERROR:
      return {
        ...state,
        errors: { auditAnswers: action.error }
      };

    case SAVE_PATIENT_AUDIT_FORM_SUCCESS:
      return {
        ...state,
        flags: { savePatientAuditForm: action.message }
      };
    case SAVE_PATIENT_AUDIT_FORM_ERROR:
      return {
        ...state,
        errors: { savePatientAuditForm: action.error }
      };

    case LIST_OF_DOCTORS_SUCCESS:
      return {
        ...state,
        listOfDoctors: action.listOfDoctors,
        flags: { listOfDoctors: true }
      };
    case LIST_OF_DOCTORS_ERROR:
      return {
        ...state,
        errors: { listOfDoctors: action.error }
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

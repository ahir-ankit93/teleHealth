export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const GET_USER_DETAIL_REQUEST = "GET_USER_DETAIL_REQUEST";
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";
export const GET_USER_DETAIL_ERROR = "GET_USER_DETAIL_ERROR";

export const ADMIN_LOGIN_REQUEST = "ADMIN_LOGIN_REQUEST";
export const ADMIN_LOGIN_SUCCESS = "ADMIN_LOGIN_SUCCESS";
export const ADMIN_LOGIN_ERROR = "ADMIN_LOGIN_ERROR";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_ERROR = "FORGOT_PASSWORD_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const ADMIN_LOGOUT_REQUEST = "ADMIN_LOGOUT_REQUEST";
export const ADMIN_LOGOUT_SUCCESS = "ADMIN_LOGOUT_SUCCESS";
export const ADMIN_LOGOUT_ERROR = "ADMIN_LOGOUT_ERROR";

export const CLEAR_STORE_REQUEST = "CLEAR_STORE_REQUEST";
export const CLEAR_STORE_SUCCESS = "CLEAR_STORE_SUCCESS";
export const CLEAR_STORE_ERROR = "CLEAR_STORE_ERROR";

export const TOGGLE_MOBILE_MENU = "TOGGLE_MOBILE_MENU";
export const RESET_FLAGS = "RESET_FLAGS";

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (!user) {
    return;
  }
  return user && JSON.parse(user);
};

const initialState = {
  user: getUserFromLocalStorage(),
  showMobileMenu: false,
  errors: {
    login: null,
    adminLogin: null,
    register: null,
    forgotPassword: null,
    resetPassword: null,
    logout: null,
    getUserDetail: null,
    adminLogout: null,
    clearStore: null
  },
  flags: {
    loginSuccess: false,
    adminLogin: false,
    registerSuccess: false,
    forgotPasswordSuccess: false,
    resetPassword: false,
    logout: false,
    getUserDetail: false,
    adminLogout: false,
    clearStore: false
  }
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return { ...state, flags: { registerSuccess: true }, user: action.user };
    case USER_REGISTER_ERROR:
      return { ...state, errors: { register: action.error } };
    case USER_LOGIN_SUCCESS:
      return { ...state, user: action.user, flags: { loginSuccess: true } };
    case USER_LOGIN_ERROR:
      return { ...state, errors: { login: action.error } };

    case ADMIN_LOGIN_SUCCESS:
      return { ...state, admin: action.admin, flags: { adminLogin: true } };
    case ADMIN_LOGIN_ERROR:
      return { ...state, errors: { adminLogin: action.error } };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, flags: { forgotPasswordSuccess: true } };
    case FORGOT_PASSWORD_ERROR:
      return { ...state, errors: { forgotPassword: action.error } };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, flags: { resetPasswordSuccess: true } };
    case RESET_PASSWORD_ERROR:
      return { ...state, errors: { resetPassword: action.error } };
    case LOGOUT_SUCCESS:
      return { ...state, flags: { logout: true } };
    case LOGOUT_ERROR:
      return { ...state, errors: { logout: action.error } };

    case ADMIN_LOGOUT_SUCCESS:
      return { ...state, flags: { adminLogout: true } };
    case ADMIN_LOGOUT_ERROR:
      return { ...state, errors: { adminLogout: action.error } };

    case CLEAR_STORE_REQUEST:
      return { ...initialState };

    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        getUser: action.getUserDetail,
        userDetails: action.userDetails,
        flags: { getUserDetail: true }
      };
    case GET_USER_DETAIL_ERROR:
      return { ...state, errors: { getUserDetail: action.error } };

    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        TOGGLE_MOBILE_MENU,
        showMobileMenu: !state.showMobileMenu
      };
    case RESET_FLAGS:
      return {
        ...state,
        errors: {
          login: null,
          adminLogin: null,
          register: null,
          adminLogout: null,
          getUserDetail: null,
          clearStore: null,
          addPhone: null
        },
        flags: {
          loginSuccess: false,
          adminLogin: false,
          registerSuccess: false,
          adminLogout: false,
          getUserDetail: false,
          clearStore: false,
          addPhoneSuccess: false
        }
      };
    default:
      return state;
  }
};

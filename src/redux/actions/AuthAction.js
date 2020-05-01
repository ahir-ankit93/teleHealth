import {
  USER_LOGIN_REQUEST,
  ADMIN_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  GET_USER_DETAIL_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  LOGOUT_REQUEST,
  ADMIN_LOGOUT_REQUEST,
  CLEAR_STORE_REQUEST,
  TOGGLE_MOBILE_MENU,
  RESET_FLAGS
} from "../reducers/AuthReducer";

export const login = payload => ({
  type: USER_LOGIN_REQUEST,
  payload
});

export const getUserDetail = payload => ({
  type: GET_USER_DETAIL_REQUEST,
  payload
});

export const adminLogin = payload => ({
  type: ADMIN_LOGIN_REQUEST,
  payload
});

export const register = payload => ({
  type: USER_REGISTER_REQUEST,
  payload
});

export const forgotPassword = payload => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload
});

export const resetPassword = payload => ({
  type: RESET_PASSWORD_REQUEST,
  payload
});

export const logout = () => ({
  type: LOGOUT_REQUEST
});

export const clearStore = () => ({
  type: CLEAR_STORE_REQUEST
});

export const adminLogout = () => ({
  type: ADMIN_LOGOUT_REQUEST
});

export const toggleMobileMenu = () => ({
  type: TOGGLE_MOBILE_MENU
});

export const resetFlags = () => ({
  type: RESET_FLAGS
});

import { all, takeLatest, put, call } from "redux-saga/effects";
import { request, setupHttpConfig, convertToFormData } from "../../utils/http";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_ERROR,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  ADMIN_LOGOUT_REQUEST,
  ADMIN_LOGOUT_SUCCESS,
  ADMIN_LOGOUT_ERROR,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_ERROR
} from "../reducers/AuthReducer";
import { getSimplifiedError } from "../../utils/error";

function login(payload) {
  return request.post("api/token/", convertToFormData(payload));
}

function* handleLogin(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(login, action.payload);

    if (status === 200) {
      localStorage.setItem("token", data.access);

      setupHttpConfig();
      yield put({
        type: USER_LOGIN_SUCCESS,
        user: data.user
      });
    } else {
      yield put({
        type: USER_LOGIN_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    yield put({
      type: USER_LOGIN_ERROR,
      error:
        error.response.data.detail ||
        "Something went wrong, Please try again later"
    });
  }
}

function adminLogin(payload) {
  return request.post("/admin/api/v1/login/", convertToFormData(payload));
}

function* handleAdminLogin(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(adminLogin, action.payload);

    if (status === 200) {
      localStorage.setItem("admin", JSON.stringify(data.response));

      setupHttpConfig();
      yield put({
        type: ADMIN_LOGIN_SUCCESS,
        admin: data.admin
      });
    } else {
      yield put({
        type: ADMIN_LOGIN_ERROR,
        error: data.detail || "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    yield put({
      type: ADMIN_LOGIN_ERROR,
      error:
        error.response.data.error ||
        "Something went wrong, Please try again later"
    });
  }
}

function register(payload) {
  return request.post("/user/api/v1/register/", convertToFormData(payload));
}

function* handleRegister(action) {
  try {
    //setupHttpConfig();
    const { status } = yield call(register, action.payload);

    if (status === 200) {
      yield put({
        type: USER_REGISTER_SUCCESS
      });
    } else {
      yield put({
        type: USER_REGISTER_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("signup error :", error.response);
    yield put({
      type: USER_REGISTER_ERROR,
      error:
        error.response.data.error ||
        "Something went wrong, Please try again later"
    });
  }
}

function forgotPassword(payload) {
  return request.post(
    "/user/api/v1/resetPasswordToken/",
    convertToFormData(payload)
  );
}

function* handleForgotPassword(action) {
  try {
    const { status } = yield call(forgotPassword, action.payload);

    if (status === 200) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS
      });
    } else {
      yield put({
        type: FORGOT_PASSWORD_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("forgot password error :", error.response);
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later"
    });
  }
}

function resetPassword(payload) {
  return request.post(
    "/user/api/v1/userPasswordReset/",
    convertToFormData(payload)
  );
}

function* handleResetPassword(action) {
  try {
    const { status } = yield call(resetPassword, action.payload);

    if (status === 200) {
      yield put({
        type: RESET_PASSWORD_SUCCESS
      });
    } else {
      yield put({
        type: RESET_PASSWORD_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("reset password error :", error.response);
    yield put({
      type: RESET_PASSWORD_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later"
    });
  }
}

function logout() {
  return request.post(`/signout/`);
}

function* handleLogout() {
  try {
    const { status } = yield call(logout);

    if (status === 200) {
      yield put({
        type: LOGOUT_SUCCESS
      });
      localStorage.clear();
      window.location.reload();
    } else {
      yield put({
        type: LOGOUT_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("logout error :", error.response);
    yield put({
      type: LOGOUT_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later"
    });
  }
}

function adminLogout() {
  return request.post("/admin/api/v1/logout/");
}

function* handleAdminLogout() {
  try {
    const { status } = yield call(adminLogout);

    if (status === 200) {
      yield put({
        type: ADMIN_LOGOUT_SUCCESS
      });
      localStorage.clear();
      window.location.reload();
    } else {
      yield put({
        type: ADMIN_LOGOUT_ERROR,
        error: "Something went wrong, Please try again later"
      });
    }
  } catch (error) {
    console.log("logout error :", error.response);
    yield put({
      type: ADMIN_LOGOUT_ERROR,
      error:
        getSimplifiedError(error) ||
        "Something went wrong, Please try again later"
    });
  }
}

function getUserDetail(payload) {
  return request.get("/user/api/v1/getLoggedInUser/");
}

function* handleGetUserDetail(action) {
  try {
    setupHttpConfig();
    const { status, data } = yield call(getUserDetail);
    if (status === 200) {
      setupHttpConfig();
      yield put({
        type: GET_USER_DETAIL_SUCCESS,
        getUserDetail: data.openemr_data[0],
        userDetails: data.response
      });
    } else {
      yield put({
        type: GET_USER_DETAIL_ERROR,
        error: data.detail
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_DETAIL_ERROR,
      error: error.response.data.error
    });
  }
}

export default all([
  takeLatest(USER_LOGIN_REQUEST, handleLogin),
  takeLatest(ADMIN_LOGIN_REQUEST, handleAdminLogin),
  takeLatest(USER_REGISTER_REQUEST, handleRegister),
  takeLatest(FORGOT_PASSWORD_REQUEST, handleForgotPassword),
  takeLatest(RESET_PASSWORD_REQUEST, handleResetPassword),
  takeLatest(LOGOUT_REQUEST, handleLogout),
  takeLatest(ADMIN_LOGOUT_REQUEST, handleAdminLogout),
  takeLatest(GET_USER_DETAIL_REQUEST, handleGetUserDetail)
]);

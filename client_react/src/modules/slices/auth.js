import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/auth";
import * as selectAPI from "../../lib/api/select/select";
import createRequestSaga from "../../lib/createRequestSaga";
import { call } from "redux-saga/effects";
const REGISTER = "user/register";
const LOGIN = "user/login";
const SELECT = "user/selectCompany";

function* logoutSaga(action) {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}

const registerSaga = createRequestSaga(REGISTER, authAPI.registerUser);
const loginSaga = createRequestSaga(LOGIN, authAPI.loginUser);
const selectSaga = createRequestSaga(SELECT, selectAPI.selectCompany);
export function* authSaga() {
  yield takeLatest(register, registerSaga);
  yield takeLatest(login, loginSaga);
  yield takeLatest(logout, logoutSaga);
  yield takeLatest(selectCompany, selectSaga);
}
export const authSlice = createSlice({
  name: "user",
  initialState: {
    error: "",
    user: null,
    register: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      lastname: "",
      role: "",
      image: "",
      token: "",
      tokenExp: "",
    },
    login: {
      error: "",
      email: "",
      password: "",
    },
  },

  reducers: {
    initialize: (state, action) => ({
      ...state,
      userData: action.payload,
    }),
    inputData: (state, action) => {
      const { form, key, value } = action.payload;
      if (form === "login") {
        state.login[key] = value;
      } else if (form === "register") {
        state.register[key] = value;
      }
    },

    register: (state, action) => {},
    registersuccess: (state, action) => {
      const success = action.payload.registerSuccess;
      if (success) {
      } else {
        state.error = action.payload.message;
      }
    },
    registerfailure: (state, action) => {},

    login: (state, action) => {
      state.error = "";
    },
    loginsuccess: (state, action) => {
      const success = action.payload.loginSuccess;
      if (success) {
        state.user = action.payload.Data;
        localStorage.setItem("user", JSON.stringify(action.payload.Data));
      } else {
        state.error = action.payload.message;
      }
    },

    loginfailure: (state, action) => {},

    loadList: (state, action) => {},
    loadListsuccess: (state, action) => ({
      list: action.payload,
      error: false,
    }),
    loadListfailure: (state, action) => ({
      error: true,
    }),
    tempsetuser: (state, action) => ({
      ...state,
      user: action.payload,
    }),

    logout: (state, action) => ({
      ...state,
      login: {
        error: "",
        email: "",
        password: "",
      },

      user: null,
    }),
    selectCompany: (state, action) => {
      state.user.company = action.payload.company;
      const loc = Object.assign(JSON.parse(localStorage.getItem("user")), {
        company: action.payload.company,
      });
      localStorage.setItem("user", JSON.stringify(loc));
    },
    selectCompanysuccess: (state, action) => {
      state.user.recommendation = action.payload.data;

      const loc = Object.assign(JSON.parse(localStorage.getItem("user")), {
        recommendation: action.payload.data,
      });
      localStorage.setItem("user", JSON.stringify(loc));
    },
    selectCompanyfailure: (state, action) => {},
  },
});

export const {
  initialize,
  register,
  login,
  inputData,
  tempsetuser,
  check,
  checksuccess,
  checkfailure,
  logout,
  selectCompany,
  selectCompanysucceses,
  selectCompanyfailure,
} = authSlice.actions;
export const selectError = (state) => state.user.error;
export const selectUser = (state) => state.user.user;
export const selectLoginInput = (state) => state.user.login;
export const selectRegisterInput = (state) => state.user.register;
export const selectRecommendation = (state) => state.user.user.recommendation;
export default authSlice.reducer;

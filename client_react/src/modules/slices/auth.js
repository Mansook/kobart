import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/auth";

import createRequestSaga from "../../lib/createRequestSaga";

const REGISTER = "user/register";
const LOGIN = "user/login";

const registerSaga = createRequestSaga(REGISTER, authAPI.registerUser);
const loginSaga = createRequestSaga(LOGIN, authAPI.loginUser);

export const authSlice = createSlice({
  name: "user",
  initialState: {
    error: false,
    userData: [],
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
    registersuccess: (state, action) => ({
      ...state,
    }),
    registerfailure: (state, action) => {},

    login: (state, action) => {},
    loginsuccess: (state, action) => ({ ...state, userData: action.payload }),
    loginfailure: (state, action) => {},

    loadList: (state, action) => {},
    loadListsuccess: (state, action) => ({
      list: action.payload,
      error: false,
    }),
    loadListfailure: (state, action) => ({
      error: true,
    }),
  },
});
export function* authSaga() {
  yield takeLatest(register, registerSaga);
  yield takeLatest(login, loginSaga);
}

export const { initialize, register, login, inputData } = authSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectLoginInput = (state) => state.user.login;
export const selectRegisterInput = (state) => state.user.register;
export default authSlice.reducer;

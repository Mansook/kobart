import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/auth";

import createRequestSaga from "../../lib/createRequestSaga";

const REGISTER = "user/register";
const LOGIN = "user/login";

const registerSaga = createRequestSaga(REGISTER, authAPI.registerUser);
const loginSaga = createRequestSaga(LOGIN, authAPI.loginUser);

export const authSlice = createSlice({
  name: "auth",
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
      email: "",
      password: "",
    },
  },

  reducers: {
    inputData: (state, action) => {
      const { form, key, value } = action.payload;
      if (form === "login") {
        if (key === "email") {
          state.login.email = value;
        } else if (key === "password") {
          state.login.password = value;
        }
      } else if (form === "register") {
        state.register[key] = value;
      }
    },

    register: (state, action) => {},
    registersuccess: (state, action) => ({
      userData: action.payload,
    }),
    registerfailure: (state, action) => {},

    login: (state, action) => {},
    loginsuccess: (state, action) => {},
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

export const { register, login, inputData } = authSlice.actions;
export const selectUserData = (state) => state.user.userData;
export const selectLoginInput = (state) => state.user.login;
export const selectRegisterInput = (state) => state.user.register;
export default authSlice.reducer;

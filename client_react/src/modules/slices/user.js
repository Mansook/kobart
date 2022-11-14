import { createSlice } from "@reduxjs/toolkit";
import { call, takeLatest } from "redux-saga/effects";
import * as authAPI from "../../lib/api/auth/auth";

import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("user/check");
const checkSaga = createRequestSaga(CHECK, authAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log("local storage not working");
  }
}

function* logoutSaga(action) {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(check, checkSaga);
  yield takeLatest(checkfailure, checkFailureSaga);
  yield takeLatest(logout, logoutSaga);
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    checkError: null,
  },

  reducers: {
    tempsetuser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    check: (state, action) => {},
    checksuccess: (state, action) => ({
      ...state,
      checkError: null,
      user: action.payload,
    }),
    checkfailure: (state, action) => ({
      ...state,
      user: null,
      checkError: true,
    }),
    logout: (state, action) => ({
      ...state,
      user: null,
    }),
  },
});
export const { tempsetuser, check, checksuccess, checkfailure, logout } =
  userSlice.actions;
export const selectUser = (state) => state.user.userData;
export default userSlice.reducer;

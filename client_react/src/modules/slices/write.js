import { createSlice } from "@reduxjs/toolkit";
import createRequestSaga from "../../lib/createRequestSaga";
import * as writeAPI from "../../lib/api/write/write";
import { takeLatest } from "redux-saga/effects";

const POST = "write/writepost";
const UPDATE = "write/updatepost";
const writepostSaga = createRequestSaga(POST, writeAPI.writePost);
const updatepostSaga = createRequestSaga(UPDATE, writeAPI.updatePost);
export function* writeSaga() {
  yield takeLatest(writepost, writepostSaga);
}
export function* updateSaga() {
  yield takeLatest(updatepost, updatepostSaga);
}
export const writeSlice = createSlice({
  name: "write",
  initialState: {
    title: "",
    body: "",
    reporter: "",
    tags: [],
    date: "",
    image: "",
    post: null,
    postError: null,
    originalPostId: null,
  },

  reducers: {
    initialize: (state, action) => ({
      title: "",
      body: "",
      reporter: "",
      image: "",
      date: "",
      tags: [],
      post: null,
      postError: null,
      originalPostId: null,
    }),
    changefield: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    writepost: (state, action) => ({
      ...state,
      post: null,
      postError: null,
    }),
    writepostsuccess: (state, action) => ({
      ...state,
      post: action.payload,
      postError: null,
    }),
    writepostfailure: (state, action) => ({
      ...state,
      postError: true,
    }),
    setoriginalpost: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
    updatepost: (state, action) => {},
    updatepostsuccess: (state, action) => ({
      post: action.payload,
      postError: null,
    }),
    updatepostfailure: (state, action) => ({
      ...state,
      postError: true,
    }),
  },
});
export const {
  initialize,
  changefield,
  writepost,
  writepostsuccess,
  writepostfailure,
  setoriginalpost,
  updatepost,
  updatepostsuccess,
  updatepostfailure,
} = writeSlice.actions;
export const selectTag = (state) => state.write.tags;
export const selectWrite = (state) => state.write;
export const selectOriginalPostId = (state) => state.write.originalPostId;
export default writeSlice.reducer;

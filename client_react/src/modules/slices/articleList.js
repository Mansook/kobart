import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import * as articleAPI from "../../lib/api/article/article";

import createRequestSaga from "../../lib/createRequestSaga";

const LOADLIST = "list/loadList";
const loadListSaga = createRequestSaga(LOADLIST, articleAPI.readArticles);

export const articleListSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    error: false,
  },

  reducers: {
    loadList: (state, action) => {},
    loadListsuccess: (state, action) => ({
      list: action.payload.data,
      error: false,
    }),
    loadListfailure: (state, action) => ({
      error: true,
    }),
  },
});

export function* articleListSaga() {
  yield takeLatest(loadList, loadListSaga);
}

export const { loadList } = articleListSlice.actions;
export const selectArticleList = (state) => state.articles.list;
export default articleListSlice.reducer;

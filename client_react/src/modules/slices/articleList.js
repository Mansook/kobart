import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import * as articleAPI from "../../lib/api/article/article";

import createRequestSaga from "../../lib/createRequestSaga";

const LOADLIST = "list/loadList";
const LOADRECLIST = "list/loadRecList";

const loadListSaga = createRequestSaga(LOADLIST, articleAPI.readArticles);
const loadRecListSaga = createRequestSaga(
  LOADRECLIST,
  articleAPI.readArticleById
);
export const articleListSlice = createSlice({
  name: "list",
  initialState: {
    list: [],
    recList: [],
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

    loadRecList: (state, action) => {},
    loadRecListsuccess: (state, action) => {
      state.recList = action.payload;
    },
    loadRecListfailure: (state, action) => {},
  },
});

export function* articleListSaga() {
  yield takeLatest(loadList, loadListSaga);
  yield takeLatest(loadRecList, loadRecListSaga);
}

export const { loadList, loadRecList } = articleListSlice.actions;
export const selectArticleList = (state) => state.articles.list;
export const selectRecArticleList = (state) => state.articles.recList;
export default articleListSlice.reducer;

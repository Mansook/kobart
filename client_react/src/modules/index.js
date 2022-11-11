import { all } from "redux-saga/effects";
import { articleListSaga } from "./slices/articleList";
import { authSaga } from "./slices/auth";

export function* rootSaga() {
  yield all([articleListSaga(), authSaga()]);
}

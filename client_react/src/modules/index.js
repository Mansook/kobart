import { all } from "redux-saga/effects";
import { articleListSaga } from "./slices/articleList";

export function* rootSaga() {
  yield all([articleListSaga()]);
}

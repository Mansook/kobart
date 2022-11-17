import { all } from "redux-saga/effects";
import { articleListSaga } from "./slices/articleList";
import { authSaga } from "./slices/auth";
import { updateSaga, writeSaga } from "./slices/write";

export function* rootSaga() {
  yield all([articleListSaga(), authSaga(), writeSaga(), updateSaga()]);
}

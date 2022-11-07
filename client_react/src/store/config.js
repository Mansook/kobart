import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../modules";
import loadingReducer from "../modules/slices/loading";
import loadArticleListReducer from "../modules/slices/articleList";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    articles: loadArticleListReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

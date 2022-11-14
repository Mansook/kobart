import "./App.css";

import { Routes, Route } from "react-router-dom";
import LoginContainer from "./container/auth/LoginContainer";
import ArticleListContainer from "./container/articles/ArticleListContainer";
import RegisterContainer from "./container/auth/RegisterContainer";
import Article from "./components/articles/Article";
import SelectFormContainer from "./container/select/SelectFormContainer";
// css 적용하기
import "./App.css";
import LogoutContainer from "./container/auth/LogoutContainer";

const App = () => {
  return (
    <div className="main_box">
      <div>
        <div>헤더</div>
        <div>
          <LogoutContainer />
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/post" element={<ArticleListContainer />} />
        <Route path="/post/selection" element={<SelectFormContainer />} />
        <Route path="/post/:articleId" element={<Article />} />
      </Routes>
      <div>푸터</div>
    </div>
  );
};

export default App;

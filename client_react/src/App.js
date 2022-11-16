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
import NavBar from "./components/views/NavBar/NavBar";
import RecArticleListContainer from "./container/articles/RecArticleListContainer";

const App = () => {
  return (
    <div className="main_box">
      <div>
        <LogoutContainer />
      </div>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/post" element={<ArticleListContainer />} />
        <Route path="/post/selection" element={<SelectFormContainer />} />
        <Route path="/post/:articleId" element={<Article />} />
        <Route path="/post/recommended" element={<RecArticleListContainer />} />
      </Routes>
      <div>
        <NavBar />
      </div>
    </div>
  );
};

export default App;

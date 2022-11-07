import "./App.css";
import ArticleList from "./components/articles/ArticleList";
import { Routes, Route } from "react-router-dom";
import LoginContainer from "./container/auth/LoginContainer";
import ArticleListContainer from "./container/articles/ArticleListContainer";
import Article from "./components/articles/Article";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

const App = () => {
  return (
    <div>
      <div>헤더</div>
      <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>
        {/* <Route path="/" element={<LoginContainer />} /> */}
        {/* <Route path="/login" element={<LoginContainer />} /> */}
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/register" element = {<RegisterPage/>}/>
        <Route path="/post" element={<ArticleListContainer />} />
        <Route path="/post/:articleId" element={<Article />} />
      </Routes>
      <div>푸터</div>
    </div>
  );
};

export default App;

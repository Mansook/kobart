import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../modules/slices/auth";
import "./home.css";

function Home() {
  const user = useSelector(selectUser);

  return (
    <div className="home">
      <div className="news_logo"></div>
      {user ? (
        <div>{user.email} 님 안녕하세요</div>
      ) : (
        <div>좌측 상단 버튼을 눌러 로그인 해주세요</div>
      )}
      <div className="bart_logo"></div>
    </div>
  );
}

export default Home;

import React from "react";
import LogoutContainer from "../../../container/auth/LogoutContainer";
import { RiArticleLine } from "react-icons/ri";
import "./navBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav id="mainBar">
      <RiArticleLine
        style={{
          height: "50px",
          width: "50px",
          cursor: "pointer",
        }}
      />

      <div className="subBar">
        <NavLink to="/post/recommended">추천기사</NavLink>
        <NavLink>몰?루</NavLink>
        <NavLink>미니게임</NavLink>
      </div>
      <div className="subBar">
        <div>사용자정보</div>
        <div>설정</div>
      </div>
    </nav>
  );
};

export default NavBar;

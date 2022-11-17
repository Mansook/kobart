import React from "react";
import LogoutContainer from "../../../container/auth/LogoutContainer";
import { RiArticleLine } from "react-icons/ri";
import "./navBar.css";
import { NavLink } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { IoMdThumbsUp } from "react-icons/io";



const NavBar = () => {
  return (
    <nav id="mainBar">
      <div className="subBar">
        <div className="sub_box">
          <NavLink to="/">
          <IoIosHome
            style={{
              height: "40px",
              width: "40px",
              cursor: "pointer",
              margin: "8px",
              color: "black"
            }}
          />
            </NavLink>
        </div>
        <div className="sub_box">
          <NavLink to="/post">
          <RiArticleLine
            style={{
              height: "40px",
              width: "40px",
              cursor: "pointer",
              margin: "8px",
              color: "black"
            }}
          />
            </NavLink>
        </div>
        <div className="sub_box">
          <NavLink to="/post/recommended">
          <IoMdThumbsUp
            style={{
              height: "40px",
              width: "40px",
              cursor: "pointer",
              margin: "8px",
              color: "black"
            }}
          />
            </NavLink>
        </div>
        <div className="sub_box_last">
          <NavLink>
          <IoMdCreate
            style={{
              height: "40px",
              width: "40px",
              cursor: "pointer",
              margin: "8px",
              color: "black"
            }}
          />
            </NavLink>
        </div>
      </div>
      {/* <div className="subBar">
        <div>사용자정보</div>
        <div>설정</div>
      </div> */}
    </nav>
  );
};

export default NavBar;

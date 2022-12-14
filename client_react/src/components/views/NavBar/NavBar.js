import React from "react";
import LogoutContainer from "../../../container/auth/LogoutContainer";
import { RiArticleLine } from "react-icons/ri";
import "./navBar.css";
import { NavLink } from "react-router-dom";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { IoIosHome } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { IoMdThumbsUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "../../../modules/slices/auth";

const NavBar = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <nav id="mainBar">
      <div className="subBar">
        <div className="sub_box">
          <NavLink to="/">
            <IoIosHome
              style={{
                height: "35px",
                width: "35px",
                cursor: "pointer",
                margin: "4px",
                color: "black",
              }}
            />
          </NavLink>
        </div>
        <div className="sub_box">
          <NavLink to="/post?page=1&limit=15">
            <RiArticleLine
              style={{
                height: "35px",
                width: "40px",
                cursor: "pointer",
                margin: "4px",
                color: "black",
              }}
            />
          </NavLink>
        </div>
        <div className="sub_box">
          <NavLink to="/post/recommended">
            <IoMdThumbsUp
              style={{
                height: "35px",
                width: "35px",
                cursor: "pointer",
                margin: "4px",
                color: "black",
              }}
            />
          </NavLink>
        </div>
        <div className="sub_box_last">
          <NavLink to="/post/write">
            <IoMdCreate
              style={{
                height: "35px",
                width: "35px",
                cursor: "pointer",
                margin: "4px",
                color: "black",
              }}
            />
          </NavLink>
        </div>
      </div>
      {/* <div className="subBar">
        <div>???????????????</div>
        <div>??????</div>
      </div> */}
    </nav>
  );
};

export default NavBar;

import React from "react";
import StyledButton from "../commons/button";
import { IoMdPower } from "react-icons/io";


const Logout = ({ onClick, ...props }) => {
  return
  //  <StyledButton onClick={onClick}>로그아웃</StyledButton>;
    <IoMdPower
      onClick={onClick}
      style={{
        height: "40px",
        width: "40px",
        cursor: "pointer",
        margin: "8px",
        color: "black"
      }}
    />
};

export default Logout;

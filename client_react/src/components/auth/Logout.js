import React from "react";
import StyledButton from "../commons/button";

const Logout = ({ onClick, ...props }) => {
  return <StyledButton onClick={onClick}>로그아웃</StyledButton>;
};

export default Logout;

import React from "react";
import LogoutContainer from "../../../container/auth/LogoutContainer";
import "./header.css";
const Header = () => {
  return (
    <div className="header">
      <LogoutContainer />
    </div>
  );
};

export default Header;

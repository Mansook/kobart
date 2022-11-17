import React from "react";
import { IoMdPower } from "react-icons/io";

const Logout = ({ onClick, ...props }) => {
  return (
    <IoMdPower
      onClick={onClick}
      style={{
        height: "30px",
        width: "30px",
        cursor: "pointer",
        margin: "8px",
        color: "black",
      }}
    />
  );
};

export default Logout;

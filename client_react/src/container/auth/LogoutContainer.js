import React, { useEffect } from "react";
import Logout from "../../components/auth/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../modules/slices/user";
import { useNavigate } from "react-router-dom";

const LogoutContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
  };

  return <Logout onClick={onClick} />;
};

export default LogoutContainer;

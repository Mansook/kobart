import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import {
  initialize,
  inputData,
  login,
  selectLoginInput,
  selectUser,
  selectError,
} from "../../modules/slices/auth";

const LoginContainer = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const error = useSelector(selectError) || "";
  const form = useSelector(selectLoginInput);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      if (userData.company.length == 0) {
        navigate("/post/selection", { state: userData });
      } else navigate("/");
    }
  }, [userData]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(login({ email, password }));
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      inputData({
        form: "login",
        key: name,
        value,
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AuthForm
        type="login"
        form={form}
        onSubmit={onSubmit}
        onChange={onChange}
        error={error}
      />
    </div>
  );
};
export default LoginContainer;

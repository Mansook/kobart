import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import {
  inputData,
  register,
  selectRegisterInput,
} from "../../modules/slices/auth";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectRegisterInput);
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      inputData({
        form: "register",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirm } = form;
    if ([email, password, passwordConfirm].includes("")) {
      window.alert("빈 칸이 있습니다");
      return;
    }
    if (password !== passwordConfirm) {
      window.alert("비밀번호가 일치하지 않습니다");
      return;
    }
    if (password !== passwordConfirm) {
      console.log("오류");
      return;
    }
    dispatch(register({ email, password }));
  };

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterContainer;

/*
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {
  changefile,
  initializeform,
  selectReg,
  selectAuth,
  register,
} from "../../modules/slices/auth";
import { check, selectUser } from "../../modules/slices/user";

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const form = useSelector(selectAuth);
  const regform = useSelector(selectReg);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changefile({
        form: "register",
        key: name,
        value,
      })
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = regform;
    if ([username, password, passwordConfirm].includes("")) {
      setError("빈 칸이 있습니다");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }
    if (password !== passwordConfirm) {
      console.log("오류");
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeform("register"));
  }, [dispatch]);

  useEffect(() => {
    if (form.authError) {
      console.log("오류");
      return;
    }
    if (form.auth) {
      console.log("성공");
      dispatch(check(form.auth));
    }
  }, [form.auth, form.authError, dispatch]);
  useEffect(() => {
    if (user !== null) {
      console.log("성공");
    }
  }, [user]);
  useEffect(() => {
    if (user.user !== null) {
      console.log("성공");
      navigate("/");
      try {
        localStorage.setItem("user", JSON.stringify(user.user));
      } catch (e) {
        console.log("local storage is not working");
      }
    }
  }, [user]);
  return (
    <AuthForm
      type="register"
      form={form.register}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    ></AuthForm>
  );
};
export default RegisterForm;
 */

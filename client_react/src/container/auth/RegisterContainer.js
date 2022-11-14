import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/AuthForm";
import {
  initialize,
  inputData,
  register,
  selectRegisterInput,
} from "../../modules/slices/auth";

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const form = useSelector(selectRegisterInput);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(initialize());
  }, []);

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
      setError("빈 칸이 있습니다");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }
    if (password.length < 5) {
      setError("비밀번호가 너무 짧습니다");

      return;
    }

    dispatch(register({ email: email, password: password }));
    navigate("/login");
  };

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterContainer;

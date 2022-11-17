import { Link, useNavigate } from "react-router-dom";
import "./css/auth.css";
import StyledInput from "../commons/input";
import StyledButton from "../commons/button";
const InputBox = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",

        // background: "gray",
        // borderRadius: "5px",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const ToLink = ({ children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        color: "black",
        fontWeight: "500",
      }}
    >
      {children}
    </div>
  );
};

const ErrorMessage = ({ children }) => {
  return <div style={{ color: "red" }}>{children}</div>;
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = type;

  return (
    // <div className="auth_main">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h3>{text}</h3>

      <form onSubmit={onSubmit}>
        <InputBox>
          <div>아이디: </div>
          <StyledInput
            autoComplete="username"
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={form.email}
          />
          <div>비밀번호: </div>
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />

          {type === "register" && (
            <div>
              <div>비밀번호확인: </div>
              <StyledInput
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
                value={form.passwordConfirm}
              />
            </div>
          )}
        </InputBox>
        <StyledButton type="submit">제출</StyledButton>
      </form>

      <ToLink>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </ToLink>
      <ErrorMessage
        style={{
          color: "red",
        }}
      >
        {error}
      </ErrorMessage>
    </div>
  );
};
export default AuthForm;

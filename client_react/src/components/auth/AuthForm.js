import { Link } from "react-router-dom";
import "./css/auth.css"
const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = type;

  return (
    // <div className="auth_main">
    <div>
      <h3>{text}</h3>
      <form classname = "form_style" onSubmit={onSubmit}>
        <div>
          <div classname = "input_name"> 아이디 </div>
          <input
            autoComplete="username"
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={form.email}
          />
        </div>
        <br />
        <div>
          <div classname = "input_name"> 비밀번호</div>
          <input
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
          />
        </div>
        <br />
        {type === "register" && (
          <div>
            <div classname = "input_name"> 비밀번호 확인</div>
            <input
              autoComplete="new-password"
              name="passwordConfirm"
              placeholder="비밀번호 확인"
              type="password"
              onChange={onChange}
              value={form.passwordConfirm}
            />
          </div>
        )}
        <br />
        <button type="submit">제출</button>
      </form>
      <div classname = "login_register_link">
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      </div>
    </div>
  );
};
export default AuthForm;

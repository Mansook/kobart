import { Link } from "react-router-dom";
const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = type;
  return (
    <div>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <input
          autoComplete="username"
          name="email"
          placeholder="아이디"
          onChange={onChange}
          value={form.email}
        />
        <input
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
          value={form.password}
        />
        {type === "register" && (
          <input
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            onChange={onChange}
            value={form.passwordConfirm}
          />
        )}
      </form>
      <div>
        {type != "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </div>
    </div>
  );
};
export default AuthForm;
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../backend_sdk/user.sdk";
import { StyledContainer } from "../components/styles/Container.styled";
import { Alert } from "reactstrap";
import { StyledP } from "../components/styles/P.styled";
import ClassicButton from "../components/buttons/ClassicButton.js";

function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
    if (!email || !password) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }

    const res = await User.login(email, password).catch((err) => {
      setError(err.msg);
      console.log(err.error);
      return;
    });
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      return;
    } else {
      localStorage.setItem("apiToken", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/admin/allTodos");
    }
  }

  return (
    <StyledContainer className="login-container">
      <StyledContainer className="login-header">
        <StyledP className="login-title">Login</StyledP>
      </StyledContainer>
      <StyledContainer className="form-login">
        <form>
          <StyledContainer>
            <label>Email</label>
          </StyledContainer>
          <StyledContainer>
            <input
              type="email"
              placeholder="write your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></input>
          </StyledContainer>

          <StyledContainer>
            <label>Password</label>
          </StyledContainer>
          <StyledContainer>
            <input
              type="password"
              placeholder="write your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
          </StyledContainer>
          <Alert isOpen={error != null} color="danger" className="login-alert">
            {error}
          </Alert>
          <StyledP className="login-submit">
            <ClassicButton type="submit" onClick={handleSubmit} text="Log in" />
          </StyledP>
          <StyledP className="login-submit">
            <span>
              Don't have an account? <a href="/auth/register">Register</a>
            </span>
          </StyledP>
        </form>
      </StyledContainer>
    </StyledContainer>
  );
}

export default Login;

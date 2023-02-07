import React from "react";
import { useHistory, useNavigate } from "react-router-dom";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
    if (!email || !password) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);

    const res = await User.login(email, password).catch((err) => {
      setError(err.msg);
      console.log(err.error);
      setIsSubmitting(false);
      return;
    });
    setIsSubmitting(false);
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
    <StyledContainer>
      <StyledP>Login</StyledP>
      <Alert isOpen={error != null} color="danger">
        {error}
      </Alert>
      <form>
        <label>Email</label>
        <input
          type="email"
          placeholder="write your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="write your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <StyledP>
          <ClassicButton type="submit" onClick={handleSubmit} text="Log in" />
        </StyledP>
      </form>
    </StyledContainer>
  );
}

export default Login;

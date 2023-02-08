import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../backend_sdk/user.sdk";
import { StyledContainer } from "../components/styles/Container.styled";
import { Alert } from "reactstrap";
import { StyledP } from "../components/styles/P.styled";
import ClassicButton from "../components/buttons/ClassicButton.js";

function Register(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setNmae] = useState("");
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
    <StyledContainer className="register-container">
      <StyledContainer className="register-header">
        <StyledP className="register-title">Sign up</StyledP>
      </StyledContainer>
      <StyledContainer className="form-register">
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
          <Alert
            isOpen={error != null}
            color="danger"
            className="register-alert"
          >
            {error}
          </Alert>
          <StyledP className="register-submit">
            <ClassicButton
              type="submit"
              onClick={handleSubmit}
              text="Sign up"
            />
          </StyledP>
        </form>
      </StyledContainer>
    </StyledContainer>
  );
}

export default Register;

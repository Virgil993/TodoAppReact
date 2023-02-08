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
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  async function handleSubmit(event) {
    setError(null);

    event.preventDefault();
    if (!email || !password1 || !gender || !name || !phoneNumber) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }
    if (password1 !== password2) {
      setError("Passwords do not match");
      console.log("Passwords do not match");
      return;
    }

    const res = await User.create(
      name,
      email,
      password1,
      gender,
      phoneNumber
    ).catch((err) => {
      setError(err.msg);
      console.log(err.error);
      return;
    });
    if (!res) {
      setError("Unknown error, please try again later");
      console.log("Error at the Database");
      return;
    }
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      return;
    } else {
      navigate("/auth/login");
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
            <label>Name</label>
          </StyledContainer>
          <StyledContainer>
            <input
              type="name"
              placeholder="write your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
          </StyledContainer>
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
              value={password1}
              onChange={(event) => setPassword1(event.target.value)}
            ></input>
          </StyledContainer>
          <StyledContainer>
            <label>Repeat Password</label>
          </StyledContainer>
          <StyledContainer>
            <input
              type="password"
              placeholder="write your password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
            ></input>
          </StyledContainer>
          <StyledContainer>
            <label>Gender</label>
          </StyledContainer>
          <StyledContainer>
            <select
              type="select"
              placeholder="Gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option></option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </StyledContainer>
          <StyledContainer>
            <label>Phone number</label>
          </StyledContainer>
          <StyledContainer>
            <input
              type="phoneNumber"
              placeholder="write your phone number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
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

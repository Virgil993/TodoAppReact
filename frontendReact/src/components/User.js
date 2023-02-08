import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledContainer } from "./styles/Container.styled";
import { StyledUser } from "./styles/User.styled";
import { User } from "../backend_sdk/user.sdk";

function UserHead(props) {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getName() {
      const res = await User.getUserByToken(localStorage.getItem("apiToken"));
      if (!res || !res.success) {
        console.log("Error at get user by token");
        localStorage.clear();
        navigate("/auth/login");
        return;
      }
      setName(res.user.name);
    }
    getName();
  }, [name, navigate]);

  return (
    <StyledContainer>
      <StyledUser>User {name} tasks</StyledUser>
    </StyledContainer>
  );
}

export default UserHead;

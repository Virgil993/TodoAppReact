import { StyledContainer } from "./styles/Container.styled";
import { StyledUser } from "./styles/User.styled";

function User(props) {
  const searchId = 1;

  return (
    <StyledContainer>
      <StyledUser>User {searchId} tasks</StyledUser>
    </StyledContainer>
  );
}

export default User;

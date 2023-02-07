import { StyledClassicButton } from "../styles/ClassicButton.styled";

function ClassicButton(props) {
  return (
    <StyledClassicButton type={props.type} onClick={props.onClick}>
      {props.text}
    </StyledClassicButton>
  );
}

export default ClassicButton;

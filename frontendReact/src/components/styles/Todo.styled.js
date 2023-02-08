import styled from "styled-components";

export const StyledTodo = styled.div`
  border-radius: 25px;
  width: 300px;
  height: 300px;
  background-color: ${(props) => {
    if (props.completed === false) {
      return "cadetblue";
    }
    return "orange";
  }};
  font-size: 25px;
  text-align: center;
  padding: 30px;
  margin: 30px;
`;

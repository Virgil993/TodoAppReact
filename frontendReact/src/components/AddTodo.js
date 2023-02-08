import { StyledP } from "./styles/P.styled";
import { StyledContainer } from "./styles/Container.styled";
import { StyledAddTodo } from "./styles/AddTodo.styled";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAPI } from "../redux/todoSlice";
import ClassicButton from "./buttons/ClassicButton";

function AddTodo(props) {
  const searchId = 1;

  const [value, setValue] = useState();

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = {
      userid: parseInt(searchId),
      id: Date.now(),
      text: value,
    };
    dispatch(addTodoAPI(payload));
  };

  return (
    <StyledContainer>
      <StyledAddTodo>
        <StyledP>Please insert the title of your new task</StyledP>
        <form>
          <label>Title </label>
          <input
            type="text"
            placeholder="write here"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          ></input>
          <StyledP>
            <ClassicButton type="submit" onClick={onSubmit} text="Submit" />
          </StyledP>
        </form>
      </StyledAddTodo>
    </StyledContainer>
  );
}

export default AddTodo;

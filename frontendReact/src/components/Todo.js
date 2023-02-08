import { StyledTodo } from "./styles/Todo.styled";
import { StyledP } from "./styles/P.styled";
import { useSelector } from "react-redux";
import { selectAllTodos } from "../redux/todoSlice";
import { StyledContainer } from "./styles/Container.styled";
import useTaskActions from "../customHooks/useTaskActions";
import ClassicButton from "./buttons/ClassicButton";

function Todo(props) {
  const searchId = 1;

  const [removeTask, finishTask] = useTaskActions();

  const todos = useSelector(selectAllTodos);
  const todosFiltered = todos.filter((todo) => {
    return todo.userId === parseInt(searchId);
  });

  return (
    <StyledContainer>
      {todosFiltered.map((todo) => (
        <StyledTodo key={todo.id} completed={todo.completed}>
          <StyledP>title : {todo.title}</StyledP>
          <StyledP>completed : {todo.completed.toString()}</StyledP>
          <StyledP>
            <ClassicButton
              type="button"
              onClick={() => removeTask(todo.id)}
              text="Remove Task"
            />
          </StyledP>
          <StyledP>
            <ClassicButton
              type="button"
              onClick={() => finishTask(todo)}
              text="Finish Task"
            />
          </StyledP>
        </StyledTodo>
      ))}
    </StyledContainer>
  );
}

export default Todo;

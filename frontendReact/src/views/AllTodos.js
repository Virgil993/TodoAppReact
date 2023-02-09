import React from "react";
import UserHead from "../components/User";
import { StyledContainer } from "../components/styles/Container.styled";
import { Task } from "../backend_sdk/task.sdk";
import { useNavigate } from "react-router-dom";
import ClassicButton from "../components/buttons/ClassicButton";
import { StyledP } from "../components/styles/P.styled";
import { StyledAddTodo } from "../components/styles/AddTodo.styled";
import { Alert } from "reactstrap";
import { StyledTodo } from "../components/styles/Todo.styled";
import { User } from "../backend_sdk/user.sdk";

function AllTodos() {
  const navigate = useNavigate();
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getTodos() {
      const data = await Task.getByOwnerId(localStorage.getItem("apiToken"));
      if (!data || !data.success) {
        console.log("error at get task by owner id ");
        navigate("auth/login");
        return;
      }
      setTodos(data.elements);
    }
    getTodos();
  });

  async function handleLogout(event) {
    event.preventDefault();
    const res = await User.logout(localStorage.getItem("apiToken")).catch(
      (err) => {
        setError(err.msg);
        console.log(err.error);

        return;
      }
    );

    if (!res) {
      setError("Unknown error, please try again later");
      console.log("Error at the Database");
      return;
    }
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      return;
    }
    localStorage.clear();
    navigate("/auth/login");
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!title || !description) {
      setError("All fields are mandatory");
      console.log("All fields are mandatory");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await Task.create(
      localStorage.getItem("apiToken"),
      title,
      description,
      user._id
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
    }

    setTodos([
      ...todos,
      {
        _id: res.elemId,
        title: title,
        description: description,
        solved: false,
        ownerId: user._id,
      },
    ]);
    setTitle("");
    setDescription("");
  }

  async function handleFinishTodo(id, currentSolvedValue) {
    const res = await Task.update(
      localStorage.getItem("apiToken"),
      id,
      null,
      null,
      !currentSolvedValue,
      null
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
    }
    var newTodos = todos;
    for (const elem of newTodos) {
      if (elem._id === id) {
        elem.solved = !currentSolvedValue;
        break;
      }
    }
    setTodos(newTodos);
  }

  async function handleDeleteTodo(id) {
    const res = await Task.delete(localStorage.getItem("apiToken"), id).catch(
      (err) => {
        setError(err.msg);
        console.log(err.error);

        return;
      }
    );

    if (!res) {
      setError("Unknown error, please try again later");
      console.log("Error at the Database");
      return;
    }
    if (!res.success) {
      setError(res.msg);
      console.log(res.msg);
      return;
    }
    var newTodos = todos.filter((elem) => {
      return elem._id !== id;
    });
    setTodos(newTodos);
  }

  return (
    <StyledContainer className="all-todos-container">
      <StyledP>
        <ClassicButton type="submit" onClick={handleLogout} text="Log out" />
      </StyledP>
      <UserHead />
      <StyledContainer>
        <StyledAddTodo>
          <StyledP>Add a new task</StyledP>
          <form className="add-todo-form">
            <StyledContainer className="add-todo-form-label">
              <label>Title </label>
            </StyledContainer>
            <StyledContainer className="add-todo-form-input">
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </StyledContainer>
            <StyledContainer className="add-todo-form-label">
              <label>Description </label>
            </StyledContainer>
            <StyledContainer className="add-todo-form-input">
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></input>
            </StyledContainer>
            <Alert
              isOpen={error != null}
              color="danger"
              className="login-alert"
            >
              {error}
            </Alert>
            <StyledP>
              <ClassicButton type="submit" onClick={onSubmit} text="Submit" />
            </StyledP>
          </form>
        </StyledAddTodo>
      </StyledContainer>
      <StyledContainer className="todos-container">
        {todos.map((todo) => (
          <StyledTodo key={todo._id} completed={todo.solved}>
            <StyledP>title : {todo.title}</StyledP>
            <StyledP>description : {todo.description}</StyledP>
            <StyledP>completed : {todo.solved.toString()}</StyledP>
            <StyledP>
              <ClassicButton
                type="button"
                onClick={() => handleDeleteTodo(todo._id)}
                text="Remove Task"
              />
            </StyledP>
            <StyledP>
              <ClassicButton
                type="button"
                onClick={() => handleFinishTodo(todo._id, todo.solved)}
                text="Finish Task"
              />
            </StyledP>
          </StyledTodo>
        ))}
      </StyledContainer>
    </StyledContainer>
  );
}

export default AllTodos;

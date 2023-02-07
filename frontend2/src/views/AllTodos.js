import User from "../components/User";
import { ThemeProvider } from "styled-components";
import Todo from "../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData, selectAllStatus } from "../redux/todoSlice";
import AddTodo from "../components/AddTodo";

const theme = {
  colors: {
    header: "#3452eb",

    body: "#6b34eb",
  },
};

function AllTodos() {
  const dispatch = useDispatch();

  const todosStatus = useSelector(selectAllStatus);

  useEffect(() => {
    if (todosStatus === "idle") {
      dispatch(fetchData());
    }
  }, [todosStatus, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <User />
      <AddTodo />
      <Todo />
    </ThemeProvider>
  );
}

export default AllTodos;

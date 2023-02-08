import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const toDoUrl = "https://jsonplaceholder.typicode.com/todos";

export const fetchData = createAsyncThunk("todo/fetchData", async () => {
  try {
    const response = await axios.get(toDoUrl);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addTodoAPI = createAsyncThunk(
  "todo/addTodoAPI",
  async (payload) => {
    try {
      const response = await axios.post(toDoUrl, {
        userId: payload.userid,
        id: payload.id,
        title: payload.text,
        completed: false,
      });
      response.data.id = payload.id;
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteTodoAPI = createAsyncThunk(
  "todo/deleteTodoAPI",
  async (payload) => {
    try {
      await axios.delete(toDoUrl + "/" + toString(payload));
      return payload;
    } catch (err) {
      return err.message;
    }
  }
);

export const toggleDoneAPI = createAsyncThunk(
  "todo/toggleDoneAPI",
  async (payload) => {
    try {
      const response = await axios.put(toDoUrl + "/" + payload.id, {
        userId: payload.userId,
        id: payload.id,
        title: payload.title,
        completed: !payload.completed,
      });
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

const initialState = {
  todos: [],
  status: "idle",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    toggleFinishTask: (state, action) => {
      const ChangedTodo = {
        userId: action.payload.userId,
        id: action.payload.id,
        title: action.payload.title,
        completed: !action.payload.completed,
      };

      console.log(ChangedTodo);
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index] = ChangedTodo;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        state.todos = state.todos.concat(newData);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTodoAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newData = action.payload;
        state.todos = state.todos.concat(newData);
      })
      .addCase(addTodoAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTodoAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteTodoAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        const resp = action.payload;
        console.log(resp);
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodoAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(toggleDoneAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(toggleDoneAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        const resp = action.payload;
        console.log(resp);
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.todos[index] = action.payload;
      })
      .addCase(toggleDoneAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllTodos = (state) => state.todo.todos;
export const selectAllStatus = (state) => state.todo.status;

export const { toggleFinishTask } = todoSlice.actions;
export default todoSlice.reducer;

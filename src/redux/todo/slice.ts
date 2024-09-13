import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "../auth/operations";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "./operations";

interface Todo {
  _id: string;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const sliceTodos = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  selectors: {
    selectTodos: (state) => state.todos,
  },

  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.todos = [];
      })
      .addCase(fetchTodosThunk.fulfilled, (state, { payload }) => {
        state.todos = payload;
      })
      .addCase(addTodoThunk.fulfilled, (state, { payload }) => {
        state.todos.push(payload);
      })
      .addCase(deleteTodoThunk.fulfilled, (state, { payload }) => {
        state.todos = state.todos.filter((item) => item._id !== payload._id);
      })
      .addCase(updateTodoThunk.fulfilled, (state, { payload }) => {
        state.todos = state.todos.map((item) =>
          item._id === payload._id ? { ...item, text: payload.text } : item
        );
      });
  },
});

export const todosReducer = sliceTodos.reducer;

export const { selectTodos } = sliceTodos.selectors;

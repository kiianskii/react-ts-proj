import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
};

const sliceTodos = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  selectors: {
    selectTodos: (state) => state.todos,
    selectIsLoading: (state) => state.isLoading,
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
      })

      .addMatcher(
        isAnyOf(
          fetchTodosThunk.fulfilled,
          addTodoThunk.fulfilled,
          deleteTodoThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTodosThunk.pending,
          addTodoThunk.pending,
          deleteTodoThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTodosThunk.rejected,
          addTodoThunk.rejected,
          deleteTodoThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const todosReducer = sliceTodos.reducer;

export const { selectTodos, selectIsLoading } = sliceTodos.selectors;

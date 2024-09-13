import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "../todo/operations";
import { loginThunk, registerThunk } from "../auth/operations";

interface LoaderState {
  isLoading: boolean;
}

const initialState: LoaderState = {
  isLoading: false,
};

const slice = createSlice({
  name: "loader",
  initialState,
  reducers: {},
  selectors: {
    selectisLoading: (state: LoaderState) => state.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchTodosThunk.fulfilled,
          addTodoThunk.fulfilled,
          deleteTodoThunk.fulfilled,
          updateTodoThunk.fulfilled,
          loginThunk.fulfilled,
          registerThunk.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTodosThunk.pending,
          addTodoThunk.pending,
          deleteTodoThunk.pending,
          updateTodoThunk.pending,
          loginThunk.pending,
          registerThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchTodosThunk.rejected,
          addTodoThunk.rejected,
          deleteTodoThunk.rejected,
          updateTodoThunk.rejected,
          loginThunk.rejected,
          registerThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const loaderReducer = slice.reducer;
export const { selectisLoading } = slice.selectors;

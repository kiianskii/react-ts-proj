import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User;
  token: string;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: {
    username: "",
    email: "",
  },
  token: "",
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  selectors: {
    selectToken: (state: AuthState) => state.token,
    selectUser: (state: AuthState) => state.user,
    selectIsLoggedIn: (state: AuthState) => state.isLoggedIn,
    selectIsRefreshing: (state: AuthState) => state.isRefreshing,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload.user;
          state.token = payload.token;
          state.isLoggedIn = true;
        }
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
export const { selectToken, selectIsLoggedIn, selectUser, selectIsRefreshing } =
  slice.selectors;

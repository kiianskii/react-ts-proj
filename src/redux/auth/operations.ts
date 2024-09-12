import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
  data: {
    token: string;
    user: {
      username: string;
      email: string;
    };
  };
}
interface AsyncThunkConfig {
  state: RootState;
  rejectValue: string;
}

interface Data {
  res: {
    username: string;
    email: string;
  };
}

type regCredentials = {
  username: string;
  email: string;
  password: string;
};

type logCredentials = {
  email: string;
  password: string;
};

type refreshRes = {
  username: string;
  email: string;
};

axios.defaults.baseURL = "http://localhost:3000/api/";

export const setToken = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const clearToken = () => {
  axios.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials: regCredentials, thunkApi) => {
    try {
      const { res } = (await axios.post("auth/register", credentials)) as Data;
      if (res) {
        const { data } = (await axios.post("auth/login", {
          email: credentials.email,
          password: credentials.password,
        })) as User;
        return data;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials: logCredentials, thunkApi) => {
    try {
      const { data } = (await axios.post("auth/login", credentials)) as User;
      setToken(data.token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await axios.post("auth/logout");
      clearToken();
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue("Unknown error occurred");
    }
  }
);

export const refreshThunk = createAsyncThunk<
  refreshRes,
  void,
  AsyncThunkConfig
>("auth/refresh", async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (!savedToken) {
    return thunkApi.rejectWithValue("Unable to fetch user");
  }
  setToken(savedToken);
  try {
    const { data } = await axios.get("auth/current");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.message) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Unknown error occurred");
  }
});

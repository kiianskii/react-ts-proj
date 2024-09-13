import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type Todo = {
  text: string;
};

type UpdateTodo = {
  text: string;
  _id: string;
};

const msgOptions = {
  icon: "👏",
  style: {
    border: "1px solid #713200",
    padding: "16px",
    color: "#713200",
  },
  iconTheme: {
    primary: "#713200",
    secondary: "#FFFAEE",
  },
};

export const fetchTodosThunk = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("todos");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (todo: Todo, thunkAPI) => {
    try {
      const { data } = await axios.post("todos", todo);
      toast("You have succesfully added new todo", msgOptions);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const updateTodoThunk = createAsyncThunk(
  "todos/updateTodo",
  async (todo: UpdateTodo, thunkAPI) => {
    try {
      const { data } = await axios.patch(`todos/${todo._id}`, {
        text: todo.text,
      });
      toast("You have succesfully updated new todo", msgOptions);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (_id: string, thunkAPI) => {
    try {
      const { data } = await axios.delete(`todos/${_id}`);
      toast("You have succesfully deleted todo", msgOptions);
      return data.message;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type Todo = {
  text: string;
};

type UpdateTodo = {
  text: string;
  _id: string;
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
      //   toast("You have succesfully added new contact", msgOptions);
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
      //   toast("You have succesfully added new contact", msgOptions);
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
      //   toast("You have succesfully deleted contact", msgOptions);
      return data.message;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

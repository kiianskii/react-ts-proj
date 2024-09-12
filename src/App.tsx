import React, { useEffect, useState } from "react";

import "./App.css";
import ToDoList from "./components/ToDoList/ToDoList";
import NewTodo from "./components/NewTodo/NewTodo";
import { Todo } from "./todo.model";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";
import { refreshThunk } from "./redux/auth/operations";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  const todoAddHandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== todoId);
    });
  };

  const editTodoHandler = (todoId: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === todoId ? { ...todo, text } : todo))
    );
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <ToDoList
        todos={todos}
        onDelete={todoDeleteHandler}
        onEdit={editTodoHandler}
      />
      <RegisterPage />
      <LoginPage />
    </div>
  );
}

export default App;

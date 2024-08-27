import React, { useState } from "react";

import "./App.css";
import ToDoList from "./components/ToDoList/ToDoList";
import NewTodo from "./components/NewTodo/NewTodo";
import { Todo } from "./todo.model";

function App() {
  // const todos = [{ id: "1", text: "Text is here" }];
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <ToDoList todos={todos} onDelete={todoDeleteHandler} />
    </div>
  );
}

export default App;

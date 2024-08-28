import React, { useState } from "react";

import "./App.css";
import ToDoList from "./components/ToDoList/ToDoList";
import NewTodo from "./components/NewTodo/NewTodo";
import { Todo } from "./todo.model";

function App() {
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
    </div>
  );
}

export default App;

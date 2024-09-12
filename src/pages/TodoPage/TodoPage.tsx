import React, { useState } from "react";

import ToDoList from "../../components/ToDoList/ToDoList";
import NewTodo from "../../components/NewTodo/NewTodo";
import { Todo } from "../../todo.model";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // const dispatch = useDispatch<AppDispatch>();

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
    <div>
      <NewTodo onAddTodo={todoAddHandler} />
      <ToDoList
        todos={todos}
        onDelete={todoDeleteHandler}
        onEdit={editTodoHandler}
      />
    </div>
  );
};

export default TodoPage;

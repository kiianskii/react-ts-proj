import React from "react";

import ToDoList from "../../components/ToDoList/ToDoList";
import NewTodo from "../../components/NewTodo/NewTodo";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectTodos } from "../../redux/todo/slice";
import {
  addTodoThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from "../../redux/todo/operations";

const TodoPage = () => {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch<AppDispatch>();

  const todoAddHandler = (text: string) => {
    dispatch(addTodoThunk({ text }));
  };

  const todoDeleteHandler = (todoId: string) => {
    dispatch(deleteTodoThunk(todoId));
  };

  const editTodoHandler = (todoId: string, text: string) => {
    dispatch(updateTodoThunk({ _id: todoId, text }));
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

import React from "react";
import { Todo } from "../../todo.model";
import s from "./ToDoList.module.css";
import ToDoItem from "../ToDoItem/ToDoItem";

interface ToDoListProps {
  todos: Todo[];
  onDelete: (todoId: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDelete }) => {
  return (
    <ul className={s.ul}>
      {todos.map((todo) => (
        <ToDoItem todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default ToDoList;

import React from "react";
import s from "./ToDoItem.module.css";
import { Todo } from "../../todo.model";

interface TodoProps {
  todo: Todo;
  onDelete: (id: string) => void;
}

const ToDoItem: React.FC<TodoProps> = ({ todo, onDelete }) => {
  return (
    <li className={s.li} key={todo.id}>
      <span>{todo.text}</span>
      <button className={s.button} onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
};

export default ToDoItem;

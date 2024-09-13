import React from "react";
// import { Todo } from "../../todo.model";
import s from "./ToDoList.module.css";
import ToDoItem from "../ToDoItem/ToDoItem";

type Todo = { text: string; _id: string };

interface ToDoListProps {
  todos: Todo[];
  onDelete: (todoId: string) => void;
  onEdit: (todoId: string, text: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ todos, onDelete, onEdit }) => {
  return (
    <ul className={s.ul}>
      {todos.map((todo) => (
        <ToDoItem
          key={todo._id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default ToDoList;

import React, { useRef } from "react";

import s from "./NewTodo.module.css";

interface NewTodoProps {
  onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = ({ onAddTodo }) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;

    onAddTodo(enteredText);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.div}>
        <label className={s.label} htmlFor="todo-input">
          {" "}
          Add new todo
        </label>
        <input
          className={s.input}
          type="text"
          id="todo-input"
          ref={textInputRef}
        />
      </div>
      <button className={s.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default NewTodo;

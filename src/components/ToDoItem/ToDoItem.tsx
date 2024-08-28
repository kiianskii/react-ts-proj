import React from "react";
import s from "./ToDoItem.module.css";
import { Todo } from "../../todo.model";
import { useToggle } from "../../hooks/useToggle";
import Modal from "../Modal/Modal";
import EditForm from "../EditForm/EditForm";

interface TodoProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const ToDoItem: React.FC<TodoProps> = ({ todo, onDelete, onEdit }) => {
  const { openModal, closeModal, isOpen } = useToggle();

  return (
    <li className={s.li} key={todo.id}>
      <span>{todo.text}</span>
      <div className={s.btn_wrapper}>
        <button className={s.button} onClick={() => openModal()}>
          Edit
        </button>
        <button className={s.button} onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
      {isOpen && (
        <Modal title="Edit" closeModal={closeModal}>
          <EditForm id={todo.id} onEdit={onEdit} closeModal={closeModal} />
        </Modal>
      )}
    </li>
  );
};

export default ToDoItem;

import React, { useRef } from "react";
import s from "./EditForm.module.css";

interface onEditProps {
  _id: string;
  onEdit: (_id: string, text: string) => void;
  closeModal: () => void;
}

const EditForm: React.FC<onEditProps> = ({ _id, onEdit, closeModal }) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = editInputRef.current!.value;

    onEdit(_id, enteredText);

    editInputRef.current!.value = "";
    closeModal();
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input
        className={s.input}
        type="text"
        id="edit-text"
        ref={editInputRef}
      />
      <button className={s.button} type="submit">
        Edit
      </button>
    </form>
  );
};

export default EditForm;

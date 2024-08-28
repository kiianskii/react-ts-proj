import { useCallback, useEffect, ReactNode } from "react";

import s from "./Modal.module.css";
// import { Icon } from "../../icons/Icon";

interface ModalProps {
  children: ReactNode;
  title: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title = "Default modal",
  closeModal,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={s.wrapper} onClick={handleBackdropClick}>
      <div className={s.content}>
        <>
          <h2 className={s.title}>{title}</h2>
        </>
        <button onClick={closeModal} className={s.closeBtn}>
          {/* <Icon size={18} id={"close"} className={s.icon_close} /> */}X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

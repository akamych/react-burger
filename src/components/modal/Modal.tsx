import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "./overlay/ModalOverlay";
import ModalHeader from "./header/ModalHeader";

const modalRoot = document.getElementById("modals");

type propType = {
  children: React.ReactNode;
  onClose: () => void;
  header?: string;
};

const Modal = (props: propType) => {
  const { children, header, onClose } = props;

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapePress);
    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [onClose]);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <div className={styles.modal} data-testId="modalHolder">
          {header && <ModalHeader onClose={onClose} header={header} />}
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    )
  );
};

export default Modal;

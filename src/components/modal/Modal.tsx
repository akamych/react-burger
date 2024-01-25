import { useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "./overlay/ModalOverlay";
import ModalHeader from "./header/ModalHeader";
import React from "react";

const modalRoot = document.getElementById("modals");

type propType = {
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  header?: string;
};

const Modal = (props: propType) => {
  const { children, header, onClose } = props;

  const handleEscapePress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapePress);
    return () => document.removeEventListener("keydown", handleEscapePress);
  });

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <div className={styles.modal}>
          <ModalHeader onClose={onClose}>{header}</ModalHeader>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </>,
      modalRoot
    )
  );
};

export default Modal;

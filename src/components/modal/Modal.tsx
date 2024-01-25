import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "./overlay/ModalOverlay";
import ModalHeader from "./header/ModalHeader";

const modalRoot = document.getElementById("modals");

type propType = {
  children: JSX.Element;
  header: string;
  onClose: () => void;
};

const Modal = (props: propType) => {
  const { children, header, onClose } = props;
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

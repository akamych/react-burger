import styles from "./ModalHeader.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type propType = {
  onClose: () => void;
  children?: string;
};

const ModalHeader = (props: propType) => {
  const { onClose, children } = props;
  return (
    <div className={styles.modal_header}>
      <h3 className={styles.modal_header_h3}>{children}</h3>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
};

export default ModalHeader;

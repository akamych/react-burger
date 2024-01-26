import styles from "./ModalHeader.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type propType = {
  onClose: () => void;
  header?: string;
};

const ModalHeader = (props: propType) => {
  const { onClose, header } = props;
  return (
    <div className={styles.modal_header}>
      <h3 className={styles.modal_header_h3}>{header}</h3>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
};

export default ModalHeader;

import { useMemo } from "react";
import styles from "./ModalHeader.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type propType = {
  onClose: () => void;
  header?: string;
};

const ModalHeader = (props: propType) => {
  const { onClose, header } = props;

  const headerClass = useMemo(() => {
    let cls = "text ";
    cls +=
      header?.charAt(0) === "#"
        ? "text_type_digits-default"
        : "text_type_main-large";
    return cls;
  }, [header]);

  return (
    <div className={styles.modal_header}>
      <h3 className={headerClass}>{header}</h3>
      <CloseIcon type="primary" onClick={onClose} />
    </div>
  );
};

export default ModalHeader;

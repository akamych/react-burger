import styles from "./ModalOverlay.module.css";

type propType = {
  onClose: () => void;
};

const ModalOverlay = (props: propType) => {
  const { onClose } = props;
  return (
    <div
      className={styles.modal_overlay}
      onClick={onClose}
      data-testId="modalOverlay"
    ></div>
  );
};

export default ModalOverlay;

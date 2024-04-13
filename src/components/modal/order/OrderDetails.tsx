import { useTranslation } from "react-i18next";
import styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { selectOrderId } from "../../../services/reducers/OrderReducer";
import { useAppSelector } from "../../../services/Store";

const OrderDetails = () => {
  const { t } = useTranslation("orders");
  const _id = useAppSelector(selectOrderId);
  const status: string = "cooking";
  return (
    <>
      <div className={styles.modal_order}>
        <b className={styles.modal_order_id}>{_id}</b>
        <b className={styles.modal_order_id_label}>{t("id")}</b>
        <span className={styles.modal_order_svg}>
          <CheckMarkIcon type="primary" />
        </span>
        <span className={styles.modal_order_status}>
          {t(`status.${status}`)}
        </span>
        <span className={styles.modal_order_hint}>{t(`hint.${status}`)}</span>
      </div>
    </>
  );
};

export default OrderDetails;

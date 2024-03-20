import { useTranslation } from "react-i18next";
import styles from "./OrdersListItem.module.css";
import { TSocketMessageOrder } from "../../../../types/webSocket.type";

type propType = {
  order: TSocketMessageOrder;
};

const OrdersListItem = (props: propType) => {
  const { t } = useTranslation("feed");
  const { order } = props;

  return (
    <div className={styles.orders_list_holder}>
      <p>{order.number}</p>
    </div>
  );
};

export default OrdersListItem;

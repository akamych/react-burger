import { useAppSelector } from "../../../services/Store";
import { selectFeedOrders } from "../../../services/reducers/WebSocketReducer";
import styles from "./OrdersList.module.css";
import OrdersListItem from "./item/OrdersListItem";

const OrdersList = () => {
  const orders = useAppSelector(selectFeedOrders);

  return (
    <div className={styles.orders_list_holder}>
      {orders.map((order) => (
        <OrdersListItem key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrdersList;

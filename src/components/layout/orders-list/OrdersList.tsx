import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../services/Store";
import { selectFeedOrders } from "../../../services/reducers/WebSocketReducer";
import styles from "./OrdersList.module.css";
import OrdersListItem from "./item/OrdersListItem";
import { Link, useLocation } from "react-router-dom";
import { PAGES_URL } from "../../../constants/RoutesUrls";

const OrdersList = () => {
  const { t } = useTranslation("feed");
  const orders = useAppSelector(selectFeedOrders);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    // dispatch(INGREDIENT_SHOW_DETAILS(ingredient));
    // dispatch(SHOW_MODAL_INGREDIENT());
  };

  return (
    <div className={styles.orders_list_holder}>
      {orders.map((order) => (
        <Link
          to={`${PAGES_URL.FEED}/${order.number}`}
          key={order._id}
          state={{ bgLocation: location }}
          style={{ textDecoration: "none", color: "white" }}
          onClick={handleClick}
        >
          <OrdersListItem order={order} />
        </Link>
      ))}
    </div>
  );
};

export default OrdersList;

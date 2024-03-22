import { useAppDispatch, useAppSelector } from "../../services/Store";
import styles from "./OrderPage.module.css";
import OrderData from "../../components/modal/order-data/OrderData";
import { selectObservedOrder } from "../../services/reducers/OrderReducer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrderByIdAction } from "../../services/actions/OrderActions";

const OrderPage = () => {
  let { orderId } = useParams();
  const order = useAppSelector(selectObservedOrder);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (orderId && order === null) {
      dispatch(fetchOrderByIdAction(orderId));
    }
  }, [order, orderId, dispatch]);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_digits-default mt-20 mb-5">
        {orderId ? `#0${orderId}` : "#???"}
      </h1>
      {order !== null && <OrderData />}
    </main>
  );
};

export default OrderPage;

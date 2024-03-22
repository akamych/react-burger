import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/Store";
import {
  WS_CLOSE,
  WS_MY_START,
} from "../../../services/actions/WebSocketActions";
import OrdersList from "../orders-list/OrdersList";

const OrdersHistory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WS_MY_START());
    return () => {
      dispatch(WS_CLOSE());
    };
  }, []);

  return <OrdersList />;
};

export default OrdersHistory;

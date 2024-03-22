import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../services/Store";
import { WS_CLOSE, WS_START } from "../../../services/actions/WebSocketActions";
import OrdersList from "../orders-list/OrdersList";
import { getCookie } from "../../../utils/CookieUtils";

const OrdersHistory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WS_START(`?token=${getCookie("token")}`));
    return () => {
      dispatch(WS_CLOSE());
    };
  }, []);

  return <OrdersList />;
};

export default OrdersHistory;

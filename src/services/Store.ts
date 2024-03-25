import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/IngredientsReducer";
import modalReducer from "./reducers/ModalReducer";
import orderReducer from "./reducers/OrderReducer";
import authReducer from "./reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import WebSocketReducer from "./reducers/WebSocketReducer";
import { WebSocketMiddleware } from "./middleware/WebSocketMiddleware";
import {
  WS_CLOSE,
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from "./actions/WebSocketActions";

const wsActions = {
  wsInit: WS_START,
  wsClose: WS_CLOSE,
  onOpen: WS_SUCCESS,
  onClose: WS_CLOSED,
  onError: WS_ERROR,
  onMessage: WS_GET_ORDERS,
};

const orderMiddleware = WebSocketMiddleware(wsActions);

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    auth: authReducer,
    webSocket: WebSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

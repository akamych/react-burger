import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/IngredientsReducer";
import modalReducer from "./reducers/ModalReducer";
import orderReducer from "./reducers/OrderReducer";
import authReducer from "./reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import WebSocketReducer from "./reducers/WebSocketReducer";
import { WebSocketMiddleware } from "./middleware/WebSocketMiddleware";
import { WEBSOCKET_API } from "../constants/api";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    auth: authReducer,
    webSocket: WebSocketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(WebSocketMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

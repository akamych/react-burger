import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/IngredientsReducer";
import modalReducer from "./reducers/ModalReducer";
import orderReducer from "./reducers/OrderReducer";
import authReducer from "./reducers/AuthReducer";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: modalReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;

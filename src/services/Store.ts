// store.ts
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./reducers/IngredientsReducer";
import ModalReducer from "./reducers/ModalReducer";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    modal: ModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

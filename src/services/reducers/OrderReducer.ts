import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Nullable } from "../../types/common.type";
import { createOrderAction, ORDER_CLEAR } from "../actions/OrderActions";

interface OrderState {
  number: Nullable<number>;
  requests: {
    create: {
      pending: boolean;
      isError: boolean;
      text: Nullable<string>;
    };
  };
}

export const initialOrderState: OrderState = {
  number: null,
  requests: {
    create: {
      pending: false,
      isError: false,
      text: null,
    },
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      createOrderAction.fulfilled,
      (state: OrderState, action: PayloadAction<number>) => {
        state.number = action.payload;
        state.requests.create.isError = false;
        state.requests.create.text = null;
      }
    );
    builder.addCase(createOrderAction.pending, (state: OrderState) => {
      state.requests.create.pending = true;
      state.requests.create.isError = false;
      state.requests.create.text = null;
    });
    builder.addCase(
      createOrderAction.rejected,
      (state: OrderState, action: PayloadAction<string | undefined>) => {
        state.number = null;
        state.requests.create.isError = true;
        state.requests.create.text = action.payload ? action.payload : "error";
      }
    );
    builder.addCase(ORDER_CLEAR, (state: OrderState) => {
      state = initialOrderState;
    });
  },
});

export default orderSlice.reducer;

export const selectOrderId = (state: RootState) => state.order.number;
export const selectOrderFetchError = (state: RootState) =>
  state.order.requests.create;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Nullable } from "../../types/common.type";
import {
  createOrderAction,
  fetchOrderByIdAction,
  ORDER_CLEAR,
  ORDER_HIDE_DETAILS,
  ORDER_SHOW_DETAILS,
} from "../actions/OrderActions";
import { TSocketMessageOrder } from "../../types/webSocket.type";

interface OrderState {
  number: Nullable<number>;
  observed: Nullable<TSocketMessageOrder>;
  requests: {
    create: {
      pending: boolean;
      isError: boolean;
      text: Nullable<string>;
    };
    loadById: {
      pending: boolean;
      isError: boolean;
      text: Nullable<string>;
    };
  };
}

export const initialOrderState: OrderState = {
  number: null,
  observed: null,
  requests: {
    create: {
      pending: false,
      isError: false,
      text: null,
    },
    loadById: {
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
    builder.addCase(
      ORDER_SHOW_DETAILS,
      (state: OrderState, action: PayloadAction<TSocketMessageOrder>) => {
        state.observed = action.payload;
      }
    );
    builder.addCase(ORDER_HIDE_DETAILS, (state: OrderState) => {
      state.observed = null;
    });
    builder.addCase(
      fetchOrderByIdAction.fulfilled,
      (state: OrderState, action: PayloadAction<TSocketMessageOrder>) => {
        state.observed = action.payload;
        state.requests.loadById.isError = false;
        state.requests.loadById.text = null;
      }
    );
    builder.addCase(fetchOrderByIdAction.pending, (state: OrderState) => {
      state.requests.loadById.pending = true;
      state.requests.loadById.isError = false;
      state.requests.loadById.text = null;
    });
    builder.addCase(
      fetchOrderByIdAction.rejected,
      (state: OrderState, action: PayloadAction<string | undefined>) => {
        state.observed = null;
        state.requests.loadById.isError = true;
        state.requests.loadById.text = action.payload
          ? action.payload
          : "error";
      }
    );
  },
});

export default orderSlice.reducer;

export const selectOrderId = (state: RootState) => state.order.number;
export const selectOrderFetchError = (state: RootState) =>
  state.order.requests.create;
export const selectObservedOrder = (state: RootState) => state.order.observed;

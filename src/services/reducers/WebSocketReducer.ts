import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from "../actions/WebSocketActions";
import {
  TSocketMessage,
  TSocketMessageOrder,
} from "../../types/webSocket.type";
import { Undef } from "../../types/common.type";

interface WebSocketState {
  wsConnected: boolean;
  orders: TSocketMessageOrder[];
  total: number;
  totalToday: number;
  error?: Undef<string>;
}

export const initialWebSocketState: WebSocketState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: initialWebSocketState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(WS_START, (state: WebSocketState) => {
      state.error = undefined;
      state.wsConnected = false;
    });
    builder.addCase(WS_SUCCESS, (state: WebSocketState) => {
      state.error = undefined;
      state.wsConnected = true;
    });
    builder.addCase(WS_CLOSED, (state: WebSocketState) => {
      state.error = undefined;
      state.wsConnected = false;
    });
    // builder.addCase(
    //   WS_ERROR,
    //   (state: WebSocketState, action: PayloadAction<MessageEvent>) => {
    //     state.error = action.payload.data;
    //     state.wsConnected = true;
    //   }
    // );
    builder.addCase(
      WS_GET_ORDERS,
      (state: WebSocketState, action: PayloadAction<TSocketMessage>) => {
        state.error = undefined;
        state.orders = [...action.payload.orders];
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    );
  },
});

export default webSocketSlice.reducer;

export const selectFeedOrders = (state: RootState) => state.webSocket.orders;
export const selectFeedTotal = (state: RootState) => state.webSocket.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.webSocket.totalToday;

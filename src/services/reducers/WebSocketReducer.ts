import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  WS_CLOSE,
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

interface WebSocketState {
  wsConnected: boolean;
  isMy: boolean;
  orders: TSocketMessageOrder[];
  total: number;
  totalToday: number;
  error: boolean;
}

export const initialWebSocketState: WebSocketState = {
  wsConnected: false,
  isMy: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
};

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: initialWebSocketState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      WS_START,
      (state: WebSocketState, action: PayloadAction<string>) => {
        state.isMy = action.payload !== "/all";
        state.error = false;
        state.wsConnected = false;
        state.orders = [];
      }
    );
    builder.addCase(WS_SUCCESS, (state: WebSocketState) => {
      state.error = false;
      state.wsConnected = true;
    });
    builder.addCase(WS_CLOSE, (state: WebSocketState) => {
      state.error = false;
      state.wsConnected = false;
      state.orders = [];
    });
    builder.addCase(WS_CLOSED, (state: WebSocketState) => {
      state.error = false;
      state.wsConnected = false;
      state.orders = [];
    });
    builder.addCase(WS_ERROR, (state: WebSocketState) => {
      state.error = true;
      state.wsConnected = false;
    });
    builder.addCase(
      WS_GET_ORDERS,
      (state: WebSocketState, action: PayloadAction<TSocketMessage>) => {
        state.error = false;
        state.orders = action.payload.orders ? [...action.payload.orders] : [];
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    );
  },
});

export default webSocketSlice.reducer;

export const selectFeedOrders = (state: RootState) => state.webSocket.orders;
export const selectIsMyOrder = (state: RootState) => state.webSocket.isMy;
export const selectFeedTotal = (state: RootState) => state.webSocket.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.webSocket.totalToday;

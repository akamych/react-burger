import { createAction } from "@reduxjs/toolkit";
import { TSocketMessage } from "../../types/webSocket.type";

export const WS_START = createAction<string>("ws/start");
export const WS_CLOSE = createAction("ws/close");
export const WS_SUCCESS = createAction("ws/success");
export const WS_CLOSED = createAction("ws/closed");
export const WS_ERROR = createAction<string>("ws/error");
export const WS_GET_ORDERS = createAction<TSocketMessage>("ws/get/orders");

export type WS_ACTIONS =
  | ReturnType<typeof WS_START>
  | ReturnType<typeof WS_CLOSE>
  | ReturnType<typeof WS_SUCCESS>
  | ReturnType<typeof WS_CLOSED>
  | ReturnType<typeof WS_ERROR>
  | ReturnType<typeof WS_GET_ORDERS>;

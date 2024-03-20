import { createAction } from "@reduxjs/toolkit";
import { TSocketMessage } from "../../types/webSocket.type";

export const WS_START = createAction<string>("ws/start");
export const WS_SUCCESS = createAction("ws/success");
export const WS_CLOSED = createAction("ws/closed");
export const WS_ERROR = createAction("ws/error");
export const WS_GET_ORDERS = createAction<TSocketMessage>("ws/get/orders");
export const WS_SEND = createAction("ws/send");

export const WEBSOCKET_ACTIONS =
  WS_START || WS_SUCCESS || WS_ERROR || WS_CLOSED || WS_GET_ORDERS || WS_SEND;
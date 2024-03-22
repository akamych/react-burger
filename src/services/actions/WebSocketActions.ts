import { createAction } from "@reduxjs/toolkit";
import { TSocketMessage } from "../../types/webSocket.type";

export const WS_START = createAction("ws/start");
export const WS_MY_START = createAction("ws/start/my");
export const WS_CLOSE = createAction("ws/close");
export const WS_SUCCESS = createAction("ws/success");
export const WS_CLOSED = createAction("ws/closed");
export const WS_ERROR = createAction("ws/error");
export const WS_GET_ORDERS = createAction<TSocketMessage>("ws/get/orders");
export const WS_SEND = createAction("ws/send");

// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState, useAppDispatch } from "../Store";
import {
  WS_CLOSE,
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_MY_START,
  WS_START,
  WS_SUCCESS,
} from "../actions/WebSocketActions";
import { UnknownAction } from "@reduxjs/toolkit";
import { TSocketMessage } from "../../types/webSocket.type";
import { WEBSOCKET_API } from "../../constants/api";
import { getCookie } from "../../utils/CookieUtils";

export const WebSocketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: UnknownAction) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_START.type) {
        socket = new WebSocket(`${WEBSOCKET_API}/all`);
      }

      if (type === WS_MY_START.type) {
        socket = new WebSocket(`${WEBSOCKET_API}?token=${getCookie("token")}`);
      }

      if (type === WS_CLOSE.type) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = () => dispatch(WS_SUCCESS());
        socket.onerror = () => dispatch(WS_ERROR());
        socket.onclose = () => dispatch(WS_CLOSED());

        socket.onmessage = (event) => {
          const { data } = event;
          const response = JSON.parse(data) as TSocketMessage;
          dispatch(WS_GET_ORDERS(response));
        };

        // if (type === "WS_SEND_MESSAGE") {
        //   const message = payload;
        //   // функция для отправки сообщения на сервер
        //   socket.send(JSON.stringify(message));
        // }
      }

      next(action);
    };
  }) as Middleware;
};

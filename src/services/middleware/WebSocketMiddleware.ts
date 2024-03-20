// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState, useAppDispatch } from "../Store";
import {
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from "../actions/WebSocketActions";
import { UnknownAction } from "@reduxjs/toolkit";
import { TSocketMessage } from "../../types/webSocket.type";

export const WebSocketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: UnknownAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_START.type && typeof payload === "string" && !socket) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = () => dispatch(WS_SUCCESS());
        socket.onerror = (event) => dispatch(WS_ERROR());
        socket.onclose = (event) => dispatch(WS_CLOSED());

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

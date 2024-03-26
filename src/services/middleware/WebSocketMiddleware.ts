// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../Store";
import { TSocketMessage } from "../../types/webSocket.type";
import { WS_ACTIONS } from "../actions/WebSocketActions";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export type TwsActionTypes = {
  wsInit: ActionCreatorWithPayload<string>;
  wsClose: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TSocketMessage>;
};

export const WebSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WS_ACTIONS) => {
      const { dispatch } = store;
      const { payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (wsInit.match(action)) {
        socket = new WebSocket(payload as string);
      }

      if (wsClose.match(action)) {
        socket?.close();
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type.toString()));
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TSocketMessage = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };
      }

      next(action);
    };
  }) as Middleware;
};

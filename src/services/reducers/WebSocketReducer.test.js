import {
  WS_CLOSE,
  WS_CLOSED,
  WS_ERROR,
  WS_GET_ORDERS,
  WS_START,
  WS_SUCCESS,
} from "../actions/WebSocketActions";
import reducer, { initialWebSocketState } from "./WebSocketReducer";
import { ORDER_MOCK } from "./mocks/Orders.mock";

describe("WebSocket reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialWebSocketState);
  });

  it("should start", () => {
    expect(reducer(undefined, { type: WS_START.type, payload: "" })).toEqual({
      ...initialWebSocketState,
      isMy: true,
    });
  });

  it("should connect", () => {
    expect(reducer(undefined, { type: WS_SUCCESS.type })).toEqual({
      ...initialWebSocketState,
      wsConnected: true,
    });
  });

  it("should close", () => {
    expect(reducer(undefined, { type: WS_CLOSE.type })).toEqual(
      initialWebSocketState
    );
  });

  it("should be closed", () => {
    expect(reducer(undefined, { type: WS_CLOSED.type })).toEqual(
      initialWebSocketState
    );
  });

  it("should show error", () => {
    const errorText = "error Text";
    expect(
      reducer(undefined, { type: WS_ERROR.type, payload: errorText })
    ).toEqual({
      ...initialWebSocketState,
      error: errorText,
    });
  });

  it("should get orders", () => {
    const mockMessage = {
      success: true,
      orders: [ORDER_MOCK],
      total: 2,
      totalToday: 1,
    };
    expect(
      reducer(undefined, { type: WS_GET_ORDERS.type, payload: mockMessage })
    ).toEqual({
      ...initialWebSocketState,
      orders: mockMessage.orders,
      total: mockMessage.total,
      totalToday: mockMessage.totalToday,
    });
  });
});

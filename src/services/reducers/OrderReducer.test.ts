import reducer, { initialOrderState } from "./OrderReducer";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { ORDER_MOCK } from "./mocks/Orders.mock";
import {
  ORDER_CLEAR,
  ORDER_HIDE_DETAILS,
  ORDER_SHOW_DETAILS,
  createOrderAction,
  fetchOrderByIdAction,
} from "../actions/OrderActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Orders reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialOrderState);
  });

  describe("Creating an order", () => {
    it("should work correctly", async () => {
      const store = mockStore(initialOrderState);

      fetchMock.postOnce("*", () => {
        return {
          order: {
            number: ORDER_MOCK.number,
          },
        };
      });

      await store
        .dispatch(createOrderAction(ORDER_MOCK.ingredients))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toBe(createOrderAction.pending.type);
          expect(actions[1].type).toBe(createOrderAction.fulfilled.type);
          expect(actions[1].payload).toEqual(ORDER_MOCK.number);
        });
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: createOrderAction.pending.type }).requests
          .create.pending
      ).toEqual(true);
    });

    it("should see request rejected", () => {
      const errorText = "Error text";
      expect(
        reducer(undefined, {
          type: createOrderAction.rejected.type,
          payload: errorText,
        }).requests.create.text
      ).toEqual(errorText);
    });
  });

  describe("Fetching an order", () => {
    it("should work correctly", async () => {
      const store = mockStore(initialOrderState);

      fetchMock.getOnce("*", () => {
        return {
          orders: [ORDER_MOCK],
        };
      });

      await store.dispatch(fetchOrderByIdAction(ORDER_MOCK)).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(fetchOrderByIdAction.pending.type);
        expect(actions[1].type).toBe(fetchOrderByIdAction.fulfilled.type);
        expect(actions[1].payload).toEqual(ORDER_MOCK);
      });
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: fetchOrderByIdAction.pending.type }).requests
          .loadById.pending
      ).toEqual(true);
    });

    it("should see request rejected", () => {
      const errorText = "Error text";
      expect(
        reducer(undefined, {
          type: fetchOrderByIdAction.rejected.type,
          payload: errorText,
        }).requests.loadById.text
      ).toEqual(errorText);
    });
  });

  describe("Other actions", () => {
    it("should clear orders", () => {
      expect(
        reducer(undefined, {
          type: ORDER_CLEAR.type,
        })
      ).toEqual(initialOrderState);
    });

    it("should show details", () => {
      expect(
        reducer(undefined, {
          type: ORDER_SHOW_DETAILS.type,
          payload: ORDER_MOCK,
        }).observed
      ).toEqual(ORDER_MOCK);
    });

    it("should hide details", () => {
      expect(
        reducer(undefined, {
          type: ORDER_HIDE_DETAILS.type,
        }).observed
      ).toEqual(null);
    });
  });
});

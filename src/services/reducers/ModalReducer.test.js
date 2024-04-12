import {
  HIDE_MODAL,
  SHOW_MODAL_INGREDIENT,
  SHOW_MODAL_ORDER,
  SHOW_MODAL_ORDER_DATA,
} from "../actions/ModalActions";
import reducer, { initialModalState } from "./ModalReducer";

describe("Modal reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialModalState);
  });

  it("should open ingredient modal", () => {
    expect(reducer(undefined, { type: SHOW_MODAL_INGREDIENT.type })).toEqual({
      isShown: true,
      type: "ingredient",
    });
  });

  it("should open order modal", () => {
    expect(reducer(undefined, { type: SHOW_MODAL_ORDER.type })).toEqual({
      isShown: true,
      type: "order",
    });
  });

  it("should open order data modal", () => {
    expect(reducer(undefined, { type: SHOW_MODAL_ORDER_DATA.type })).toEqual({
      isShown: true,
      type: "orderData",
    });
  });

  it("should open order data modal", () => {
    expect(reducer(undefined, { type: HIDE_MODAL.type })).toEqual(
      initialModalState
    );
  });
});

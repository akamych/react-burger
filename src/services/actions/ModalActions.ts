import { createAction } from "@reduxjs/toolkit";

export const SHOW_MODAL_INGREDIENT = createAction("modal/show/ingredient");
export const SHOW_MODAL_ORDER = createAction("modal/show/order");
export const SHOW_MODAL_ORDER_DATA = createAction("modal/show/order/data");
export const HIDE_MODAL = createAction("modal/hide");

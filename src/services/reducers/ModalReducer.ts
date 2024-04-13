import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  HIDE_MODAL,
  SHOW_MODAL_INGREDIENT,
  SHOW_MODAL_ORDER,
  SHOW_MODAL_ORDER_DATA,
} from "../actions/ModalActions";

interface ModalState {
  isShown: boolean;
  type: "ingredient" | "order" | "orderData" | "none";
}

export const initialModalState: ModalState = {
  isShown: false,
  type: "none",
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SHOW_MODAL_INGREDIENT, (state: ModalState) => {
      state.isShown = true;
      state.type = "ingredient";
    });
    builder.addCase(SHOW_MODAL_ORDER, (state: ModalState) => {
      state.isShown = true;
      state.type = "order";
    });
    builder.addCase(SHOW_MODAL_ORDER_DATA, (state: ModalState) => {
      state.isShown = true;
      state.type = "orderData";
    });
    builder.addCase(HIDE_MODAL, (state: ModalState) => {
      state.isShown = false;
      state.type = "none";
    });
  },
});

export default modalSlice.reducer;

export const selectModalIsShown = (state: RootState) => state.modal.isShown;
export const selectModalType = (state: RootState) => state.modal.type;

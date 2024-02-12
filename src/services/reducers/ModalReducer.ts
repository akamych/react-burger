import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { HIDE_MODAL, SHOW_MODAL_INGREDIENT, SHOW_MODAL_ORDER } from "../actions/ModalActions";

interface ModalState {
  isShown: boolean;
  type: "ingredient" | "order";
}

export const initialModalState: ModalState = {
  isShown: false,
  type: "ingredient",
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
    builder.addCase(HIDE_MODAL, (state: ModalState) => {
      state.isShown = false;
    });
  },
});

export default modalSlice.reducer;

export const selectModalIsShown = (state: RootState) => state.modal.isShown;
export const selectModalType = (state: RootState) => state.modal.type;

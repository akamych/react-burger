import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Nullable } from "../../types/common.type";
import { AuthUserType } from "../../types/auth.type";
import { loginAction, registerAction } from "../actions/AuthActions";

interface AuthState {
  user: Nullable<AuthUserType>;
  request: {
    pending: boolean;
    isError: boolean;
    text: Nullable<string>;
  };
}

export const initialAuthState: AuthState = {
  user: null,
  request: {
    pending: false,
    isError: false,
    text: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      registerAction.fulfilled,
      (state: AuthState, action: PayloadAction<AuthUserType>) => {
        state.user = action.payload;
        state.request.isError = false;
        state.request.text = null;
      }
    );
    builder.addCase(registerAction.pending, (state: AuthState) => {
      state.request.pending = true;
      state.request.isError = false;
      state.request.text = null;
    });
    builder.addCase(
      registerAction.rejected,
      (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.user = null;
        state.request.isError = true;
        state.request.text = action.payload ? action.payload : "error";
      }
    );
    builder.addCase(
      loginAction.fulfilled,
      (state: AuthState, action: PayloadAction<AuthUserType>) => {
        state.user = action.payload;
        state.request.isError = false;
        state.request.text = null;
      }
    );
    builder.addCase(loginAction.pending, (state: AuthState) => {
      state.request.pending = true;
      state.request.isError = false;
      state.request.text = null;
    });
    builder.addCase(
      loginAction.rejected,
      (state: AuthState, action: PayloadAction<string | undefined>) => {
        state.user = null;
        state.request.isError = true;
        state.request.text = action.payload ? action.payload : "error";
      }
    );
  },
});

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthRequestError = (state: RootState) => state.auth.request;

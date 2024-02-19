import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "../../constants/http";
import { API_URL_NORMA } from "../../constants/api";
import { fetchWithRefresh } from "../../utils/ApiUtils";
import {
  AuthUserType,
  LoginRequestType,
  SignUpRequestType,
} from "../../types/auth.type";

const registerRequest = async (
  form: SignUpRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/register`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      console.log({ response });
      return response.user;
    })
    .catch((error) => {
      console.log({ error });
      return rejectWithValue(error);
    });

export const registerAction = createAsyncThunk<
  AuthUserType,
  SignUpRequestType,
  { rejectValue: string }
>("auth/register", async (form, { rejectWithValue }) => {
  return await registerRequest(form, rejectWithValue);
});

const loginRequest = async (
  form: LoginRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/login`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      console.log({ response });
      return response.user;
    })
    .catch((error) => {
      console.log({ error });
      return rejectWithValue(error);
    });

export const loginAction = createAsyncThunk<
  AuthUserType,
  LoginRequestType,
  { rejectValue: string }
>("auth/login", async (form, { rejectWithValue }) => {
  return await loginRequest(form, rejectWithValue);
});

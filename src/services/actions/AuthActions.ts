import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "../../constants/http";
import { API_URL_NORMA } from "../../constants/api";
import { fetchWithRefresh, setAccessTokenCookie } from "../../utils/ApiUtils";
import {
  AuthUserType,
  DataChangeRequestType,
  LoginRequestType,
  ResetPasswordConfirmRequestType,
  ResetPasswordRequestType,
  SignUpRequestType,
} from "../../types/auth.type";
import { getCookie, setCookie } from "../../utils/CookieUtils";

const registerRequest = async (
  form: SignUpRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/register`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      localStorage.setItem("refreshToken", response.refreshToken);
      return response.user;
    })
    .catch((error) => {
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
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      localStorage.setItem("refreshToken", response.refreshToken);
      setAccessTokenCookie(response.accessToken);
      return response.user;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const loginAction = createAsyncThunk<
  AuthUserType,
  LoginRequestType,
  { rejectValue: string }
>("auth/login", async (form, { rejectWithValue }) => {
  return await loginRequest(form, rejectWithValue);
});

const authRequest = async (rejectWithValue: (value: string) => unknown) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/user`, {
    method: HTTP_METHODS.GET,
    headers: {
      Authorization: "Bearer " + getCookie("token"),
    },
  })
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const authAction = createAsyncThunk<
  AuthUserType,
  undefined,
  { rejectValue: string }
>("auth/user", async (form, { rejectWithValue }) => {
  return await authRequest(rejectWithValue);
});

const resetPasswordRequest = async (
  form: ResetPasswordRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/password-reset`, {
    method: HTTP_METHODS.POST,
    headers: {
      Authorization: "Bearer " + getCookie("token"),
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      return response.success;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const resetPasswordAction = createAsyncThunk<
  boolean,
  ResetPasswordRequestType,
  { rejectValue: string }
>("auth/password-reset", async (form, { rejectWithValue }) => {
  return await resetPasswordRequest(form, rejectWithValue);
});

const resetPasswordConfirmRequest = async (
  form: ResetPasswordConfirmRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/password-reset/reset`, {
    method: HTTP_METHODS.POST,
    headers: {
      Authorization: "Bearer " + getCookie("token"),
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      return response.success;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const resetPasswordConfirmAction = createAsyncThunk<
  boolean,
  ResetPasswordConfirmRequestType,
  { rejectValue: string }
>("auth/password-reset/reset", async (form, { rejectWithValue }) => {
  return await resetPasswordConfirmRequest(form, rejectWithValue);
});

const logoutRequest = async (rejectWithValue: (value: string) => unknown) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/logout`, {
    method: HTTP_METHODS.POST,
    headers: {
      Authorization: "Bearer " + getCookie("token"),
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  })
    .then((response) => {
      setCookie("token", "", { expires: 0 });
      localStorage.removeItem("refreshToken");
      return response.success;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const logoutAction = createAsyncThunk<
  boolean,
  undefined,
  { rejectValue: string }
>("auth/logout", async (form, { rejectWithValue }) => {
  return await logoutRequest(rejectWithValue);
});

const changeDataRequest = async (
  form: DataChangeRequestType,
  rejectWithValue: (value: string) => unknown
) =>
  await fetchWithRefresh(`${API_URL_NORMA}/auth/user `, {
    method: HTTP_METHODS.PATCH,
    headers: {
      Authorization: "Bearer " + getCookie("token"),
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  })
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const changeDataAction = createAsyncThunk<
  AuthUserType,
  DataChangeRequestType,
  { rejectValue: string }
>("auth/data/change", async (form, { rejectWithValue }) => {
  return await changeDataRequest(form, rejectWithValue);
});

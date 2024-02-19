import { API_URL_NORMA } from "../constants/api";
import { Nullable } from "../types/common.type";
import { setCookie } from "./CookieUtils";

type ResponseType = {
  success: boolean;
  data: unknown;
};

export const checkResponse = (res: Response): ResponseType | Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const setAccessTokenCookie = (token: string) => {
  if (token.indexOf("Bearer") !== 0) {
    return;
  }
  setCookie("token", token.split("Bearer ")[1]);
};

export const refreshToken = () => {
  return fetch(`${API_URL_NORMA}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
    .then(checkResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setAccessTokenCookie(refreshData.accessToken);
      return refreshData;
    });
};

export const fetchWithRefresh = async (
  url: string,
  options: Record<string, any>
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

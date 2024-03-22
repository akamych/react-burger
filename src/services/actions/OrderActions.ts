import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "../../constants/http";
import { API_URL_NORMA } from "../../constants/api";
import { fetchWithRefresh } from "../../utils/ApiUtils";
import { TSocketMessageOrder } from "../../types/webSocket.type";

const createOrderRequest = async (
  ingredientsIds: string[],
  rejectWithValue: (value: string) => unknown
): Promise<number> =>
  await fetchWithRefresh(`${API_URL_NORMA}/orders`, {
    method: HTTP_METHODS.POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingredientsIds }),
  })
    .then((response) => {
      return response.order.number;
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const createOrderAction = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>("order", async (ingredientsIds, { rejectWithValue }) => {
  return await createOrderRequest(ingredientsIds, rejectWithValue);
});

export const ORDER_CLEAR = createAction("order/clear");

export const ORDER_SHOW_DETAILS =
  createAction<TSocketMessageOrder>("order/show");
export const ORDER_HIDE_DETAILS = createAction("order/hide");

const fetchOrderByIdRequest = async (
  orderId: string,
  rejectWithValue: (value: string) => unknown
): Promise<TSocketMessageOrder> =>
  await fetchWithRefresh(`${API_URL_NORMA}/orders/${orderId}`, {
    method: HTTP_METHODS.GET,
  })
    .then((response) => {
      const { orders } = response;
      if (!orders) {
        return rejectWithValue("");
      }
      return orders[0];
    })
    .catch((error) => {
      return rejectWithValue(error);
    });

export const fetchOrderByIdAction = createAsyncThunk<
  TSocketMessageOrder,
  string,
  { rejectValue: string }
>(
  "orderById",
  async (orderId, { rejectWithValue }) =>
    await fetchOrderByIdRequest(orderId, rejectWithValue)
);

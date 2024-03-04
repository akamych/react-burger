import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "../../constants/http";
import { API_URL_NORMA } from "../../constants/api";
import { fetchWithRefresh } from "../../utils/ApiUtils";

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

import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUSES } from "../../constants/httpStatuses";
import { API_URL_NORMA } from "../../constants/api";

const createOrderRequest = async (
  ingredientsIds: string[],
  rejectWithValue: (value: string) => unknown
) => {
  try {
    const response = await fetch(`${API_URL_NORMA}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: ingredientsIds }),
    });

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json();
      return rejectWithValue(error.message);
    }

    const jsonRespone = await response.json();
    return jsonRespone.order.number;
  } catch (error) {
    return rejectWithValue("Возникла ошибка");
  }
};

export const createOrderAction = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>("order", async (ingredientsIds, { rejectWithValue }) => {
  return await createOrderRequest(ingredientsIds, rejectWithValue);
});

export const ORDER_CLEAR = createAction("order/clear");

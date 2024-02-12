import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUSES } from "../../constants/httpStatuses";
import { API_URL_NORMA } from "../../constants/api";
import { IngredientType } from "../../types/Ingredient.type";

const fetchIngredientsRequest = async (
  rejectWithValue: (value: string) => unknown
) => {
  try {
    const response = await fetch(`${API_URL_NORMA}/ingredients`);

    if (response.status !== HTTP_STATUSES.SUCCESS) {
      const error = await response.json();
      return rejectWithValue(error.reason);
    }

    const jsonRespone = await response.json();
    return jsonRespone.data;
  } catch (error) {
    return rejectWithValue("Возникла ошибка");
  }
};

export const fetchIngredientsAction = createAsyncThunk<
  IngredientType[],
  undefined,
  { rejectValue: string }
>(
  "ingredients",
  async (ingredients, { rejectWithValue }) =>
    await fetchIngredientsRequest(rejectWithValue)
);

export const INGREDIENT_SHOW_DETAILS =
  createAction<IngredientType>("ingredient/show");
export const INGREDIENT_HIDE_DETAILS = createAction("ingredient/hide");

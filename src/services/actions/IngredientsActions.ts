import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP_STATUSES } from "../../constants/httpStatuses";
import { API_URL_NORMA } from "../../constants/api";
import {
  IngredientType,
  SwapIngredientType,
} from "../../types/Ingredient.type";

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

export const CONSTRUCTOR_ADD_BUN = createAction<IngredientType>(
  "constructor/add/bun"
);
export const CONSTRUCTOR_ADD_INGREDIENT = createAction<IngredientType>(
  "constructor/add/ingredient"
);
export const CONSTRUCTOR_REMOVE_INGREDIENT = createAction<number>(
  "constructor/remove/ingredient"
);

export const CONSTRUCTOR_SWAP_INGREDIENT = createAction<SwapIngredientType>(
  "constructor/swap/ingredient"
);
export const CONSTRUCTOR_CLEAR = createAction("constructor/reset");

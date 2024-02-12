import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { IngredientType } from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import {
  fetchIngredientsAction,
  INGREDIENT_HIDE_DETAILS,
  INGREDIENT_SHOW_DETAILS,
} from "../actions/IngredientsActions";

interface IngredientState {
  all: IngredientType[];
  selected: IngredientType[];
  observed: Nullable<IngredientType>;
  errors: {
    fetch: {
      isError: boolean;
      text: Nullable<string>;
    };
  };
}

export const initialIngredientsState: IngredientState = {
  all: [],
  selected: [],
  observed: null,
  errors: {
    fetch: {
      isError: false,
      text: null,
    },
  },
};

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: initialIngredientsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchIngredientsAction.fulfilled,
      (state: IngredientState, action: PayloadAction<IngredientType[]>) => {
        state.all = action.payload;
        state.errors.fetch.isError = false;
        state.errors.fetch.text = null;
      }
    );
    builder.addCase(
      fetchIngredientsAction.rejected,
      (state: IngredientState, action: PayloadAction<string | undefined>) => {
        state.errors.fetch.isError = true;
        state.errors.fetch.text = action.payload ? action.payload : "error";
      }
    );
    builder.addCase(
      INGREDIENT_SHOW_DETAILS,
      (state: IngredientState, action: PayloadAction<IngredientType>) => {
        state.observed = action.payload;
      }
    );
    builder.addCase(
      INGREDIENT_HIDE_DETAILS,
      (state: IngredientState, action: PayloadAction<IngredientType>) => {
        state.observed = null;
      }
    );
  },
});

export default ingredientSlice.reducer;

export const selectFetchedIngredients = (state: RootState) =>
  state.ingredients.all;
export const selectSelectedIngredients = (state: RootState) =>
  state.ingredients.selected;
export const selectObservedIngredient = (state: RootState) =>
  state.ingredients.observed;

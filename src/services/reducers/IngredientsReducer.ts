import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  IngredientType,
  SwapIngredientType,
} from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_SWAP_INGREDIENT,
  fetchIngredientsAction,
  INGREDIENT_HIDE_DETAILS,
  INGREDIENT_SHOW_DETAILS,
} from "../actions/IngredientsActions";

interface IngredientState {
  all: IngredientType[];
  selected: {
    bun: Nullable<IngredientType>;
    ingredients: IngredientType[];
    count: Record<string, number>;
  };
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
  selected: {
    bun: null,
    ingredients: [],
    count: {},
  },
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
        state = initialIngredientsState;
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
    builder.addCase(INGREDIENT_HIDE_DETAILS, (state: IngredientState) => {
      state.observed = null;
    });
    builder.addCase(
      CONSTRUCTOR_ADD_BUN,
      (state: IngredientState, action: PayloadAction<IngredientType>) => {
        state.selected.bun = action.payload;
      }
    );
    builder.addCase(
      CONSTRUCTOR_ADD_INGREDIENT,
      (state: IngredientState, action: PayloadAction<IngredientType>) => {
        state.selected.ingredients.push(action.payload);
        state.selected.count[action.payload._id] = state.selected.count[
          action.payload._id
        ]
          ? state.selected.count[action.payload._id] + 1
          : 1;
      }
    );
    builder.addCase(
      CONSTRUCTOR_REMOVE_INGREDIENT,
      (state: IngredientState, action: PayloadAction<number>) => {
        const id = state.selected.ingredients[action.payload]._id;
        state.selected.ingredients.splice(action.payload, 1);
        state.selected.count[id] =
          state.selected.count[id] > 1 ? state.selected.count[id] - 1 : 0;
      }
    );
    builder.addCase(
      CONSTRUCTOR_SWAP_INGREDIENT,
      (state: IngredientState, action: PayloadAction<SwapIngredientType>) => {
        const { first, second } = action.payload;
        state.selected.ingredients[first.index] = second.ingredient;
        state.selected.ingredients[second.index] = first.ingredient;
      }
    );
  },
});

export default ingredientSlice.reducer;

export const selectFetchedIngredients = (state: RootState) =>
  state.ingredients.all;
export const selectSelectedBun = (state: RootState) =>
  state.ingredients.selected.bun;
export const selectSelectedIngredients = (state: RootState) =>
  state.ingredients.selected.ingredients;
export const selectIngredientCount = (id: string) => (state: RootState) =>
  state.ingredients.selected.count[id]
    ? state.ingredients.selected.count[id]
    : 0;
export const selectObservedIngredient = (state: RootState) =>
  state.ingredients.observed;

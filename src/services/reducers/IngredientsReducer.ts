import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  IngredientType,
  IngredientTypeWithUuid,
  SwapIngredientType,
} from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR,
  CONSTRUCTOR_SWAP_INGREDIENT,
  fetchIngredientsAction,
  INGREDIENT_HIDE_DETAILS,
  INGREDIENT_SHOW_DETAILS,
  INGREDIENT_SHOW_DETAILS_BY_ID,
} from "../actions/IngredientsActions";
import { v4 as uuid } from "uuid";

interface IngredientState {
  all: IngredientType[];
  selected: {
    bun: Nullable<IngredientType>;
    ingredients: IngredientTypeWithUuid[];
    count: Record<string, number>;
  };
  observed: Nullable<IngredientType>;
  requests: {
    fetch: {
      pending: boolean;
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
  requests: {
    fetch: {
      pending: false,
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
        state.requests.fetch.isError = false;
        state.requests.fetch.text = null;
      }
    );
    builder.addCase(
      fetchIngredientsAction.pending,
      (state: IngredientState) => {
        state.requests.fetch.pending = true;
        state.requests.fetch.isError = false;
        state.requests.fetch.text = null;
      }
    );
    builder.addCase(
      fetchIngredientsAction.rejected,
      (state: IngredientState, action: PayloadAction<string | undefined>) => {
        state = initialIngredientsState;
        state.requests.fetch.isError = true;
        state.requests.fetch.text = action.payload ? action.payload : "error";
      }
    );
    builder.addCase(
      INGREDIENT_SHOW_DETAILS,
      (state: IngredientState, action: PayloadAction<IngredientType>) => {
        state.observed = action.payload;
      }
    );
    builder.addCase(
      INGREDIENT_SHOW_DETAILS_BY_ID,
      (state: IngredientState, action: PayloadAction<string>) => {
        state.observed =
          state.all.find((ingredient) => ingredient._id === action.payload) ||
          null;
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
        state.selected.ingredients.push({
          ...action.payload,
          uuid: uuid(),
        });
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
        const { from, to } = action.payload;
        const isAscending = from.index < to.index;

        let nextItem = null;

        if (isAscending) {
          for (let i = 0; i < state.selected.ingredients.length; i++) {
            if (
              (i < from.index && i < to.index) ||
              (i > from.index && i > to.index)
            ) {
              continue;
            } else if (i === to.index) {
              state.selected.ingredients[i] = from.ingredient;
            } else if (from.index <= i) {
              nextItem = state.selected.ingredients[i + 1];
              state.selected.ingredients[i] = nextItem;
            }
          }
        } else {
          for (let i = state.selected.ingredients.length - 1; i >= 0; i--) {
            if (
              (i < from.index && i < to.index) ||
              (i > from.index && i > to.index)
            ) {
              continue;
            } else if (i === to.index) {
              state.selected.ingredients[i] = from.ingredient;
            } else if (from.index >= i) {
              nextItem = state.selected.ingredients[i - 1];
              state.selected.ingredients[i] = nextItem;
            }
          }
        }
      }
    );
    builder.addCase(CONSTRUCTOR_CLEAR, (state: IngredientState) => {
      state.selected = initialIngredientsState.selected;
    });
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

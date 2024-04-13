import reducer, { initialIngredientsState } from "./IngredientsReducer";
import { INGREDIENTS_MOCK } from "./mocks/Ingredients.mock";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
  CONSTRUCTOR_CLEAR,
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_SWAP_INGREDIENT,
  INGREDIENT_HIDE_DETAILS,
  INGREDIENT_SHOW_DETAILS,
  fetchIngredientsAction,
} from "../actions/IngredientsActions";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { v4 as uuid } from "uuid";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Ingredients reducer", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialIngredientsState);
  });

  describe("Fetching ingredients", () => {
    it("should work correctly", async () => {
      const store = mockStore(initialIngredientsState);

      fetchMock.getOnce("*", () => {
        return { data: INGREDIENTS_MOCK };
      });

      await store.dispatch(fetchIngredientsAction()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(fetchIngredientsAction.pending.type);
        expect(actions[1].type).toBe(fetchIngredientsAction.fulfilled.type);
        expect(actions[1].payload).toEqual(INGREDIENTS_MOCK);
      });
    });

    it("should see request pending", () => {
      expect(
        reducer(undefined, { type: fetchIngredientsAction.pending.type })
          .requests.fetch.pending
      ).toEqual(true);
    });

    it("should see request rejected", () => {
      const errorText = "Error text";
      expect(
        reducer(undefined, {
          type: fetchIngredientsAction.rejected.type,
          payload: errorText,
        }).requests.fetch.text
      ).toEqual(errorText);
    });
  });

  describe("Other actions", () => {
    it("should show details", () => {
      expect(
        reducer(undefined, {
          type: INGREDIENT_SHOW_DETAILS.type,
          payload: INGREDIENTS_MOCK[0],
        }).observed
      ).toEqual(INGREDIENTS_MOCK[0]);
    });

    it("should hide details", () => {
      expect(
        reducer(
          {
            ...initialIngredientsState,
            observed: INGREDIENTS_MOCK[0],
          },
          {
            type: INGREDIENT_HIDE_DETAILS.type,
          }
        ).observed
      ).toEqual(null);
    });

    it("should add bun", () => {
      expect(
        reducer(undefined, {
          type: CONSTRUCTOR_ADD_BUN.type,
          payload: INGREDIENTS_MOCK[0],
        }).selected.bun
      ).toEqual(INGREDIENTS_MOCK[0]);
    });

    it("should add ingredients", () => {
      expect(
        reducer(undefined, {
          type: CONSTRUCTOR_ADD_INGREDIENT.type,
          payload: INGREDIENTS_MOCK[0],
        }).selected.ingredients[0]._id
      ).toEqual(INGREDIENTS_MOCK[0]._id);

      expect(
        reducer(
          {
            ...initialIngredientsState,
            selected: {
              ...initialIngredientsState.selected,
              count: {
                [INGREDIENTS_MOCK[0]._id]: 3,
              },
            },
          },
          {
            type: CONSTRUCTOR_ADD_INGREDIENT.type,
            payload: INGREDIENTS_MOCK[0],
          }
        ).selected.count[INGREDIENTS_MOCK[0]._id]
      ).toEqual(4);
    });

    it("should remove ingredients", () => {
      const mockWithUuid = [
        { ...INGREDIENTS_MOCK[0], uuid: uuid() },
        { ...INGREDIENTS_MOCK[1], uuid: uuid() },
      ];

      expect(
        reducer(
          {
            ...initialIngredientsState,
            selected: {
              ...initialIngredientsState.selected,
              ingredients: mockWithUuid,
              count: {
                [INGREDIENTS_MOCK[0]._id]: 3,
              },
            },
          },
          {
            type: CONSTRUCTOR_REMOVE_INGREDIENT.type,
            payload: 0,
          }
        ).selected
      ).toEqual({
        ...initialIngredientsState.selected,
        ingredients: [mockWithUuid[1]],
        count: {
          [INGREDIENTS_MOCK[0]._id]: 2,
        },
      });
    });

    it("should swap ingredients", () => {
      const mockWithUuid = [
        { ...INGREDIENTS_MOCK[0], uuid: uuid() },
        { ...INGREDIENTS_MOCK[1], uuid: uuid() },
      ];

      expect(
        reducer(
          {
            ...initialIngredientsState,
            selected: {
              ...initialIngredientsState.selected,
              ingredients: mockWithUuid,
            },
          },
          {
            type: CONSTRUCTOR_SWAP_INGREDIENT.type,
            payload: {
              from: {
                index: 0,
                ingredient: mockWithUuid[0],
              },
              to: {
                index: 1,
              },
            },
          }
        ).selected.ingredients
      ).toEqual([mockWithUuid[1], mockWithUuid[0]]);
    });

    it("should clear ingredients", () => {
      const mockWithUuid = [
        { ...INGREDIENTS_MOCK[0], uuid: uuid() },
        { ...INGREDIENTS_MOCK[1], uuid: uuid() },
      ];

      expect(
        reducer(
          {
            ...initialIngredientsState,
            selected: {
              ...initialIngredientsState.selected,
              ingredients: mockWithUuid,
            },
          },
          {
            type: CONSTRUCTOR_CLEAR.type,
          }
        ).selected
      ).toEqual(initialIngredientsState.selected);
    });
  });
});

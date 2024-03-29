export type Ingredient_tabs_keys = "bun" | "sauce" | "main";

export type IngredientType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientTypeWithUuid = IngredientType & {
  uuid: string;
};

export type SwapIngredientType = {
  from: {
    index: number;
    ingredient: IngredientTypeWithUuid;
  };
  to: {
    index: number;
  };
};

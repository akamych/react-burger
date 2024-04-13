import { TSocketMessageOrder } from "../../../types/webSocket.type";
import { INGREDIENTS_MOCK } from "./Ingredients.mock";

export const ORDER_MOCK: TSocketMessageOrder = {
  ingredients: [
    INGREDIENTS_MOCK[0]._id,
    INGREDIENTS_MOCK[1]._id,
    INGREDIENTS_MOCK[2]._id,
  ],
  _id: "_id",
  status: "created",
  number: 123,
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

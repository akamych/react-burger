import { Dispatch, SetStateAction } from "react";
import { checkResponse } from "../components/utils/ApiUtils";
import { IngredientType } from "../types/Ingredient.type";

export const API_URL_NORMA = "https://norma.nomoreparties.space/api";

function getIngredients(
  setIngredients: Dispatch<SetStateAction<IngredientType[]>>
) {
  return fetch(`${API_URL_NORMA}/ingredients`)
    .then(checkResponse)
    .then((response) => {
      if (!response.success) return;
      setIngredients(response.data);
    })
    .catch((error) => console.error(error));
}

export default {
  getIngredients,
};

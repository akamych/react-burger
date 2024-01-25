import React, { useEffect, useState } from "react";
import AppHeader from "../layout/header/Header";
import { Outlet, useOutletContext } from "react-router-dom";
import { IngredientType } from "../../types/Ingredient.type";
import { API_URL_INGREDIENTS } from "../../constants/api";

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  useEffect(() => {
    fetch(API_URL_INGREDIENTS)
      .then((response) => response.json())
      .then((response) => {
        setIngredients(
          response.success === true
            ? (response.data as unknown as IngredientType[])
            : []
        );
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <AppHeader />
      <Outlet context={{ ingredients: ingredients }} />
    </>
  );
};

export function useIngredients() {
  return useOutletContext<{ ingredients: IngredientType[] | null }>();
}

export default App;

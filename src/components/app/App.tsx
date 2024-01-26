import React, { useEffect, useState } from "react";
import AppHeader from "../layout/header/Header";
import { Outlet, useOutletContext } from "react-router-dom";
import { IngredientType } from "../../types/Ingredient.type";
import normaApi from "../../api/normaApi";

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  useEffect(() => {
    normaApi.getIngredients(setIngredients);
  }, []);

  return (
    <>
      <AppHeader />
      <Outlet context={{ ingredients: ingredients }} />
    </>
  );
};

export function useIngredients() {
  return useOutletContext<{ ingredients: IngredientType[] }>();
}

export default App;

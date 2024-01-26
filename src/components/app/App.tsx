import React, { useEffect, useState } from "react";
import AppHeader from "../layout/header/Header";
import { Outlet, useOutletContext } from "react-router-dom";
import { IngredientType } from "../../types/Ingredient.type";
import NormaApi from "../../api/NormaApi";

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);

  useEffect(() => {
    NormaApi.getIngredients(setIngredients);
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

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../services/Store";
import { selectFetchedIngredients } from "../../services/reducers/IngredientsReducer";
import { IngredientType } from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import IngredientDetails from "../../components/modal/ingredients/IngredientDetails";

const IngredientPage = () => {
  let { ingredientId } = useParams();
  const ingredients = useSelector(selectFetchedIngredients);
  const [ingredient, setIngredient] = useState<Nullable<IngredientType>>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const found =
      ingredients.find((ingredient) => ingredient._id === ingredientId) || null;
    setIngredient(found);
  }, [ingredients, ingredientId, dispatch]);

  return (
    <main>
      {ingredient !== null && <IngredientDetails ingredient={ingredient} />}
    </main>
  );
};

export default IngredientPage;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/Store";
import { selectFetchedIngredients } from "../../services/reducers/IngredientsReducer";
import { IngredientType } from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import IngredientDetails from "../../components/modal/ingredients/IngredientDetails";
import { useTranslation } from "react-i18next";
import styles from "./IngredientPage.module.css";

const IngredientPage = () => {
  let { ingredientId } = useParams();
  const { t } = useTranslation("ingredients");
  const ingredients = useAppSelector(selectFetchedIngredients);
  const [ingredient, setIngredient] = useState<Nullable<IngredientType>>(null);

  useEffect(() => {
    const found =
      ingredients.find((ingredient) => ingredient._id === ingredientId) || null;
    setIngredient(found);
  }, [ingredients, ingredientId]);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        {t("h3.details")}
      </h1>
      {ingredient !== null && <IngredientDetails ingredient={ingredient} />}
    </main>
  );
};

export default IngredientPage;

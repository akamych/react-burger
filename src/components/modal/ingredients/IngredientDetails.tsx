import { useTranslation } from "react-i18next";
import styles from "./IngredientDetails.module.css";
import { selectObservedIngredient } from "../../../services/reducers/IngredientsReducer";
import { useSelector } from "react-redux";
import { IngredientType } from "../../../types/Ingredient.type";
import { Nullable } from "../../../types/common.type";
import { useEffect, useState } from "react";

type propTypes = {
  ingredient?: Nullable<IngredientType>;
};

const IngredientDetails = (props: propTypes) => {
  const { t } = useTranslation("ingredients");
  const { ingredient: propIngredient } = props;
  const observedIngredient = useSelector(selectObservedIngredient);
  const [ingredient, setIngredient] =
    useState<Nullable<IngredientType>>(observedIngredient);

  useEffect(() => {
    if (!propIngredient) {
      return;
    }
    setIngredient(propIngredient);
  }, [propIngredient]);

  return (
    <>
      {ingredient !== null && (
        <div className={styles.modal_ingredient}>
          <img src={ingredient.image_large} alt={ingredient.name} />
          <span className={styles.modal_ingredient_name}>
            {ingredient.name}
          </span>
          <ul className={styles.modal_ingredient_ul}>
            <li>
              <b>{t("calories")}</b>
              {ingredient.calories}
            </li>
            <li>
              <b>{t("proteins")}</b>
              {ingredient.proteins}
            </li>
            <li>
              <b>{t("fat")}</b>
              {ingredient.fat}
            </li>
            <li>
              <b>{t("carbohydrates")}</b>
              {ingredient.carbohydrates}
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default IngredientDetails;

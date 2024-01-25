import { IngredientType } from "../../../types/Ingredient.type";
import { useTranslation } from "react-i18next";
import styles from "./IngredientDetails.module.css";

const IngredientDetails = (props: IngredientType) => {
  const { t } = useTranslation("ingredients");
  const { name, proteins, carbohydrates, fat, image_large, calories } = props;
  return (
    <div className={styles.modal_ingredient}>
      <img src={image_large} alt={name} />
      <span className={styles.modal_ingredient_name}>{name}</span>
      <ul className={styles.modal_ingredient_ul}>
        <li>
          <b>{t("calories")}</b>
          {calories}
        </li>
        <li>
          <b>{t("proteins")}</b>
          {proteins}
        </li>
        <li>
          <b>{t("fat")}</b>
          {fat}
        </li>
        <li>
          <b>{t("carbohydrates")}</b>
          {carbohydrates}
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;

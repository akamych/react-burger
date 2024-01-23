import { IngredientType } from "../../../../types/Ingredient.type";
import H2 from "../../../headings/h2/H2";
import BurgerIngredientsItem from "../item/BurgerIngredientsItem";
import styles from "./BurgerIngredientsSection.module.css";

type propsType = {
  heading: string;
  ingredients: IngredientType[];
};

const BurgerIngredientsSection = (props: propsType) => {
  const { heading, ingredients } = props;

  return (
    <div className={styles.ingredients_section}>
      <H2>{heading}</H2>
      <ul className={styles.ingredients_section_ul}>
        {Array.isArray(ingredients) && ingredients.length
          ? ingredients.map((ingredient: IngredientType, index: number) => (
              <BurgerIngredientsItem key={index} ingredient={ingredient} />
            ))
          : null}
      </ul>
    </div>
  );
};

export default BurgerIngredientsSection;

import { IngredientType } from "../../../../types/Ingredient.type";
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
      <h2 className="text text_type_main-medium mt-10 mb-5">{heading}</h2>
      <ul className={styles.ingredients_section_ul}>
        {ingredients.length
          ? ingredients.map((ingredient: IngredientType, index: number) => (
              <BurgerIngredientsItem key={index} ingredient={ingredient} />
            ))
          : null}
      </ul>
    </div>
  );
};

export default BurgerIngredientsSection;

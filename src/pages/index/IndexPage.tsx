import styles from "./IndexPage.module.css";

import BurgerIngredients from "../../components/layout/ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/layout/constructor/BurgerConstructor";
import { IngredientType } from "../../types/Ingredient.type";
import { useOutletContext } from "react-router-dom";

const IndexPage = () => {
  return (
    <main className={styles.index_page_main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default IndexPage;

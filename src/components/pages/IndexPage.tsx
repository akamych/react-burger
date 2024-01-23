import styles from "./IndexPage.module.css";

import BurgerIngredients from "../layout/ingredients/BurgerIngredients";
import BurgerConstructor from "../layout/constructor/BurgerConstructor";

const IndexPage = () => {
  return (
    <main className={styles.index_page_main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default IndexPage;

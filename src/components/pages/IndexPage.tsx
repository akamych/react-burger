import styles from "./IndexPage.module.css";

import BurgerIngredients from "../layout/ingredients/BurgerIngredients";

const IndexPage = () => {
  return (
    <main className={styles.index_page_main}>
      <BurgerIngredients />
    </main>
  );
};

export default IndexPage;

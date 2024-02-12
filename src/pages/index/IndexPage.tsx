import styles from "./IndexPage.module.css";

import BurgerIngredients from "../../components/layout/ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/layout/constructor/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const IndexPage = () => {
  return (
    <main className={styles.index_page_main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};

export default IndexPage;

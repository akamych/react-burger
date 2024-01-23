import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerIngredients.module.css";
import H1 from "../../headings/h1/H1";
import Tabs, { TabsPropsType } from "../../tabs/Tabs";
import BurgerIngredientsSection from "./section/BurgerIngredientsSection";
import {
  IngredientType,
  Ingredient_tabs_keys,
} from "../../../types/Ingredient.type";
import { MOCK_DATA_INGREDIENTS } from "../../../constants/MockData";

export const INGREDIENTS_TABS: Record<Ingredient_tabs_keys, string> = {
  bun: "tabs.bun",
  sauce: "tabs.sauce",
  main: "tabs.main",
};

const BurgerIngredients = () => {
  const { t } = useTranslation("ingredients");
  const [activeTab, setActiveTab] = useState<Ingredient_tabs_keys>("bun");
  const [ingredients, setIngredients] = useState<IngredientType[]>(
    MOCK_DATA_INGREDIENTS
  );

  const tabs: TabsPropsType[] = [];
  Object.entries(INGREDIENTS_TABS).forEach(([key, value]) =>
    tabs.push({
      value: key,
      text: t(value),
    })
  );

  return (
    <div className={styles.ingredients_div}>
      <H1>{t("h1")}</H1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.ingredients_div_ul_holder}>
        {Object.keys(INGREDIENTS_TABS).map((key) => (
          <BurgerIngredientsSection
            key={key}
            heading={t(`h2.${key}`)}
            ingredients={ingredients.filter(
              (ingredient) => ingredient.type === key
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;

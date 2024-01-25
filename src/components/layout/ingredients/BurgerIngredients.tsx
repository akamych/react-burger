import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerIngredients.module.css";
import Tabs, { TabsPropsType } from "../../tabs/Tabs";
import BurgerIngredientsSection from "./section/BurgerIngredientsSection";
import {
  IngredientType,
  Ingredient_tabs_keys,
} from "../../../types/Ingredient.type";
import { useOutletContext } from "react-router-dom";
import { useIngredients } from "../../app/App";

export const INGREDIENTS_TABS: Record<Ingredient_tabs_keys, string> = {
  bun: "tabs.bun",
  sauce: "tabs.sauce",
  main: "tabs.main",
};

const BurgerIngredients = () => {
  const { ingredients } = useIngredients();
  const { t } = useTranslation("ingredients");
  const [activeTab, setActiveTab] = useState<Ingredient_tabs_keys>("bun");
  const ingredientsByType: Record<string, IngredientType[]> = useMemo(
    () =>
      ingredients !== null
        ? ingredients.reduce((acc, item) => {
            const type = item.type;

            if (!acc[type]) {
              acc[type] = [];
            }

            acc[type].push(item);

            return acc;
          }, {} as Record<string, IngredientType[]>)
        : {},
    [ingredients]
  );

  const tabs: TabsPropsType[] = Object.entries(INGREDIENTS_TABS).map(
    ([key, value]) => ({
      value: key,
      text: t(value),
    })
  );

  return (
    <div className={styles.ingredients_div}>
      <h1 className="text text_type_main-large mt-10 mb-5">{t("h1")}</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.ingredients_div_ul_holder}>
        {Object.keys(INGREDIENTS_TABS).map((key) => (
          <BurgerIngredientsSection
            key={key}
            heading={t(`h2.${key}`)}
            ingredients={ingredientsByType[key]}
          />
        ))}
      </div>
    </div>
  );
};

export default BurgerIngredients;

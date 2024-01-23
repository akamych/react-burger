import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerIngredients.module.css";
import H1 from "../../headings/h1/H1";
import Tabs, { TabsPropsType } from "../../tabs/Tabs";

export type Ingredient_tabs_keys = "bread" | "sauces" | "ingredients";

export const INGREDIENTS_TABS: Record<Ingredient_tabs_keys, string> = {
  bread: "tabs.bread",
  sauces: "tabs.sauces",
  ingredients: "tabs.ingredients",
};

const BurgerIngredients = () => {
  const { t } = useTranslation("ingredients");
  const [activeTab, setActiveTab] = useState<Ingredient_tabs_keys>("bread");

  const tabs: TabsPropsType[] = [];
  Object.entries(INGREDIENTS_TABS).forEach(([key, value]) =>
    tabs.push({
      value: key,
      text: t(value),
    })
  );

  return (
    <section>
      <H1>{t("h1")}</H1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  );
};

export default BurgerIngredients;

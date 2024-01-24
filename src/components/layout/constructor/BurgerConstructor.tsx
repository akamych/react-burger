import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerConstructor.module.css";
import { IngredientType } from "../../../types/Ingredient.type";
import { MOCK_DATA_INGREDIENTS } from "../../../constants/MockData";
import BurgerConstructorItem from "./item/BurgerConstructorItem";

const ELEMENT_TYPES = {
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

const BurgerConstructor = () => {
  const { t } = useTranslation("ingredients");
  const [ingredients] = useState<IngredientType[]>(MOCK_DATA_INGREDIENTS);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    ingredients.length
      ? setTotalPrice(ingredients.reduce((a, { price }) => a + price, 0))
      : setTotalPrice(0);
  }, [ingredients]);

  const ingredientsByOrder: Record<string, IngredientType[]> = useMemo(
    () =>
      ingredients.reduce((acc, item) => {
        const { type } = item;
        let order: string = ELEMENT_TYPES.MIDDLE;

        if (type === "bun") {
          order = !acc[ELEMENT_TYPES.TOP]
            ? ELEMENT_TYPES.TOP
            : ELEMENT_TYPES.BOTTOM;
        }

        if (!acc[order]) {
          acc[order] = [];
        }

        acc[order].push(item);

        return acc;
      }, {} as Record<string, IngredientType[]>),
    [ingredients]
  );

  return (
    <div className={styles.constructor_div}>
      <ul>
        {ingredientsByOrder[ELEMENT_TYPES.TOP] &&
        ingredientsByOrder[ELEMENT_TYPES.TOP].length
          ? ingredientsByOrder[ELEMENT_TYPES.TOP].map((ingredient, index) => (
              <BurgerConstructorItem
                key={index}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={true}
                type="top"
              />
            ))
          : null}
        <ul className={styles.constructor_ul_middle}>
          {ingredientsByOrder[ELEMENT_TYPES.MIDDLE] &&
          ingredientsByOrder[ELEMENT_TYPES.MIDDLE].length
            ? ingredientsByOrder[ELEMENT_TYPES.MIDDLE].map(
                (ingredient, index) => (
                  <BurgerConstructorItem
                    key={index}
                    text={ingredient.name}
                    thumbnail={ingredient.image}
                    price={ingredient.price}
                    isLocked={false}
                  />
                )
              )
            : null}
        </ul>
        {ingredientsByOrder[ELEMENT_TYPES.BOTTOM] &&
        ingredientsByOrder[ELEMENT_TYPES.BOTTOM].length
          ? ingredientsByOrder[ELEMENT_TYPES.BOTTOM].map(
              (ingredient, index) => (
                <BurgerConstructorItem
                  key={index}
                  text={ingredient.name}
                  thumbnail={ingredient.image}
                  price={ingredient.price}
                  isLocked={true}
                  type="bottom"
                />
              )
            )
          : null}
      </ul>
      <span className={styles.constructor_total_price}>
        <b className={styles.constructor_total_price_b}>{totalPrice}</b>
        <CurrencyIcon type="primary" />
        <Button htmlType="button" type="primary" size="large">
          {t("buttons.order")}
        </Button>
      </span>
    </div>
  );
};

export default BurgerConstructor;

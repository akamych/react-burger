import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerConstructor.module.css";
import { IngredientType } from "../../../types/Ingredient.type";
import { MOCK_DATA_INGREDIENTS } from "../../../constants/MockData";
import BurgerConstructorItem from "./item/BurgerConstructorItem";

const BurgerConstructor = () => {
  const { t } = useTranslation("ingredients");
  const [ingredients] = useState<IngredientType[]>(MOCK_DATA_INGREDIENTS);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    ingredients.length
      ? setTotalPrice(ingredients.reduce((a, { price }) => a + price, 0))
      : setTotalPrice(0);
  }, [ingredients]);
  console.log(ingredients);
  return (
    <div className={styles.constructor_div}>
      <ul className={styles.constructor_ul}>
        {ingredients.length
          ? ingredients.map((ingredient, index) => (
              <BurgerConstructorItem
                key={index}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                isLocked={ingredient.type === "bun"}
              />
            ))
          : null}
      </ul>
      <span className={styles.constructor_total_price}>
        <b className={styles.constructor_total_price_b}>{totalPrice}</b>
        <CurrencyIcon type="primary" />
      </span>

      <Button htmlType="button" type="primary" size="large">
        {t("buttons.order")}
      </Button>
    </div>
  );
};

export default BurgerConstructor;

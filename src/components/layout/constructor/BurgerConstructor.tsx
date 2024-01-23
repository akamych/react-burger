import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerConstructor.module.css";
import { IngredientType } from "../../../types/Ingredient.type";
import { MOCK_DATA_INGREDIENTS } from "../../../constants/MockData";

const BurgerConstructor = () => {
  const { t } = useTranslation("ingredients");
  const [ingredients, setIngredients] = useState<IngredientType[]>(
    MOCK_DATA_INGREDIENTS
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    Array.isArray(ingredients) && ingredients.length
      ? setTotalPrice(ingredients.reduce((a, { price }) => a + price, 0))
      : setTotalPrice(0);
  }, [ingredients]);

  return (
    <div className={styles.constructor_div}>
      <ul className={styles.constructor_ul}>
        {Array.isArray(ingredients) && ingredients.length
          ? ingredients.map((ingredient, index) => (
              <ConstructorElement
                key={index}
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
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

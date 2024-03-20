import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import styles from "./OrdersListItem.module.css";
import { TSocketMessageOrder } from "../../../../types/webSocket.type";
import { useAppSelector } from "../../../../services/Store";
import { selectFetchedIngredients } from "../../../../services/reducers/IngredientsReducer";
import { IngredientType } from "../../../../types/Ingredient.type";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatOrderDate } from "../../../../utils/DateUtils";

type propType = {
  order: TSocketMessageOrder;
};

const OrdersListItem = (props: propType) => {
  const { t } = useTranslation("feed");
  const [ingredientsList, setIngredientsList] = useState<IngredientType[]>([]);
  const [price, setPrice] = useState<number>(0);
  const allIngredients = useAppSelector(selectFetchedIngredients);
  const { order } = props;
  const { ingredients, _id, name, status, number, createdAt, updatedAt } =
    order;

  useEffect(() => {
    let newPrice = 0;
    const list: IngredientType[] = [];
    ingredients.forEach((ingredient) => {
      const add = allIngredients.find(
        (IsRightIngredient) => IsRightIngredient._id === ingredient
      );
      if (!add) {
        return;
      }
      list.push(add);
      newPrice += add.price;
    });
    setIngredientsList(list);
    setPrice(newPrice);
  }, [ingredients]);

  return (
    <div className={styles.order}>
      <p className="text text_type_digits-default">#0{number}</p>
      <p
        className={`text text_type_main-small text_color_inactive ${styles.order_ingredients_date}`}
      >
        {formatOrderDate(updatedAt)}
      </p>
      <b className={`text text_type_main-medium ${styles.order_ingredients_b}`}>
        {name}
      </b>
      <div className={styles.order_ingredients}>
        {ingredientsList.length > 0 &&
          ingredientsList.map((ingredient, index) => {
            if (index > 5) {
              return;
            } else if (index === 5) {
              return (
                <span
                  key={`${ingredient._id}-${index}`}
                  className={styles.order_ingredients_more}
                >
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                  <span>+{ingredientsList.length - index + 1}</span>
                </span>
              );
            } else {
              return (
                <img
                  key={`${ingredient._id}-${index}`}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
              );
            }
          })}
      </div>
      <div
        className={`text text_type_digits-default ${styles.order_ingredients_price}`}
      >
        {price}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrdersListItem;

import { useTranslation } from "react-i18next";
import styles from "./OrderData.module.css";
import { selectObservedOrder } from "../../../services/reducers/OrderReducer";
import { useAppSelector } from "../../../services/Store";
import { formatOrderDate } from "../../../utils/DateUtils";
import { useEffect, useState } from "react";
import { IngredientType } from "../../../types/Ingredient.type";
import { selectFetchedIngredients } from "../../../services/reducers/IngredientsReducer";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDataIngredient from "./ingredient/OrderDataIngredient";

export type TOrderIngredient = {
  ingredient: IngredientType;
  quantity: number;
};

type TOrderIngredients = Record<string, TOrderIngredient>;

const OrderData = () => {
  const { t } = useTranslation("orders");
  const order = useAppSelector(selectObservedOrder);
  const allIngredients = useAppSelector(selectFetchedIngredients);
  const [ingredientsList, setIngredientsList] = useState<TOrderIngredients>({});
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    if (order === null) {
      return;
    }

    let newPrice = 0;
    const list: TOrderIngredients = {};

    order.ingredients.forEach((nextOrder) => {
      const add = allIngredients.find(
        (IsRightIngredient) => IsRightIngredient._id === nextOrder
      );
      if (!add) {
        return;
      }

      const current = list[add._id];
      if (!current) {
        list[add._id] = {
          ingredient: add,
          quantity: 1,
        };
      } else {
        list[add._id] = {
          ingredient: add,
          quantity: current.quantity + 1,
        };
      }
      newPrice += add.price;
    });
    setIngredientsList(list);
    setPrice(newPrice);
  }, [order, allIngredients]);

  return (
    <>
      {order !== null && (
        <div className={styles.modal_orderdata}>
          <h2 className="text text_type_main-medium mt-4 mb-3">{order.name}</h2>
          <b
            className={`${styles.modal_orderdata_status} text text_type_main-default mb-10`}
          >
            {t(`statuses.${order.status}`)}
          </b>
          <h3 className="text text_type_main-medium mb-3">
            {t("ingredients")}
          </h3>
          <div className={`mb-10 ${styles.modal_orderdata_ingredients}`}>
            {Object.values(ingredientsList).map((ingredient) => (
              <OrderDataIngredient ingredient={ingredient} />
            ))}
          </div>
          <div className={styles.modal_orderdata_bottom}>
            <b className={`text text_type_main-default text_color_inactive`}>
              {formatOrderDate(order.updatedAt)}
            </b>
            <div
              className={`text text_type_digits-default ${styles.order_ingredients_price}`}
            >
              {price}
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderData;

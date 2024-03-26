import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import styles from "./OrdersListItem.module.css";
import { TSocketMessageOrder } from "../../../../types/webSocket.type";
import { useAppDispatch, useAppSelector } from "../../../../services/Store";
import { selectFetchedIngredients } from "../../../../services/reducers/IngredientsReducer";
import { IngredientType } from "../../../../types/Ingredient.type";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatOrderDate } from "../../../../utils/DateUtils";
import { Link, useLocation } from "react-router-dom";
import { PAGES_URL } from "../../../../constants/RoutesUrls";
import { ORDER_SHOW_DETAILS } from "../../../../services/actions/OrderActions";
import { SHOW_MODAL_ORDER_DATA } from "../../../../services/actions/ModalActions";
import { selectIsMyOrder } from "../../../../services/reducers/WebSocketReducer";

type propType = {
  order: TSocketMessageOrder;
};

const OrdersListItem = (props: propType) => {
  const { t } = useTranslation("orders");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isMy = useAppSelector(selectIsMyOrder);
  const [ingredientsList, setIngredientsList] = useState<IngredientType[]>([]);
  const [price, setPrice] = useState<number>(0);
  const allIngredients = useAppSelector(selectFetchedIngredients);
  const { order } = props;
  const { ingredients, status, name, number, updatedAt } = order;

  const handleClick = () => {
    dispatch(ORDER_SHOW_DETAILS(order));
    dispatch(SHOW_MODAL_ORDER_DATA());
  };

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

  const statusClass = useMemo(() => {
    if (!status) {
      return;
    }
    switch (status.toLowerCase()) {
      case "created":
      case "pending":
        return styles.order_ingredients_status_pending;
      default:
        return;
    }
  }, [status]);

  return (
    <Link
      to={`${isMy ? PAGES_URL.PROFILE_ORDERS : PAGES_URL.FEED}/${order.number}`}
      key={order._id}
      state={{ bgLocation: location }}
      style={{ textDecoration: "none", color: "white" }}
      onClick={handleClick}
    >
      <div className={styles.order}>
        <p className="text text_type_digits-default">#0{number}</p>
        <p
          className={`text text_type_main-small text_color_inactive ${styles.order_ingredients_date}`}
        >
          {formatOrderDate(updatedAt)}
        </p>
        <b
          className={`text text_type_main-medium ${styles.order_ingredients_b}`}
        >
          {name}
        </b>
        {isMy && (
          <b
            className={`text text_type_main-default ${styles.order_ingredients_status} ${statusClass}`}
          >
            {t(`statuses.${status}`)}
          </b>
        )}
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
    </Link>
  );
};

export default OrdersListItem;

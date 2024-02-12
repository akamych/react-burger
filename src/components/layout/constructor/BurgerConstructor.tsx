import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerConstructor.module.css";
import { IngredientType } from "../../../types/Ingredient.type";
import BurgerConstructorItem from "./item/BurgerConstructorItem";
import {
  selectSelectedBun,
  selectSelectedIngredients,
} from "../../../services/reducers/IngredientsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { AppDispatch } from "../../../services/Store";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
} from "../../../services/actions/IngredientsActions";
import { Nullable } from "../../../types/common.type";
import { createOrderAction } from "../../../services/actions/OrderActions";
import { SHOW_MODAL_ORDER } from "../../../services/actions/ModalActions";

const BurgerConstructor = () => {
  const bun = useSelector(selectSelectedBun);
  const ingredients = useSelector(selectSelectedIngredients);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("ingredients");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(droppedIngredient: IngredientType) {
      switch (droppedIngredient.type.toLowerCase()) {
        case "bun":
          if (bun === null || droppedIngredient._id !== bun._id) {
            dispatch(CONSTRUCTOR_ADD_BUN(droppedIngredient));
          }
          break;
        default:
          dispatch(CONSTRUCTOR_ADD_INGREDIENT(droppedIngredient));
          break;
      }
    },
  });

  const calculateTotal = useMemo<number>((): number => {
    let ingredientsPrice: number = ingredients.length
      ? ingredients.reduce(
          (a: number, ingredient: IngredientType) => a + ingredient.price,
          0
        )
      : 0;

    if (bun !== null) {
      ingredientsPrice += bun.price * 2;
    }
    return ingredientsPrice;
  }, [ingredients, bun]);

  useEffect(() => {
    setTotalPrice(calculateTotal);
  }, [ingredients, bun]);

  const handleSubmit = () => {
    const ids: string[] = [];

    const bunId: Nullable<string> = bun !== null ? bun._id : null;

    if (bunId !== null) {
      ids.push(bunId);
    }

    ingredients.forEach((ingredient: IngredientType) => {
      ids.push(ingredient._id);
    });

    if (bunId !== null) {
      ids.push(bunId);
    }

    dispatch(createOrderAction(ids));
    dispatch(SHOW_MODAL_ORDER());
  };

  return (
    <>
      <div className={styles.constructor_div} ref={dropRef}>
        <ul>
          {bun !== null && (
            <BurgerConstructorItem
              text={`${bun.name} ${t("bunTop")}`}
              ingredient={bun}
              isLocked={true}
              type="top"
            />
          )}
          <ul className={styles.constructor_ul_middle}>
            {ingredients && ingredients.length
              ? ingredients.map((ingredient: IngredientType, index: number) => (
                  <BurgerConstructorItem
                    key={`${ingredient._id}-${index}`}
                    index={index}
                    ingredient={ingredient}
                    isLocked={false}
                  />
                ))
              : null}
          </ul>
          {bun !== null && (
            <BurgerConstructorItem
              text={`${bun.name} ${t("bunBottom")}`}
              ingredient={bun}
              isLocked={true}
              type="bottom"
            />
          )}
        </ul>
        <span className={styles.constructor_total_price}>
          <b className={styles.constructor_total_price_b}>{totalPrice}</b>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleSubmit}
          >
            {t("buttons.order")}
          </Button>
        </span>
      </div>
    </>
  );
};

export default BurgerConstructor;

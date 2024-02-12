import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styles from "./BurgerConstructor.module.css";
import { IngredientType } from "../../../types/Ingredient.type";
import BurgerConstructorItem from "./item/BurgerConstructorItem";
import useModal from "../../../hooks/useModal";
import OrderDetails from "../../modal/order/OrderDetails";
import Modal from "../../modal/Modal";
import {
  selectSelectedBun,
  selectSelectedIngredients,
} from "../../../services/reducers/IngredientsReducer";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import store, { AppDispatch } from "../../../services/Store";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_INGREDIENT,
} from "../../../services/actions/IngredientsActions";

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
          (a: number, { price }: { price: number }) => a + price,
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

  const { bunTop, mainIngredients, bunBottom } = useMemo(() => {
    const bunTop = ingredients.find(
      (item: IngredientType) => item.type === "bun"
    );

    return {
      bunTop: bunTop,
      mainIngredients: ingredients.filter(
        (item: IngredientType) => item.type !== "bun"
      ),
      bunBottom: ingredients.find(
        (item: IngredientType) => item.type === "bun" && item !== bunTop
      ),
    };
  }, [ingredients]);

  return (
    <>
      <div className={styles.constructor_div} ref={dropRef}>
        <ul>
          {bun !== null && (
            <BurgerConstructorItem
              text={`${bun.name} ${t("bunTop")}`}
              thumbnail={bun.image}
              price={bun.price}
              isLocked={true}
              type="top"
            />
          )}
          <ul className={styles.constructor_ul_middle}>
            {mainIngredients && mainIngredients.length
              ? mainIngredients.map(
                  (ingredient: IngredientType, index: number) => (
                    <BurgerConstructorItem
                      key={index}
                      index={index}
                      text={ingredient.name}
                      thumbnail={ingredient.image}
                      price={ingredient.price}
                      isLocked={false}
                    />
                  )
                )
              : null}
          </ul>
          {bun !== null && (
            <BurgerConstructorItem
              text={`${bun.name} ${t("bunBottom")}`}
              thumbnail={bun.image}
              price={bun.price}
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
            // onClick={showModal}
          >
            {t("buttons.order")}
          </Button>
        </span>
      </div>

      {/* {isModalActive && (
        <Modal onClose={closeModal}>
          <OrderDetails _id="034536" status="cooking" />
        </Modal>
      )} */}
    </>
  );
};

export default BurgerConstructor;

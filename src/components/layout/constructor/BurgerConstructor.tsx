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
import { selectSelectedIngredients } from "../../../services/reducers/IngredientsReducer";
import { useSelector } from "react-redux";

const ELEMENT_TYPES = {
  TOP: "top",
  MIDDLE: "middle",
  BOTTOM: "bottom",
};

const BurgerConstructor = () => {
  const ingredients = useSelector(selectSelectedIngredients);
  const { t } = useTranslation("ingredients");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { isModalActive, showModal, closeModal } = useModal();

  const calculateTotal = useMemo<number>((): number => {
    return ingredients.length
      ? ingredients.reduce(
          (a: number, { price }: { price: number }) => a + price,
          0
        )
      : 0;
  }, [ingredients]);

  useEffect(() => {
    setTotalPrice(calculateTotal);
  }, [ingredients]);

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
      <div className={styles.constructor_div}>
        <ul>
          {bunTop && (
            <BurgerConstructorItem
              text={`${bunTop.name} ${t("bunTop")}`}
              thumbnail={bunTop.image}
              price={bunTop.price}
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
                      text={ingredient.name}
                      thumbnail={ingredient.image}
                      price={ingredient.price}
                      isLocked={false}
                    />
                  )
                )
              : null}
          </ul>
          {bunBottom && (
            <BurgerConstructorItem
              text={`${bunBottom.name} ${t("bunBottom")}`}
              thumbnail={bunBottom.image}
              price={bunBottom.price}
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
            onClick={showModal}
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

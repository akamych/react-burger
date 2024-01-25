import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IngredientType } from "../../../../types/Ingredient.type";
import styles from "./BurgerIngredientsItem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import useModal from "../../../../hooks/useModal";
import Modal from "../../../modal/Modal";
import IngredientDetails from "../../../modal/ingredients/IngredientDetails";

type propsType = {
  ingredient: IngredientType;
};

const BurgerIngredientsItem = (props: propsType) => {
  const { t } = useTranslation("ingredients");
  const { isModalActive, showModal, closeModal } = useModal();
  const { ingredient } = props;
  const { name, price, image } = ingredient;
  return (
    <>
      <li className={styles.ingredients_section_ul_li} onClick={showModal}>
        <Counter
          count={Math.floor(Math.random() * 10)}
          size="default"
          extraClass="m-1"
        />
        <img
          src={image}
          alt={name}
          className={styles.ingredients_section_ul_li_img}
        />
        <i className={styles.ingredients_section_ul_li_i}>
          {price}
          <CurrencyIcon type="primary" />
        </i>
        <b className={styles.ingredients_section_ul_li_b}>{name}</b>
      </li>
      {isModalActive && (
        <Modal onClose={closeModal} header={t("h3.details")}>
          <IngredientDetails {...ingredient} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredientsItem;

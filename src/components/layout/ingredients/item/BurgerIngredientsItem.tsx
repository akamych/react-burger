import { useDispatch } from "react-redux";
import { IngredientType } from "../../../../types/Ingredient.type";
import styles from "./BurgerIngredientsItem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppDispatch } from "../../../../services/Store";
import { SyntheticEvent } from "react";
import { SHOW_MODAL_INGREDIENT } from "../../../../services/actions/ModalActions";
import { INGREDIENT_SHOW_DETAILS } from "../../../../services/actions/IngredientsActions";

type propsType = {
  ingredient: IngredientType;
};

const BurgerIngredientsItem = (props: propsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredient } = props;
  const { name, price, image } = ingredient;

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(INGREDIENT_SHOW_DETAILS(ingredient));
    dispatch(SHOW_MODAL_INGREDIENT());
  };

  return (
    <>
      <li className={styles.ingredients_section_ul_li} onClick={handleClick}>
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
    </>
  );
};

export default BurgerIngredientsItem;

import { IngredientType } from "../../../../types/Ingredient.type";
import styles from "./BurgerIngredientsItem.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../../services/Store";
import { SHOW_MODAL_INGREDIENT } from "../../../../services/actions/ModalActions";
import { INGREDIENT_SHOW_DETAILS } from "../../../../services/actions/IngredientsActions";
import { useDrag } from "react-dnd";
import { selectIngredientCount } from "../../../../services/reducers/IngredientsReducer";
import { Link, useLocation } from "react-router-dom";
import { PAGES_URL } from "../../../../constants/RoutesUrls";

type propsType = {
  ingredient: IngredientType;
};

const BurgerIngredientsItem = (props: propsType) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { ingredient } = props;
  const { _id, name, price, image } = ingredient;
  const count = useAppSelector(selectIngredientCount(_id));

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  const handleClick = () => {
    dispatch(INGREDIENT_SHOW_DETAILS(ingredient));
    dispatch(SHOW_MODAL_INGREDIENT());
  };

  return (
    <Link
      to={`${PAGES_URL.INGREDIENTS}/${_id}`}
      state={{ bgLocation: location }}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <li className={styles.ingredients_section_ul_li} ref={dragRef} draggable>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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
    </Link>
  );
};

export default BurgerIngredientsItem;

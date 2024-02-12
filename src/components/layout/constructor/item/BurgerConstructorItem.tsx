import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../services/Store";
import {
  CONSTRUCTOR_REMOVE_INGREDIENT,
  CONSTRUCTOR_SWAP_INGREDIENT,
} from "../../../../services/actions/IngredientsActions";
import { useDrag, useDrop } from "react-dnd";
import { IngredientType } from "../../../../types/Ingredient.type";
import { Undef } from "../../../../types/common.type";

type propsType = {
  index?: number;
  ingredient: IngredientType;
  text?: string;
  isLocked: boolean;
  type?: "top" | "bottom";
};

const BurgerConstructorItem = (props: propsType) => {
  const { index, ingredient, isLocked, type, text } = props;
  const { name, image, price } = ingredient;
  const dispatch = useDispatch<AppDispatch>();

  const [, dragRef] = useDrag({
    type: "constructorElement",
    item: { ingredient, index },
  });

  const [, dropRef] = useDrop({
    accept: "constructorElement",
    drop(droppedIngredient: {
      ingredient: IngredientType;
      index: Undef<number>;
    }) {
      if (index !== undefined && droppedIngredient.index !== undefined) {
        dispatch(
          CONSTRUCTOR_SWAP_INGREDIENT({
            first: {
              index: index,
              ingredient: ingredient,
            },
            second: {
              index: droppedIngredient.index,
              ingredient: droppedIngredient.ingredient,
            },
          })
        );
      }
    },
  });

  const handleDelete = () => {
    if (index !== undefined) {
      dispatch(CONSTRUCTOR_REMOVE_INGREDIENT(index));
    }
  };

  return (
    <li className={styles.constructor_ul_li} ref={dropRef}>
      <span className={styles.constructor_ul_li_dragger} ref={dragRef}>
        {!isLocked && <DragIcon type="primary" />}
      </span>
      <ConstructorElement
        text={text ? text : name}
        thumbnail={image}
        price={price}
        isLocked={isLocked}
        type={type}
        handleClose={handleDelete}
      />
    </li>
  );
};

export default BurgerConstructorItem;

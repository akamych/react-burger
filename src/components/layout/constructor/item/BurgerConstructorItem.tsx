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
import {
  IngredientType,
  IngredientTypeWithUuid,
} from "../../../../types/Ingredient.type";
import { Undef } from "../../../../types/common.type";
import { useMemo } from "react";

type propsType = {
  index?: number;
  ingredient: IngredientType | IngredientTypeWithUuid;
  text?: string;
  isLocked: boolean;
  type?: "top" | "bottom";
};

const BurgerConstructorItem = (props: propsType) => {
  const { index, ingredient, isLocked, type, text } = props;
  const { name, image, price } = ingredient;
  const dispatch = useDispatch<AppDispatch>();

  const [{ yDiff, isDragging }, dragRef] = useDrag({
    type: "constructorElement",
    item: { ingredient, index },
    collect: (monitor) => ({
      yDiff: monitor.getDifferenceFromInitialOffset()?.y,
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isHover, dragIndex }, dropRef] = useDrop({
    accept: isLocked ? "nonDroppable" : "constructorElement",
    drop(droppedIngredient: {
      ingredient: IngredientTypeWithUuid;
      index: Undef<number>;
    }) {
      if (index !== undefined && droppedIngredient.index !== undefined) {
        dispatch(
          CONSTRUCTOR_SWAP_INGREDIENT({
            from: {
              index: droppedIngredient.index,
              ingredient: droppedIngredient.ingredient,
            },
            to: { index },
          })
        );
      }
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
      dragIndex: monitor.getItem()?.index,
    }),
  });

  const handleDelete = () => {
    if (index !== undefined) {
      dispatch(CONSTRUCTOR_REMOVE_INGREDIENT(index));
    }
  };

  const liClassName = useMemo(
    () =>
      isHover &&
      !isDragging &&
      dragIndex !== undefined &&
      index !== undefined &&
      dragIndex > index
        ? styles.constructor_ul_li_hovered_asc
        : isHover && !isDragging
        ? styles.constructor_ul_li_hovered_desc
        : isDragging
        ? styles.constructor_ul_li_dragging
        : styles.constructor_ul_li,
    [isHover, isDragging, dragIndex, index]
  );

  return (
    <>
      <li
        className={liClassName}
        ref={dropRef}
        style={
          yDiff && isDragging
            ? {
                transform: `translateY(
        ${yDiff}px`,
              }
            : {}
        }
      >
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
    </>
  );
};

export default BurgerConstructorItem;

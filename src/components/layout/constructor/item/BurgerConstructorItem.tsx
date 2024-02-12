import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorItem.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../services/Store";
import { CONSTRUCTOR_REMOVE_INGREDIENT } from "../../../../services/actions/IngredientsActions";

type propsType = {
  index?: number;
  text: string;
  thumbnail: string;
  price: number;
  isLocked: boolean;
  type?: "top" | "bottom";
};

const BurgerConstructorItem = (props: propsType) => {
  const { index, text, thumbnail, price, isLocked, type } = props;
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    if (index !== undefined) {
      dispatch(CONSTRUCTOR_REMOVE_INGREDIENT(index));
    }
  };

  return (
    <li className={styles.constructor_ul_li}>
      <span className={styles.constructor_ul_li_dragger}>
        {!isLocked && <DragIcon type="primary" />}
      </span>
      <ConstructorElement
        text={text}
        thumbnail={thumbnail}
        price={price}
        isLocked={isLocked}
        type={type}
        handleClose={handleDelete}
      />
    </li>
  );
};

export default BurgerConstructorItem;

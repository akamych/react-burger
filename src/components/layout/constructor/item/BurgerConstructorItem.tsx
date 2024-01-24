import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerConstructorItem.module.css";

type propsType = {
  text: string;
  thumbnail: string;
  price: number;
  isLocked: boolean;
  type?: "top" | "bottom";
};

const BurgerConstructorItem = (props: propsType) => {
  const { text, thumbnail, price, isLocked, type } = props;

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
      />
    </li>
  );
};

export default BurgerConstructorItem;

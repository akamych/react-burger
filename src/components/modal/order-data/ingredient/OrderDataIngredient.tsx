import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrderIngredient } from "../OrderData";
import styles from "./OrderDataIngredient.module.css";

type propType = {
  ingredient: TOrderIngredient;
};

const OrderDataIngredient = (props: propType) => {
  const { ingredient: ingredientData } = props;
  const { ingredient, quantity } = ingredientData;

  return (
    <div className={styles.order_ingredient_line}>
      <img src={ingredient.image_mobile} />
      <b className="text text_type_main-default">{ingredient.name}</b>
      <span className="text text_type_digits-default">
        {quantity} x {ingredient.price} <CurrencyIcon type="primary" />
      </span>
    </div>
  );
};

export default OrderDataIngredient;

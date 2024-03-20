import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/Store";
import { selectFetchedIngredients } from "../../services/reducers/IngredientsReducer";
import { IngredientType } from "../../types/Ingredient.type";
import { Nullable } from "../../types/common.type";
import IngredientDetails from "../../components/modal/ingredients/IngredientDetails";
import { useTranslation } from "react-i18next";
import styles from "./OrderPage.module.css";
import { selectFeedOrders } from "../../services/reducers/WebSocketReducer";

const OrderPage = () => {
  let { orderId } = useParams();
  const { t } = useTranslation("ingredients");
  const ingredients = useAppSelector(selectFetchedIngredients);
  const orders = useAppSelector(selectFeedOrders);
  const [order, setOrder] = useState<Nullable<IngredientType>>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const found =
      ingredients.find((ingredient) => ingredient._id === orderId) || null;
    setOrder(found);
  }, [ingredients, orders, orderId, dispatch]);

  return (
    <main className={styles.main}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        {t("h3.details")}
      </h1>
      {order !== null && <IngredientDetails ingredient={order} />}
    </main>
  );
};

export default OrderPage;

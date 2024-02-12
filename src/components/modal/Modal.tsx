import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ModalOverlay from "./overlay/ModalOverlay";
import ModalHeader from "./header/ModalHeader";
import { AppDispatch } from "../../services/Store";
import {
  selectModalIsShown,
  selectModalType,
} from "../../services/reducers/ModalReducer";
import { useTranslation } from "react-i18next";
import IngredientDetails from "./ingredients/IngredientDetails";
import { HIDE_MODAL } from "../../services/actions/ModalActions";
import { INGREDIENT_HIDE_DETAILS } from "../../services/actions/IngredientsActions";
import { ORDER_CLEAR } from "../../services/actions/OrderActions";
import OrderDetails from "./order/OrderDetails";

const modalRoot = document.getElementById("modals");

const Modal = () => {
  const { t: ingredientT } = useTranslation("ingredients");
  const dispatch = useDispatch<AppDispatch>();
  const isShown = useSelector(selectModalIsShown);
  const type = useSelector(selectModalType);

  const handleClose = useCallback((): void => {
    dispatch(HIDE_MODAL());
    dispatch(INGREDIENT_HIDE_DETAILS());
    dispatch(ORDER_CLEAR());
  }, [dispatch]);

  useEffect(() => {
    const handleEscapePress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscapePress);
    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [handleClose]);

  const header: string = useMemo(
    () => (type === "ingredient" ? ingredientT("h3.details") : ""),
    [type, ingredientT]
  );

  return (
    modalRoot &&
    ReactDOM.createPortal(
      isShown === true && (
        <>
          <div className={styles.modal}>
            <ModalHeader onClose={handleClose} header={header} />
            {type === "ingredient" ? <IngredientDetails /> : <OrderDetails />}
          </div>
          <ModalOverlay onClose={handleClose} />
        </>
      ),
      modalRoot
    )
  );
};

export default Modal;

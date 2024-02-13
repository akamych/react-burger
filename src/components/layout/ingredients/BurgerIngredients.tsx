import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styles from "./BurgerIngredients.module.css";
import Tabs, { TabsPropsType } from "../../tabs/Tabs";
import BurgerIngredientsSection from "./section/BurgerIngredientsSection";
import {
  IngredientType,
  Ingredient_tabs_keys,
} from "../../../types/Ingredient.type";
import { selectFetchedIngredients } from "../../../services/reducers/IngredientsReducer";
import {
  selectModalIsShown,
  selectModalType,
} from "../../../services/reducers/ModalReducer";
import Modal from "../../modal/Modal";
import IngredientDetails from "../../modal/ingredients/IngredientDetails";
import { HIDE_MODAL } from "../../../services/actions/ModalActions";
import { INGREDIENT_HIDE_DETAILS } from "../../../services/actions/IngredientsActions";
import { AppDispatch } from "../../../services/Store";

export const INGREDIENTS_TABS: Record<Ingredient_tabs_keys, string> = {
  bun: "tabs.bun",
  sauce: "tabs.sauce",
  main: "tabs.main",
};

const TABS_ORDER: Ingredient_tabs_keys[] = ["bun", "sauce", "main"];

const BurgerIngredients = () => {
  const ingredients = useSelector(selectFetchedIngredients);
  const modalIsShown = useSelector(selectModalIsShown);
  const modalType = useSelector(selectModalType);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation("ingredients");
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Ingredient_tabs_keys>("bun");
  const ingredientsByType: Record<string, IngredientType[]> = useMemo(
    () =>
      ingredients.reduce(
        (acc: Record<string, IngredientType[]>, item: IngredientType) => {
          const type: string = item.type;

          if (!acc[type]) {
            acc[type] = [];
          }

          acc[type].push(item);

          return acc;
        },
        {} as Record<string, IngredientType[]>
      ),
    [ingredients]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current === null) {
        return;
      }

      const holderTop = scrollableRef.current.getBoundingClientRect().top;
      const sections = scrollableRef.current.querySelectorAll(
        ".ingredientsSection"
      );

      let newActiveTab: Ingredient_tabs_keys = "bun";

      for (let i = 1; i < sections.length; i++) {
        const top = sections[i].getBoundingClientRect().top - holderTop;
        if (top < 0) {
          newActiveTab = TABS_ORDER[i];
        }
      }

      setActiveTab(newActiveTab);
    };

    if (scrollableRef.current !== null) {
      scrollableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableRef.current === null) {
        return;
      }
      scrollableRef.current.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef.current]);

  const closeModal = useCallback((): void => {
    dispatch(HIDE_MODAL());
    dispatch(INGREDIENT_HIDE_DETAILS());
  }, [dispatch]);

  const tabs: TabsPropsType[] = Object.entries(INGREDIENTS_TABS).map(
    ([key, value]) => ({
      value: key,
      text: t(value),
    })
  );

  return (
    <div className={styles.ingredients_div}>
      <h1 className="text text_type_main-large mt-10 mb-5">{t("h1")}</h1>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.ingredients_div_ul_holder} ref={scrollableRef}>
        {Object.keys(INGREDIENTS_TABS).map((key) => (
          <BurgerIngredientsSection
            key={key}
            heading={t(`h2.${key}`)}
            ingredients={ingredientsByType[key]}
          />
        ))}
      </div>
      {modalIsShown && modalType === "ingredient" && (
        <Modal onClose={closeModal} header={t("h3.details")}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerIngredients;

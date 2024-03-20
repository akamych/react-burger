import { useEffect } from "react";
import AppHeader from "../layout/header/Header";
import { useAppDispatch, useAppSelector } from "../../services/Store";
import { fetchIngredientsAction } from "../../services/actions/IngredientsActions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";
import IndexPage from "../../pages/index/IndexPage";
import SignUpPage from "../../pages/register/SignUpPage";
import LoginPage from "../../pages/login/LoginPage";
import ForgotPasswordPage from "../../pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "../../pages/reset-password/ResetPasswordPage";
import ProtectedRoute, {
  ACCESS_TYPES,
} from "../layout/protected/ProtectedRoute";
import { authAction } from "../../services/actions/AuthActions";
import ProfilePage from "../../pages/profile/ProfilePage";
import OrdersHistory from "../layout/orders-history/OrdersHistory";
import ProfileData from "../layout/profile-data/ProfileData";
import Modal from "../modal/Modal";
import IngredientDetails from "../modal/ingredients/IngredientDetails";
import { INGREDIENT_HIDE_DETAILS } from "../../services/actions/IngredientsActions";
import { HIDE_MODAL } from "../../services/actions/ModalActions";
import { useTranslation } from "react-i18next";
import { selectObservedIngredient } from "../../services/reducers/IngredientsReducer";
import IngredientPage from "../../pages/ingredient/IngredientPage";
import FeedPage from "../../pages/feed/FeedPage";
import OrderPage from "../../pages/order/OrderPage";

const App = () => {
  const dispatch = useAppDispatch();
  const { t: ingredientsT } = useTranslation("ingredients");
  const ingredient = useAppSelector(selectObservedIngredient);
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const onCloseModal = () => {
    navigate(-1);
    dispatch(INGREDIENT_HIDE_DETAILS());
    dispatch(HIDE_MODAL());
  };

  useEffect(() => {
    dispatch(fetchIngredientsAction());
    dispatch(authAction());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={ingredient ? state?.bgLocation || location : location}>
        <Route path={PAGES_URL.INDEX} element={<IndexPage />} />
        <Route
          path={PAGES_URL.SIGN_UP}
          element={
            <ProtectedRoute
              page={<SignUpPage />}
              access={ACCESS_TYPES.GUESTS}
            />
          }
        />
        <Route
          path={PAGES_URL.LOGIN}
          element={
            <ProtectedRoute page={<LoginPage />} access={ACCESS_TYPES.GUESTS} />
          }
        />
        <Route
          path={PAGES_URL.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={PAGES_URL.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
        <Route
          path={PAGES_URL.PROFILE}
          element={
            <ProtectedRoute
              page={<ProfilePage />}
              access={ACCESS_TYPES.USERS}
            />
          }
        >
          <Route
            index
            path={PAGES_URL.PROFILE}
            element={<ProfileData />}
          ></Route>
          <Route
            path={PAGES_URL.PROFILE_ORDERS}
            element={<OrdersHistory />}
          ></Route>
        </Route>
        <Route path={PAGES_URL.FEED}>
          <Route index path={PAGES_URL.FEED} element={<FeedPage />}></Route>
          <Route path=":orderId" element={<OrderPage />} />
        </Route>
        <Route path={PAGES_URL.INGREDIENTS}>
          <Route path=":ingredientId" element={<IngredientPage />} />
        </Route>
      </Routes>

      {state?.bgLocation && ingredient && (
        <Routes>
          <Route path={PAGES_URL.INGREDIENTS}>
            <Route
              path=":ingredientId"
              element={
                <Modal
                  onClose={onCloseModal}
                  header={ingredientsT("h3.details")}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;

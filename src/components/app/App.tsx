import { useEffect } from "react";
import AppHeader from "../layout/header/Header";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/Store";
import { fetchIngredientsAction } from "../../services/actions/IngredientsActions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIngredientsAction());
    dispatch(authAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
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
        <Route path={PAGES_URL.PROFILE} element={<ProfilePage />}>
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
        <Route path={PAGES_URL.INGREDIENTS} element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

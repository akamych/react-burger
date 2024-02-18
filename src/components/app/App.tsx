import { useEffect } from "react";
import AppHeader from "../layout/header/Header";
import { Outlet } from "react-router-dom";
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

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIngredientsAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path={PAGES_URL.INDEX} element={<IndexPage />} />
        <Route path={PAGES_URL.SIGN_UP} element={<SignUpPage />} />
        <Route path={PAGES_URL.LOGIN} element={<LoginPage />} />
        <Route
          path={PAGES_URL.FORGOT_PASSWORD}
          element={<ForgotPasswordPage />}
        />
        <Route
          path={PAGES_URL.RESET_PASSWORD}
          element={<ResetPasswordPage />}
        />
        <Route path={PAGES_URL.PROFILE} element={<LoginPage />} />
        <Route path={PAGES_URL.INGREDIENTS} element={<LoginPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

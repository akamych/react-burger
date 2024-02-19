import { useTranslation } from "react-i18next";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";
import { AppDispatch } from "../../services/Store";
import { useDispatch } from "react-redux";
import { LoginRequestType } from "../../types/auth.type";
import { loginAction } from "../../services/actions/AuthActions";

const LoginPage = () => {
  const { t } = useTranslation("login");
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form: LoginRequestType = {
      email,
      password,
    };
    dispatch(loginAction(form));
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
          {t("h1")}
        </h1>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("labels.email")}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("labels.password")}
          value={password}
          name={"password"}
          icon="ShowIcon"
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={handleSubmit}
        >
          {t("buttons.login")}
        </Button>
        <span
          className={`text text_type_main-default text_color_inactive mb-4 ${styles.span}`}
        >
          {t("labels.newUser")}
          <Link to={PAGES_URL.SIGN_UP}>{t("buttons.signup")}</Link>
        </span>
        <span
          className={`text text_type_main-default text_color_inactive ${styles.span}`}
        >
          {t("labels.forgotPassword")}
          <Link to={PAGES_URL.FORGOT_PASSWORD}>
            {t("buttons.resetPassword")}
          </Link>
        </span>
      </main>
    </>
  );
};

export default LoginPage;

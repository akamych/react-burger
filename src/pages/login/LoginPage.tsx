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
import { useAppDispatch } from "../../services/Store";
import { LoginRequestType } from "../../types/auth.type";
import { loginAction } from "../../services/actions/AuthActions";

const LoginPage = () => {
  const { t } = useTranslation("login");
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
        <form onSubmit={handleSubmit}>
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("labels.email")}
            value={email}
            name={"email"}
            isIcon={false}
            autoComplete="email"
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("labels.password")}
            value={password}
            name={"password"}
            icon="ShowIcon"
            autoComplete="current-password"
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            {t("buttons.login")}
          </Button>
        </form>
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

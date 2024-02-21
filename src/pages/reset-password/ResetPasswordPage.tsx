import { useTranslation } from "react-i18next";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";
import { useAppDispatch, useAppSelector } from "../../services/Store";
import { selectPasswordIsSent } from "../../services/reducers/AuthReducer";
import { ResetPasswordConfirmRequestType } from "../../types/auth.type";
import { resetPasswordConfirmAction } from "../../services/actions/AuthActions";

const ResetPasswordPage = () => {
  const { t } = useTranslation("password");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useAppDispatch();
  const passwordIsSent = useAppSelector(selectPasswordIsSent);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: ResetPasswordConfirmRequestType = {
      password,
      token,
    };
    dispatch(resetPasswordConfirmAction(form));
  };

  return (
    <>
      {!passwordIsSent ? (
        <Navigate to={PAGES_URL.LOGIN} replace />
      ) : (
        <main className={styles.main}>
          <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
            {t("h1")}
          </h1>
          <form onSubmit={handleSubmit}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("labels.password")}
              value={password}
              name={"password"}
              autoComplete="new-password"
              icon="ShowIcon"
              extraClass="mb-6"
            />
            <Input
              type={"text"}
              placeholder={t("labels.code")}
              onChange={(e) => setToken(e.target.value)}
              value={token}
              name={"token"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="mb-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
            >
              {t("buttons.save")}
            </Button>
          </form>
          <span
            className={`text text_type_main-default text_color_inactive ${styles.span}`}
          >
            {t("labels.remembered")}
            <Link to={PAGES_URL.LOGIN}>{t("buttons.login")}</Link>
          </span>
        </main>
      )}
    </>
  );
};

export default ResetPasswordPage;

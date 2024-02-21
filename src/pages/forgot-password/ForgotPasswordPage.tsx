import { useTranslation } from "react-i18next";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";
import { resetPasswordAction } from "../../services/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../services/Store";
import { selectPasswordIsSent } from "../../services/reducers/AuthReducer";
import { ResetPasswordRequestType } from "../../types/auth.type";

const ForgotPasswordPage = () => {
  const { t } = useTranslation("password");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const passwordIsSent = useSelector(selectPasswordIsSent);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form: ResetPasswordRequestType = {
      email,
    };
    dispatch(resetPasswordAction(form));
  };

  return (
    <>
      {passwordIsSent ? (
        <Navigate to={PAGES_URL.RESET_PASSWORD} replace />
      ) : (
        <main className={styles.main}>
          <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
            {t("h1")}
          </h1>
          <EmailInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            autoComplete="email"
            isIcon={false}
            extraClass="mb-6"
            placeholder={t("labels.email")}
          />

          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mb-20"
            onClick={handleSubmit}
          >
            {t("buttons.reset")}
          </Button>
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

export default ForgotPasswordPage;

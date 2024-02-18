import { useTranslation } from "react-i18next";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";

const ForgotPasswordPage = () => {
  const { t } = useTranslation("password");
  const [name, setName] = useState("");

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
          {t("h1")}
        </h1>
        <EmailInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          placeholder={t("labels.email")}
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
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
    </>
  );
};

export default ForgotPasswordPage;

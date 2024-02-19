import { useTranslation } from "react-i18next";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";

const ResetPasswordPage = () => {
  const { t } = useTranslation("password");
  const [name, setName] = useState("");

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
          {t("h1")}
        </h1>
        <PasswordInput
          onChange={(e) => setName(e.target.value)}
          placeholder={t("labels.password")}
          value={name}
          name={"password"}
          icon="ShowIcon"
          extraClass="mb-6"
        />
        <Input
          type={"text"}
          placeholder={t("labels.code")}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          {t("buttons.save")}
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

export default ResetPasswordPage;

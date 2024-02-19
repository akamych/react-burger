import { useTranslation } from "react-i18next";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./SignUpPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGES_URL } from "../../constants/RoutesUrls";
import { useDispatch } from "react-redux";
import { registerAction } from "../../services/actions/AuthActions";
import { SignUpRequestType } from "../../types/auth.type";
import { AppDispatch } from "../../services/Store";

const SignUpPage = () => {
  const { t } = useTranslation("signup");
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form: SignUpRequestType = {
      name,
      email,
      password,
    };
    dispatch(registerAction(form));
  };

  return (
    <>
      <main className={styles.main}>
        <h1 className={`text text_type_main-large mt-10 mb-6 ${styles.h1}`}>
          {t("h1")}
        </h1>
        <Input
          type={"text"}
          placeholder={t("labels.name")}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
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
          {t("buttons.signup")}
        </Button>
        <span
          className={`text text_type_main-default text_color_inactive ${styles.span}`}
        >
          {t("labels.alreadyLoggedIn")}
          <Link to={PAGES_URL.LOGIN}>{t("buttons.login")}</Link>
        </span>
      </main>
    </>
  );
};

export default SignUpPage;

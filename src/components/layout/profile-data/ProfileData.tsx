import { useTranslation } from "react-i18next";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../services/reducers/AuthReducer";

const ProfileData = () => {
  const { t } = useTranslation("profile");
  const user = useSelector(selectUser);
  const [name, setName] = useState(!user || user === null ? "" : user.name);
  const [email, setEmail] = useState(!user || user === null ? "" : user.email);
  const [password, setPassword] = useState("");

  return (
    <div>
      <Input
        type={"text"}
        placeholder={t("labels.name")}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={"name"}
        autoComplete="name"
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon="EditIcon"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("labels.email")}
        value={email}
        name={"email"}
        autoComplete="email"
        isIcon
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("labels.password")}
        value={password}
        name={"password"}
        icon="EditIcon"
        autoComplete="off"
        extraClass="mb-6"
      />
    </div>
  );
};

export default ProfileData;

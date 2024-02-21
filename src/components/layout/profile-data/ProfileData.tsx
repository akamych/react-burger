import { useTranslation } from "react-i18next";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { selectUser } from "../../../services/reducers/AuthReducer";
import { DataChangeRequestType } from "../../../types/auth.type";
import { useAppDispatch, useAppSelector } from "../../../services/Store";
import { changeDataAction } from "../../../services/actions/AuthActions";

const initialData: DataChangeRequestType = {
  name: "",
  email: "",
  password: "",
};

const ProfileData = () => {
  const { t } = useTranslation("profile");
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<DataChangeRequestType>(initialData);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user || user === null) {
      return;
    }
    setValues((prevData) => ({
      ...prevData,
      ...user,
    }));
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isChanged) {
      return;
    }
    dispatch(changeDataAction(values));
    setIsChanged(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    setIsChanged(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={t("labels.name")}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        autoComplete="name"
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        icon="EditIcon"
        extraClass="mb-6"
      />
      <EmailInput
        onChange={handleChange}
        placeholder={t("labels.email")}
        value={values.email}
        name={"email"}
        autoComplete="email"
        isIcon
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={handleChange}
        placeholder={t("labels.password")}
        value={values.password}
        name={"password"}
        icon="EditIcon"
        autoComplete="current-password"
        extraClass="mb-6"
      />
      {isChanged && (
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          {t("buttons.save")}
        </Button>
      )}
    </form>
  );
};

export default ProfileData;

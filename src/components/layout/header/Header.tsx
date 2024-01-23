import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTranslation } from "react-i18next";
import HeaderMenu from "./menu/HeaderMenu";
import styles from "./Header.module.css";

const AppHeader = () => {
  const { t } = useTranslation("common");

  const handlerClick = (event: React.MouseEvent) => {
    console.log("click on:");
    console.log(event.target);
  };

  const leftMenu = [
    {
      icon: <BurgerIcon type="primary" />,
      text: t("builder"),
      onClick: handlerClick,
    },
    {
      icon: <ListIcon type="primary" />,
      text: t("feed"),
      onClick: handlerClick,
    },
  ];

  const rightMenu = [
    {
      icon: <ProfileIcon type="primary" />,
      text: t("myAccount"),
      onClick: handlerClick,
    },
  ];

  return (
    <header className={styles.header}>
      <HeaderMenu links={leftMenu} left />
      <Logo />
      <HeaderMenu links={rightMenu} />
    </header>
  );
};

export default AppHeader;

import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

// оставлю пока здесь закомментированным пример, чтобы вернуть,
// когда будет реализован роутер и другие страницы

// className={({ isActive }) =>
// isActive ? styles.header_nav_a_active : styles.header_nav_a
// }
// >
// {({ isActive }) => (
// <>
//   <BurgerIcon type={isActive ? "primary" : "secondary"} />
//   <b className={styles.header_nav_a_b}>{t("builder")}</b>
// </>
// )}

const AppHeader = () => {
  const { t } = useTranslation("common");

  return (
    <header className={styles.header}>
      <nav>
        <NavLink to="/" className={styles.header_nav_a_active}>
          <BurgerIcon type="primary" />
          <b className={styles.header_nav_a_b}>{t("builder")}</b>
        </NavLink>
        <NavLink to="/" className={styles.header_nav_a}>
          <ListIcon type="secondary" />
          <b className={styles.header_nav_a_b}>{t("feed")}</b>
        </NavLink>
      </nav>
      <Logo />
      <nav>
        <NavLink to="/" className={styles.header_nav_a}>
          <ProfileIcon type="secondary" />
          <b className={styles.header_nav_a_b}>{t("myAccount")}</b>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;

import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { PAGES_URL } from "../../../constants/RoutesUrls";

const AppHeader = () => {
  const { t } = useTranslation("common");

  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          to={PAGES_URL.INDEX}
          className={({ isActive }) =>
            isActive ? styles.header_nav_a_active : styles.header_nav_a
          }
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <b className={styles.header_nav_a_b}>{t("builder")}</b>
            </>
          )}
        </NavLink>
        <NavLink
          to={PAGES_URL.FEED}
          className={({ isActive }) =>
            isActive ? styles.header_nav_a_active : styles.header_nav_a
          }
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <b className={styles.header_nav_a_b}>{t("feed")}</b>
            </>
          )}
        </NavLink>
      </nav>
      <Link to={PAGES_URL.INDEX}>
        <Logo />
      </Link>
      <nav>
        <NavLink
          to={PAGES_URL.PROFILE}
          className={({ isActive }) =>
            isActive ? styles.header_nav_a_active : styles.header_nav_a
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <b className={styles.header_nav_a_b}>{t("myAccount")}</b>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;

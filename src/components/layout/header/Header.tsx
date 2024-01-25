import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

type headerNavSections = "builder" | "feed" | "myAccount";

const AppHeader = () => {
  const { t } = useTranslation("common");
  const [activeSection, setActiveSection] =
    useState<headerNavSections>("builder");

  return (
    <header className={styles.header}>
      <nav>
        <NavLink
          to="/"
          className={
            activeSection === "builder"
              ? styles.header_nav_a_active
              : styles.header_nav_a
          }
          onClick={() => setActiveSection("builder")}
        >
          <BurgerIcon
            type={activeSection === "builder" ? "primary" : "secondary"}
          />
          <b className={styles.header_nav_a_b}>{t("builder")}</b>
        </NavLink>
        <NavLink
          to="/"
          className={
            activeSection === "feed"
              ? styles.header_nav_a_active
              : styles.header_nav_a
          }
          onClick={() => setActiveSection("feed")}
        >
          <ListIcon type={activeSection === "feed" ? "primary" : "secondary"} />
          <b className={styles.header_nav_a_b}>{t("feed")}</b>
        </NavLink>
      </nav>
      <Logo />
      <nav>
        <NavLink
          to="/"
          className={
            activeSection === "myAccount"
              ? styles.header_nav_a_active
              : styles.header_nav_a
          }
          onClick={() => setActiveSection("myAccount")}
        >
          <ProfileIcon
            type={activeSection === "myAccount" ? "primary" : "secondary"}
          />
          <b className={styles.header_nav_a_b}>{t("myAccount")}</b>
        </NavLink>
      </nav>
    </header>
  );
};

export default AppHeader;

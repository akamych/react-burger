import { useTranslation } from "react-i18next";
import styles from "./ProfileNav.module.css";
import { NavLink } from "react-router-dom";
import { PAGES_URL } from "../../../constants/RoutesUrls";

const ProfileNav = () => {
  const { t } = useTranslation("profile");

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("logout");
  };

  return (
    <div>
      <nav className={`text text_type_main-medium mb-20 ${styles.profile_nav}`}>
        <NavLink
          to={PAGES_URL.PROFILE}
          className={({ isActive }) =>
            isActive
              ? styles.profile_nav_a_active
              : styles.profile_nav_a_notactive
          }
          end
        >
          {t("links.profile")}
        </NavLink>
        <NavLink
          to={PAGES_URL.PROFILE_ORDERS}
          className={({ isActive }) =>
            isActive
              ? styles.profile_nav_a_active
              : styles.profile_nav_a_notactive
          }
          end
        >
          {t("links.orders")}
        </NavLink>
        <NavLink
          to={PAGES_URL.INDEX}
          className={styles.profile_nav_a_notactive}
          onClick={handleLogout}
        >
          {t("links.logout")}
        </NavLink>
      </nav>
      <span className="text text_type_main-small text_color_inactive">
        {t("info.section")}
      </span>
    </div>
  );
};

export default ProfileNav;

import { Outlet } from "react-router-dom";
import ProfileNav from "../../components/layout/profile-nav/ProfileNav";
import styles from "./FeedPage.module.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch } from "../../services/Store";
import { WS_START } from "../../services/actions/WebSocketActions";

const FeedPage = () => {
  const { t } = useTranslation("feed");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(WS_START("wss://norma.nomoreparties.space/orders/all"));
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h1 className="text text_type_main-large mt-10 mb-5">{t("h1")}</h1>
        <ProfileNav />
        <Outlet />
      </main>
    </>
  );
};

export default FeedPage;

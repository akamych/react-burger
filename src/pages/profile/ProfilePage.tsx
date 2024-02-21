import { Outlet } from "react-router-dom";
import ProfileNav from "../../components/layout/profile-nav/ProfileNav";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <>
      <main className={styles.main}>
        <ProfileNav />
        <Outlet />
      </main>
    </>
  );
};

export default ProfilePage;

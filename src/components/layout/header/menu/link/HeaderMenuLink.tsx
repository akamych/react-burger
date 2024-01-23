import styles from "./HeaderMenuLink.module.css";

export type HeaderMenuLinkPropType = {
  icon: JSX.Element;
  text: string;
  onClick: (event: React.MouseEvent) => void;
};

const HeaderMenuLink = (props: HeaderMenuLinkPropType) => {
  const { icon, text, onClick } = props;

  return (
    <li className={styles.header_ul_li} onClick={onClick}>
      {icon}
      <b className={styles.header_ul_li_b}>{text}</b>
    </li>
  );
};

export default HeaderMenuLink;

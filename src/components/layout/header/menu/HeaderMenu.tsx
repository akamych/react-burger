import HeaderMenuLink, { HeaderMenuLinkPropType } from "./link/HeaderMenuLink";
import styles from "./HeaderMenu.module.css";

type propType = {
  links: HeaderMenuLinkPropType[];
  left?: boolean;
};

const HeaderMenu = (props: propType) => {
  const { links, left } = props;
  return (
    <ul className={left === true ? styles.header_ul_left : styles.header_ul}>
      {Array.isArray(links) && links.length
        ? links.map(
            (link: HeaderMenuLinkPropType): JSX.Element => (
              <HeaderMenuLink {...link} />
            )
          )
        : null}
    </ul>
  );
};

export default HeaderMenu;

import styles from "./H2.module.css";

type propType = {
  children: string;
};

const H2 = (props: propType) => {
  const { children } = props;
  return <h2 className={styles.h2}>{children}</h2>;
};

export default H2;

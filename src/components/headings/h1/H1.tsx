import styles from "./H1.module.css";

type propType = {
  children: string;
};

const H1 = (props: propType) => {
  const { children } = props;
  return <h1 className={styles.h1}>{children}</h1>;
};

export default H1;

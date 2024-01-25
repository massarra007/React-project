import React from "react";
import styles from "./styles.module.scss";

function H1({ children }) {
  return <h1 className={styles.h1}>{children}</h1>;
}

export default H1;

import * as React from "react";
import Chip from "@mui/material/Chip";
import styles from "./styles.module.scss";

export default function ColorChips({ label, color }) {
  return (
    <Chip label={label} color={color} size="small" className={styles.chip} />
  );
}

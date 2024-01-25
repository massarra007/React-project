import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

import st from "./styles.module.scss";

function Loading() {
  return (
    <div className={st.container}>
      <div className={st.spinner}>
        <CircularProgress />
      </div>
    </div>
  );
}

export default Loading;

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingPetit() {
  return (
    <CircularProgress
      sx={{
        justifyContent: "center",
        marginLeft: 50,
        marginTop: 10,
      }}
    />
  );
}

export default LoadingPetit;

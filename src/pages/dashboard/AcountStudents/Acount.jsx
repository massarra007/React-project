import React from "react";
import { Box, Typography } from "@mui/material";

function Acount() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
        borderRadius: 4,
        maxWidth: 300,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          marginRight: 2,
        }}
      >
        <img width={64} height={64} style={{ borderRadius: "50%" }} />
      </Box>
      <Box>
        <Typography variant="h6">"user.name"</Typography>
        <Typography variant="body1">"user.email"</Typography>
      </Box>
    </Box>
  );
}

export default Acount;

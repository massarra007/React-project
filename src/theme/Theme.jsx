// #1976D2 blue
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkMode = createTheme({
  palette: {
    primary: {
      main: "#4580F0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7267F1",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FF9E42",
      contrastText: "#ffffff",
    },
    info: {
      main: "#00CFE8",
      contrastText: "#ffffff",
    },
    success: {
      main: "#28C66E",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EB5454",
      contrastText: "#ffffff",
    },
  },
});

const Theme = (props) => {
  const { children } = props;

  return <ThemeProvider theme={darkMode}>{children}</ThemeProvider>;
};

export default Theme;

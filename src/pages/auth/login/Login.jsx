import React, { useState, useContext } from "react";
import styles from "./styles.module.scss";
import AuthServ from "../../../services/Auth.service";
import { UserContext } from "../../../store/Contexts";
import fig1 from "../../../assets/images/figures/login.svg";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomizedDialogs from "../../../components/Popup/Popup";
import FullScreenDialog from "../../../components/Popup/FullWidthPopup";
import pendingAnnimation from "../../../assets/annimations/pending.json";
import Lottie from "lottie-react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © IsaMan {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

function Login() {
  const [form, setForm] = useState({
    userName: "58217520",
    password: "58217520",
  });
  const [showPopup, setShowPopup] = useState(false);

  const { setUser } = useContext(UserContext);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const AnnimationPending = () => {
    return (
      <Lottie
        style={{
          resizeMode: "contain",
          alignSelf: "center",
          margin: "auto",
          height: 300,
          width: 300,
        }}
        animationData={pendingAnnimation}
      />
    );
  };

  const handle_submit = (e) => {
    e.preventDefault();
    const succ = (user) => {
      setUser(user);
    };
    const fail = (error) => {
      if (error == "ALUMINI_INVALIDE") {
        //console.log("invalide alumini");
        setShowPopup(true);
      }
    };

    AuthServ.Login(form, succ, fail);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CustomizedDialogs
          open={showPopup}
          data-testId="popup-validation"
          title={"ACOUNT VALIDATION PENDING"}
          children={
            <Grid container justifyContent={"center"} direction={"column"}>
              <Grid item xs>
                <div style={{ height: 270, width: 500 }}>
                  <AnnimationPending />
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "inherit",
                    fontWeight: "500",
                    padding: 10,
                  }}
                >
                  <p>
                    ACOUNT VALIDATION PENDING <br />
                    WAIT FOR ADMIN VALIDATION
                  </p>
                </div>
              </Grid>
            </Grid>
          }
          handleClose={() => setShowPopup(false)}
        />
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://plurielle.tn/pro/wp-content/uploads/2022/06/photo-98690.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
              src="data:image/png;base64,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"
            ></Avatar>
            <Typography component="h1" variant="h5">
              Se connecter à IsaMan
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handle_submit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Login"
                name="userName"
                autoFocus
                onChange={handle_change}
                data-test="userName"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot De Passe"
                type="password"
                onChange={handle_change}
                data-test="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Restez Connectés"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-test="connectButton"
              >
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Mot de passe oublié ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Nouvelle Aluminie ? S'inscrire
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
              <p className={styles.passwords}>
                Passwords : <br />
                ST(58217529) ; AL(99800397) ; AD(27893540) ; TE(99800937) ;
                SA(58217520) ; RF(00000000); AL VALIDE(50635155/50635155)
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;

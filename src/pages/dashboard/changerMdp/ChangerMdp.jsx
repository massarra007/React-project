import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext } from "../../../store/Contexts";

import AcountService from "../../../services/Acount.service";

const theme = createTheme();

export default function ChangePwd() {
  const { setUser } = useContext(UserContext);

  const [logout, setLogout] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var body = {
      //email: data.get('email'),
      password: data.get("NewPwd"),
      confpassword: data.get("confNewPwd"),
      oldpassword: data.get("oldPwd"),
    };
    const succ = (user) => {
      //if se deconnecter is selected deconnect else update user
      if (logout) {
        setUser(null);
      } else {
       // setUser(user);
      }
    };
    const fail = (error) => {};
     AcountService.UpdatePassword(body,succ,fail);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Changer Mot de passe
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPwd"
              label="Ancien mot de passe"
              type="password"
              id="oldPwd"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="NewPwd"
              label="Nouveau mot de passe"
              type="password"
              id="NewPwd"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confNewPwd"
              label="Confirmer nouveau mot de passe"
              type="password"
              id="confNewPwd"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  //schecked={logout}
                  onChange={(e) => {
                    // console.log(e.target.checked);
                    setLogout(e.target.checked);
                  }}
                  value="remember"
                  color="primary"
                />
              }
              label="Se deconnecter"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Mettre à jour
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

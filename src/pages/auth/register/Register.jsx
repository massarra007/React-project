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
import styles from "./styles.module.scss";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RadioGroup from "@mui/material/RadioGroup";
import AuthServ from "../../../services/Auth.service";




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

function Register() {
  const diplomes = [
    {
      value: "LICENSE FONDA EN INFO",
    },
    {
      value: "LICENSE APPLIQUE EN INFO",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") == "") setErrorEmail(true);
    if(selectedDiplome==null)setErrorDip(true);
    if(promotion==null||promotion=="")setErrorProm(true);
    if (isEmail(data.get("email"))) setFormatEmail(true);
    /* if(data.get("password")=="")
    setErrorPwd(true) */
    var verifyPass = verifyPwd(data.get("password"));
    if (verifyPass != "") {
      setErrorPwd(true);
      setVerifyPwdError(verifyPass);
    }
    if (data.get("firstName") == "") setErrorNom(true);
    if (data.get("lastName") == "") setErrorPreNom(true);
    if (data.get("Ntel") == "") setErrorNtel(true);
  if(dateNaissance==null)setErrorDateNaiss(true)
    //if all data is valid
    if(!errorDateNaiss&&!errorDip&&!errorEmail&&
      !errorNom&&!errorPreNom&&!errorNtel&&!errorPwd
      &&!errorProm&&dateNaissance!=null
      )
    {
      const succ = (user) => {
        window.location.href = '/login';
        };
      const fail = (error) => {

      };
  
      const body={
        email: data.get("email"),
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phoneNumber: data.get("Ntel"),
        sex: "MEN",
        birthDate: dateNaissance.toISOString().substring(0, 10),
  
        promotion: promotion,
        diplome: data.get("diplome"),
      };
      console.log(body);
      AuthServ.RegisterAluminie(body,succ,fail)
    }
  };

  const isEmail = (val) => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
      return "Invalid Email";
    }
  };
  const verifyPwd = (password) => {
    if (password == "") return "Mot de passe vide";
    if (password.length < 8) return "Taille min 8";
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
      return "Mot de passe doit contenir des caractéres majuscules";
    }

    const hasLowerCase = /[a-z]/.test(password);
    if (!hasLowerCase) {
      return "Mot de passe doit contenir des caractéres miniscules";
    }

    const hasNumbers = /\d/.test(password);
    if (!hasNumbers) {
      return "Mot de passe doit contenir des caractéres numériques";
    }
    return "";
  };

  const [errorNom, setErrorNom] = useState(false);
  const [errorPreNom, setErrorPreNom] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [formatEmail, setFormatEmail] = useState(false);

  const [errorPwd, setErrorPwd] = useState(false);
  const [errorNtel, setErrorNtel] = useState(false);
  const [errorDip, setErrorDip] = useState(false);
  const [errorProm, setErrorProm] = useState(false);
  const [errorDateNaiss, setErrorDateNaiss] = useState(false);
  const [dateNaissance, setDateNaissance] = useState(null);
  const [promotion, setPromotion] = useState("");
  const [verifyPwdError, setVerifyPwdError] = useState("");
  const [selectedDiplome, setSelectedDiplome] = useState(null);

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
            S'inscrire
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl
              required
              error={true}
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    onChange={() => {
                      setErrorNom(false);
                    }}
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Nom"
                    autoFocus
                    error={errorNom}
                    helperText={errorNom ? "Vérifier champ." : ""}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={() => {
                      setErrorPreNom(false);
                    }}
                    required
                    fullWidth
                    id="lastName"
                    label="Prenom"
                    name="lastName"
                    autoComplete="family-name"
                    error={errorPreNom}
                    helperText={errorPreNom ? "Vérifier champ." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={() => {
                      setFormatEmail(false);
                      setErrorEmail(false);
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    error={errorEmail || formatEmail}
                    helperText={
                      errorEmail
                        ? "Champ email vide."
                        : formatEmail
                        ? "Format email invalide"
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={() => {
                      setErrorPwd(false);
                      setVerifyPwdError("");
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={errorPwd}
                    helperText={errorPwd ? verifyPwdError : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  onChange={()=>setErrorNtel(false)}
                    required
                    fullWidth
                    id="Ntel"
                    label="Numéro teléphone"
                    name="Ntel"
                    // autoComplete="email"
                    error={errorNtel}
                    helperText={errorNtel ? "Numéro télephone vide." : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(d) => setDateNaissance(d)}
                      label="Date Naissancee"
                     // defaultValue={new Date()}
                     //value={dateNaissance}
                    />
                  </LocalizationProvider>
                  {errorDateNaiss==true && (
                    <FormHelperText>{"Sélectionner Date Naissancee"}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="diplome"
                    select
                    name="diplome"
                    label="Diplome"
                    defaultValue={"_________________________"}
                    //helperText="Please select your currency"
                    error={errorDip}
                    helperText={errorDip||selectedDiplome==null ? "Sélectionner diplome." : ""}
                    sx={{ width: 300 }} 
                    data-testid="diplome-field" // Add data-testid attribute

                  >
                    {diplomes.map((option) => (
                      <MenuItem
                      onClick={() => setSelectedDiplome(option.value)} // Use a callback function here
                      key={option.value}
                        value={option.value}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider 
                   dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(e) => {
                        console.log(`${e.$y}-${e.$y + 1}`);
                        setPromotion(`${e.$y}-${e.$y + 1}`);
                      }}
                      label="Promotion"
                      views={["year"]}
                      data-testid="promotion-datepicker" // Add data-testid attribute

                    />
                  </LocalizationProvider>
                  {errorProm && (
                    <FormHelperText>{"Sélectionner promotion"}</FormHelperText>
                  )}
                </Grid>

                <Grid item xs={12}>
                  {/*        <FormControl
                  required
                  error={false}
                  component="fieldset"
                  sx={{ m: 3 }}
                  variant="standard"
                > */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="MEN"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="WOMEN"
                      control={<Radio />}
                      label="Femme"
                    />
                    <FormControlLabel
                      value="MEN"
                      control={<Radio />}
                      label="Homme"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Vous avez déjà un compte? Se connecter
                  </Link>
                </Grid>
              </Grid>
            </FormControl>
          </Box>
        </Box>

        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register;

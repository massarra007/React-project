import { makeDate2 } from "../../../functions/dates";
import React, { useContext, useEffect, useState } from "react";
import Profil from "../../../services/Profile.service";
import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { UserContext } from "../../../store/Contexts";
import styles from "./styles.module.scss";
import Grid from "@mui/material/Grid";
import Select from "../../../components/Inputs/Select";
import TextField from "@mui/material/TextField";

function UpdateProfile({ popup, handleClose }) {
  const { open, value } = popup;
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    sex: "",
  });

  const [emailForm, setEmailForm] = useState("");

  useEffect(() => {
    const { firstName, lastName, phoneNumber, birthDate, sex, email } = user;
    setFormData({ firstName, lastName, phoneNumber, birthDate, sex });
    setEmailForm(email);
  }, [user]);

  const handle_change_profile = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateGeneral = () => {
    Profil.UpdateGeneral(formData, (res) => {
      setUser(res.data.data);
    });
  };

  const handleUpdateEmail = () => {
    try {
      Profil.UpdateEmail(emailForm, (res) => {
        setUser(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`User :  ${value.firstName} ${value.lastName}`}
    >
      <DialogContent dividers>
        <div className={styles.card}>
          <Grid container spacing={1}>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Prénom"
                name="firstName"
                value={formData?.firstName}
                onChange={handle_change_profile}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Nom"
                name="lastName"
                value={formData.lastName}
                onChange={handle_change_profile}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Numéro de tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handle_change_profile}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="date"
                className={styles.textField}
                label="Date de naissance"
                name="birthDate"
                value={makeDate2(formData.birthDate)}
                onChange={handle_change_profile}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={12}>
              <Select
                className={styles.textField}
                value={formData.sex}
                label="Genre"
                name="sex"
                onChange={handle_change_profile}
                items={[
                  { name: "Masculin", value: "MEN" },
                  { name: "Féminin", value: "WOMEN" },
                ]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xl={6} lg={6} md={12}>
              <Button
                autoFocus
                variant="outlined"
                onClick={handleUpdateGeneral}
              >
                Modifier Profile
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="email"
                className={styles.textField}
                label="E-mail"
                name="email"
                value={emailForm}
                onChange={(e) => setEmailForm(e.target.value)}
              />
            </Grid>
            <br />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xl={6} lg={6} md={12}>
              <Button autoFocus variant="outlined" onClick={handleUpdateEmail}>
                Modifier Email
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfile;

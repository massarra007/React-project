import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AdminService from "../../../../services/AdminService";
import { roles } from "../../../../custom/roles";
import { toast } from "react-hot-toast";

const permessions = [
  "student",
  "teacher",
  "user",
  "event",
  "participation",
  "technologie",
  "saison",
  "PFE",
  "PFA",
  "offer",
  "recruitment",
  "statisticChomage",
  "validateAluminie",
];
function ModalAddAdmin({ popup, handleClose }) {
  const { open, value } = popup;
  const [Admin, setAdmin] = useState({
    birthDate: new Date(),
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sex: "",
    permessions: [],
  });

  const [ErrorEmail, setErrorEmail] = useState(false);
  const [ErrorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [Submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSubmitted(false);
    setAdmin({ ...Admin, [e.target.name]: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setAdmin({ ...Admin, permessions: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.AddAdmin(Admin)
      .then((response) => {
        console.log(response);
        toast.success("Adminstrateur Ajouter avec Succès.");
        value.push(response.data.data);
        handleClose();
      })
      .catch((error) => {
        if (error.response.data.Message === "email error") {
          setErrorEmail(true);
        } else if (error.response.data.Message === "phoneNumber error") {
          setErrorPhoneNumber(true);
        }
      });
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={"Nouveau Adminstrateur"}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers data-test="modal">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                required
                name="firstName"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Admin.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="lastName"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Admin.lastName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="N° Téléphone"
                name="phoneNumber"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Admin.phoneNumber}
                error={ErrorPhoneNumber}
                helperText={
                  ErrorPhoneNumber ? "Numéro de téléphone déja existe" : ""
                }
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date De Naissance"
                name="birthDate"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Admin.birthDate}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Admin.email}
                error={ErrorEmail}
                helperText={ErrorEmail ? "Email déja existe" : ""}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="genre"
                name="sex"
                select
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Admin.sex}
                required
                id="genre-select"
              >
                <MenuItem value="MEN">MEN</MenuItem>
                <MenuItem value="WOMEN">WOMEN</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                size="small"
                id="permission-select"
                multiple
                options={permessions}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                onChange={handleOptionSelect}
                value={selectedOption}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="permessions"
                    placeholder="permessions"
                  />
                )}
              />
            </Grid>{" "}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            autoFocus
            variant="contained"
            type="submit"
            data-test="buttonAddadmin"
          >
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddAdmin;

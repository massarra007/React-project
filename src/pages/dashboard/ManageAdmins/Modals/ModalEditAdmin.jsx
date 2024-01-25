import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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
function ModalEditAdmin({ popup, handleClose, handleEditAdmin }) {
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
  const handleChange = (e) => {
    setAdmin({ ...Admin, [e.target.name]: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setAdmin({ ...Admin, permessions: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Admin);
    AdminService.UpdateAdmin(value._id, Admin)
      .then((response) => {
        console.log(response.data);
        handleEditAdmin(value._id, Admin);
        toast.success("Adminstrateur modifier avec Succès.");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    setSelectedOption(value.permessions);
    setAdmin({
      birthDate: new Date(value.birthDate).toISOString().substr(0, 10),
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
      sex: value.sex,
      permessions: value.permessions,
    });
  }, []);

  return (
    <Dialog open={open} handleClose={handleClose} title={"Modifer Enseignant"}>
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
              >
                <MenuItem value="MEN">MEN</MenuItem>
                <MenuItem value="WOMEN">WOMEN</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="permission-select"
                size="small"
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
            Modifier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEditAdmin;

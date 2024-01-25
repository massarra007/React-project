import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
import TeacherService from "../../../../services/TeacherService";
import { roles } from "../../../../custom/roles";
import { toast } from "react-hot-toast";

const course = ["Node", "Base de Donne", "React"];
function ModalAddTeacher({ popup, handleClose }) {
  const { open, value } = popup;
  const [Teacher, setTeacher] = useState({
    birthDate: new Date(),
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    sex: "",
    course: [],
  });

  const [isResponsable, setisResponsable] = useState(false);
  const [ErrorEmail, setErrorEmail] = useState(false);
  const [ErrorPhoneNumber, setErrorPhoneNumber] = useState(false);
  const [Submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSubmitted(false);
    setTeacher({ ...Teacher, [e.target.name]: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setTeacher({ ...Teacher, course: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isResponsable) {
      TeacherService.AddTeacherResponsible(Teacher)
        .then((response) => {
          console.log(response);
          toast.success("Enseignant Ajouter avec Succès.");
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
    } else {
      TeacherService.AddTeacher(Teacher)
        .then((response) => {
          toast.success("Enseignant Ajouter avec Succès.");
          value.push(response.data.data);
          handleClose();
        })
        .catch((error) => {
          if (error.response.data.Message === "email error") {
            setErrorEmail(true);
          } else if (error.response.data.Message === "phoneNumber error") {
            setErrorPhoneNumber(true);
          }
          console.log(error);
        });
    }
  };
  return (
    <Dialog open={open} handleClose={handleClose} title={"Nouveau Enseignant"}>
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
                value={Teacher.firstName}
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
                value={Teacher.lastName}
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
                value={Teacher.phoneNumber}
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
                value={Teacher.birthDate}
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
                value={Teacher.email}
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
                value={Teacher.sex}
                required
                id="genre-select"
              >
                <MenuItem value="MEN">MEN</MenuItem>
                <MenuItem value="WOMEN">WOMEN</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                id="course-select"
                size="small"
                multiple
                options={course}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                onChange={handleOptionSelect}
                value={selectedOption}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Cours"
                    placeholder="Cours"
                  />
                )}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="est responsable ?"
                checked={isResponsable}
                onChange={(event) => {
                  setisResponsable(event.target.checked);
                }}
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
            data-test="buttonAddteacher"
            variant="contained"
            type="submit"
          >
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddTeacher;

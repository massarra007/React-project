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
import TeacherService from "../../../../services/TeacherService";
import { roles } from "../../../../custom/roles";
import { toast } from "react-hot-toast";

const course = ["Node", "Base de Donne", "React"];
function ModalEditTeacher({ popup, handleClose, handleEditTeacher }) {
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
  const handleChange = (e) => {
    setTeacher({ ...Teacher, [e.target.name]: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setTeacher({ ...Teacher, course: options });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Teacher);
    TeacherService.UpdateTeacher(value._id, Teacher)
      .then((response) => {
        console.log(response.data);
        handleEditTeacher(value._id, Teacher);
        toast.success("Enseignant modifier avec Succès.");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    setSelectedOption(value.course);
    setTeacher({
      birthDate: new Date(value.birthDate).toISOString().substr(0, 10),
      email: value.email,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
      sex: value.sex,
      course: value.course,
    });
  }, []);

  return (
    <Dialog open={open} handleClose={handleClose} title={"Modifer Enseignant"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers>
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
              >
                <MenuItem value="MEN">MEN</MenuItem>
                <MenuItem value="WOMEN">WOMEN</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
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
            data-test="buttonEditTeacher"
          >
            Modifier
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEditTeacher;

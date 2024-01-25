import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../store/Contexts";

import { getMonth } from "date-fns";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import { FormHelperText } from "@mui/material";

import Checkbox from "@mui/material/Checkbox";
import StudentService from "../../../../services/Student.service";
import { roles } from "../../../../custom/roles";

const niveauList = ["1", "2", "3"];
const classeList = ["Ingenieurie", "Licence", "Master", "Doctorat"];
const numeroList = ["1", "2", "3", "4", "5", "6"];

function UpdateClass() {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [Next, setNext] = useState(false);
  const [diplomaObtained, setDiplomaObtained] = useState("");
  const [Info, setInfo] = useState({
    classe: "",
    niveau: 1,
    numero_classe: 1,
    diplome: "",
  });
  const [error, setError] = useState("");
  const [validate, setvalidate] = useState("");

  const handleChange = (e) => {
    setInfo({ ...Info, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (event) => {
    setDiplomaObtained(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(today);
    if (
      (user.role === roles.STUDENT || user.role === roles.ALUMINIE) &&
      user.isUpdated === false &&
      getMonth(today) + 1 >= 9
    ) {
      setOpen(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate) {
      try {
        StudentService.UpdateUniverYear(Info, (res) => {
          setUser(res.data.data);
          handleClose();
        });
        setError("");
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Confirmer s'il vous plaît");
    }
  };
  const handleNext = () => {
    if (!diplomaObtained) {
      setError("Sélectionner une option s'il vous plaît");
    } else {
      setNext(true);
      setError("");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      {" "}
      <DialogTitle>Mettre à jour vos informations Universitaires </DialogTitle>
      <DialogContent>
        {Next === false ? (
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            Avez-vous déjà obtenu votre diplôme ?{" "}
            <div>
              <FormControl error={!!error}>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={diplomaObtained}
                  onChange={handleRadioChange}
                  required
                >
                  <FormControlLabel
                    value="OUI"
                    control={<Radio />}
                    label="OUI"
                  />
                  <FormControlLabel
                    value="NON"
                    control={<Radio />}
                    label="NON"
                  />
                </RadioGroup>
                <FormHelperText>{error}</FormHelperText>
              </FormControl>

              {diplomaObtained === "OUI" ? (
                <div>
                  <TextField
                    fullWidth
                    label="Nom du Diplome"
                    type="text"
                    required
                    variant="standard"
                    onChange={handleChange}
                    value={Info.diplome}
                    name="diplome"
                  />
                </div>
              ) : (
                " "
              )}
            </div>
          </Box>
        ) : (
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "fit-content",
            }}
          >
            {" "}
            Entrer votre niveau d'étude,classe,numéro de classe
            <div style={{ marginTop: 14 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Specialité
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Niveau"
                  size="small"
                  onChange={handleChange}
                  value={Info.classe}
                  name="classe"
                  required
                >
                  {classeList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: 14 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Niveau</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Niveau"
                  size="small"
                  onChange={handleChange}
                  value={Info.niveau}
                  name="niveau"
                >
                  {niveauList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: 14 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Numéro du classe
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Niveau"
                  size="small"
                  onChange={handleChange}
                  value={Info.numero_classe}
                  name="numero_classe"
                >
                  {numeroList.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <FormGroup error={!!error}>
              <FormControlLabel
                required
                control={<Checkbox defaultChecked />}
                label="Je confirme que tous les informations sont correctes"
                name="validate"
                onChange={(e) => setvalidate(e.target.value)}
              />
              <FormHelperText>{error !== "" ? error : ""}</FormHelperText>
            </FormGroup>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {Next ? (
          <Button
            variant="contained"
            type="submit"
            onClick={(E) => handleSubmit(E)}
          >
            {" "}
            Enregistrer
          </Button>
        ) : (
          <Button variant="contained" onClick={() => handleNext()}>
            {" "}
            Suivant
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default UpdateClass;

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
import EventService from "../../../../services/EventService";
import { roles } from "../../../../custom/roles";
import { toast } from "react-hot-toast";

const EventType = ["JPO", "Journée d'integration", "Formation"];
function ModalAddEvent({ popup, handleClose }) {
  const { open, value } = popup;
  const [isChecked, setIsChecked] = useState(false);

  const [Event, setEvent] = useState({
    eventName: "",
    eventDateDebut: new Date(),
    eventDateFin: new Date(),
    eventType: "",
    description: "",
    location: "",
    duration: "",
    organizedBy: "",
  });
  const handleChange = (e) => {
    setEvent({ ...Event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Event);
    EventService.AddEvent(Event)
      .then((response) => {
        toast.success("Evénement Ajouter avec Succès.");
        value.push(response.data.data);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Evénement déjà existe ");
      });
  };
  return (
    <Dialog open={open} handleClose={handleClose} title={"Nouveau Evénement"}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers data-test="modal">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom d'Événement"
                required
                name="eventName"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Event.eventName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="type-select"
                name="eventType"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={Event.eventType}
                label="Type d'evenement"
                select
                required
              >
                {EventType.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date Debut"
                name="eventDateDebut"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Event.eventDateDebut}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {isChecked ? (
                <></>
              ) : (
                <TextField
                  fullWidth
                  type="date"
                  label="Date Fin"
                  name="eventDateFin"
                  variant="filled"
                  size="small"
                  onChange={handleChange}
                  value={Event.eventDateFin}
                />
              )}
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Dans le meme jour"
                checked={isChecked}
                onChange={(event) => {
                  setIsChecked(event.target.checked);
                  setEvent({
                    ...Event,
                    eventDateFin: null,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Localisation"
                name="location"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Event.location}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Durée en heure"
                name="duration"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Event.duration}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="organisateur"
                name="organizedBy"
                variant="filled"
                size="small"
                required
                onChange={handleChange}
                value={Event.organizedBy}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="description du evenement"
                data-test="dd"
                name="description"
                variant="filled"
                size="small"
                required
                multiline
                rows={2}
                onChange={handleChange}
                value={Event.description}
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
            data-test="buttonAddEvent"
          >
            Ajouter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddEvent;

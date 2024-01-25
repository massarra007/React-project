import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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
import EventService from "../../../../services/EventService";
import { roles } from "../../../../custom/roles";
import { toast } from "react-hot-toast";

const course = ["Node", "Base de Donne", "React"];
function ModalDeleteEvent({ popup, handleClose, handleDeleteEvent }) {
  const { open, valueArray, valueRow } = popup;

  const handleSubmit = (e) => {
    e.preventDefault();
    EventService.DeleteEvent(valueRow._id)
      .then(async (response) => {
        handleDeleteEvent(valueRow._id);
        toast.success("Evénement  supprimer avec Succès.");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <Dialog open={open} handleClose={handleClose} title={"Supprimer événement"}>
      <form onSubmit={(e) => handleSubmit(e)} data-test="modal">
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer l'événement {valueRow.eventName} ?{" "}
            </Typography>
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
            data-test="confirmDeleteButton"
          >
            Supprimer
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalDeleteEvent;

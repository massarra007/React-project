import React, { useState } from "react";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ProjetServ from "../../../../services/Projet.service";

function DeleteStage({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [loading, setLoading] = useState(false);

  const DeleteProject = () => {
    ProjetServ.DeleteProject(value._id)
      .then((resp) => {
        console.log(resp);
        callback();
        handleClose();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Supprimer Stage : ${value.title}`}
    >
      <DialogContent dividers>
        <Typography variant="h5" component="h1" align="center">
          Es-tu sûr de supprimer {value.firstName} {value.lastName}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button
          autoFocus
          variant="contained"
          color="error"
          onClick={DeleteProject}
          disabled={loading}
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteStage;

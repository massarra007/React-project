import React, { useState } from "react";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ProjetServ from "../../../../services/Projet.service";

function ApproveByRes({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [loading, setLoading] = useState(false);

  const ChoisirPfa = () => {
    ProjetServ.Student_Chose_pfa(value._id)
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
      title={`Choisir PFA : ${value.title}`}
    >
      <DialogContent dividers>
        <Typography variant="h5" component="h1" align="center">
          Es-tu sûr de choisir <strong>{value.title}</strong>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button
          autoFocus
          variant="contained"
          color="primary"
          onClick={ChoisirPfa}
          disabled={loading}
        >
          Choisir
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveByRes;

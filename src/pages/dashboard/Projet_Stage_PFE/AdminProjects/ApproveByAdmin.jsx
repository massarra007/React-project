import React, { useState } from "react";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ProjetServ from "../../../../services/Projet.service";
import { TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { toast } from "react-hot-toast";

function ApproveByAdmin({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [loading, setLoading] = useState(false);
  const [note, setnote] = useState(null);

  const ChoisirPfe = () => {
    if (note === null || note < 0 || note > 20) {
      toast.error("eneter un note valide entre 0 t 20");
      return 0;
    }
    ProjetServ.AdminValidateProject(value._id, { note })
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
      title={`Choisir PFE : ${value.title}`}
    >
      <DialogContent dividers data-test="modal">
        <Typography variant="h5" component="h1" align="center">
          Es-tu sûr de valider <strong>{value.title}</strong>
        </Typography>
        <TextField
          fullWidth
          className={styles.textField}
          label="Note"
          name="note"
          value={note}
          onChange={(e) => {
            setnote(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button
          autoFocus
          variant="contained"
          color="primary"
          onClick={ChoisirPfe}
          disabled={loading}
          data-test="Valider"
        >
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApproveByAdmin;

import React, { useContext, useEffect, useState } from "react";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ProfileService from "../../../services/Profile.service";
import { UserContext } from "../../../store/Contexts";

function EditStateAccount({ popup, handleClose, etat }) {
  const { open, value } = popup;

  const { user, setUser } = useContext(UserContext);

  const handleUpdateAccount = () => {
    try {
      ProfileService.UpdateStateAccount((res) => {
        setUser(res.data.data);
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Modifier Etat Compte  `}
    >
      <DialogContent dividers>
        <Typography variant="h6">
          Est-vous sûr de changer l'etat du compte en <b> {etat}</b> ?
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
          onClick={() => handleUpdateAccount()}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditStateAccount;

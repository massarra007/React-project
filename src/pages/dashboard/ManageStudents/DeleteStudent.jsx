import React, { useState } from "react";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import StudentServ from "../../../services/Student.service";

function Delete({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [loading, setLoading] = useState(false);

  const succ = () => {
    callback();
    handleClose();
    setLoading(false);
  };

  const fail = () => {
    setLoading(false);
  };

  const DeleteStudent = () => {
    StudentServ.DeleteStudent(value?._id, succ, fail);
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Supprimer :  ${value.firstName} ${value.lastName}`}
    >
      <DialogContent dividers data-test="modal">
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
          onClick={DeleteStudent}
          disabled={loading}
          data-test="delete"
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Delete;

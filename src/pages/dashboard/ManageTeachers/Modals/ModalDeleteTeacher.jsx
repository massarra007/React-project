import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import TeacherService from "../../../../services/TeacherService";
import { toast } from "react-hot-toast";

const course = ["Node", "Base de Donne", "React", "Math"];
function ModalDeleteTeacher({ popup, handleClose, handleDeleteTeacher }) {
  const { open, valueArray, valueRow } = popup;

  const handleSubmit = (e) => {
    e.preventDefault();
    TeacherService.DeleteTeacher(valueRow._id)
      .then(async (response) => {
        handleDeleteTeacher(valueRow._id);
        toast.success("Enseignant supprimer avec Succès.");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={"Supprimer Enseignant"}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <DialogContent dividers data-test="modal">
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              {" "}
              Êtes vous sûr de supprimer l'enseignant {valueRow.firstName}{" "}
              {valueRow.lastName} ?{" "}
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

export default ModalDeleteTeacher;

import React from "react";
import { Grid, Typography } from "@mui/material";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import OfferService from "../../../../services/Offre.service";
import { toast } from "react-hot-toast";

function ModalDeleteOffer({ open, handleClose, handleDeleteOffer, offer }) {
  if (!offer) {
    return null; // or render a loading state or handle the case when offer is null
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    OfferService.deleteOffer(
      offer._id,
      (data) => {
        //handle success
        handleDeleteOffer(offer._id);
        toast.success("Offre supprimée avec succès.");
        handleClose();
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  return (
    <Dialog open={open} handleClose={handleClose} title="Supprimer l'offre">
      <form onSubmit={handleSubmit} data-test="modal">
        <DialogContent dividers>
          <Grid container spacing={2} p={3}>
            <Typography variant="h6" fontWeight="bold">
              Êtes-vous sûr de vouloir supprimer l'offre : {offer.offerName} ?
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

export default ModalDeleteOffer;

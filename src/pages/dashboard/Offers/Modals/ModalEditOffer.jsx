import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import OfferService from "../../../../services/Offre.service";
import { toast } from "react-hot-toast";

const offerTypes = ["Conseil", "Offre", "Opportunité", "Offre d'emploi"];

function ModalEditOffer({ open, handleClose, handleEditOffer, offer }) {

  const [editedOffer, setEditedOffer] = useState({
    offerName: "",
    offerType: "",
    description: "",
    location: "",
  });

  useEffect(() => {
    setEditedOffer({
      offerName: offer.offerName,
      offerType: offer.offerType,
      description: offer.description,
      location: offer.location,
    });
  }, [offer]);

  const handleChange = (e) => {
    setEditedOffer({
      ...editedOffer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(editedOffer);
    e.preventDefault();
    OfferService.updateOffreService(offer._id, editedOffer,
      (res)=>{
        handleEditOffer(offer._id, editedOffer);
        toast.success("Offre mise à jour avec succès.");
        handleClose();
      },
      (error)=>{
        toast.error(error);

      })
  };

  return (
    <Dialog open={open} handleClose={handleClose} title="Modifier l'offre">
      <form onSubmit={handleSubmit} data-test="modal">
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nom de l'offre"
                required
                name="offerName"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={editedOffer.offerName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled" size="small">
                <InputLabel id="offer-type-label">Type d'offre</InputLabel>
                <Select
                  labelId="offer-type-label"
                  id="offer-type"
                  name="offerType"
                  value={editedOffer.offerType}
                  onChange={handleChange}
                  required
                >
                  {offerTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                required
                name="description"
                variant="filled"
                size="small"
                multiline
                rows={2}
                onChange={handleChange}
                value={editedOffer.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lieu"
                required
                name="location"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={editedOffer.location}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" onClick={handleClose}>
            Annuler
          </Button>
          <Button autoFocus variant="contained" type="submit" data-test="confirmUpdateButton">
            Mettre à jour
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalEditOffer;

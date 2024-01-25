import React, { useState } from "react";
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

function ModalAddOffer({ open, handleClose }) {
  
  const [offer, setOffer] = useState({
    offerName: "",
    offerType: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setOffer({ ...offer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(offer);
    OfferService.createOffreService(
      offer,
      (response) => {
        //success
        toast.success("Offre ajoutée avec succès.");
        handleClose();
      },
      (error) => {
        //fail
        toast.error(error);
      }
    );
  };

  return (
    <Dialog open={open} handleClose={handleClose} title="Nouvelle Offre">
      <form onSubmit={handleSubmit}>
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
                value={offer.offerName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled" size="small">
                <InputLabel id="offer-type-label">Type d'offre</InputLabel>
                <Select
                  labelId="offer-type-label"
                  id="offer-type"
                  name="offerType"
                  value={offer.offerType}
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
                onChange={handleChange}
                value={offer.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Emplacement"
                required
                name="location"
                variant="filled"
                size="small"
                onChange={handleChange}
                value={offer.location}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            Ajouter l'offre
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModalAddOffer;

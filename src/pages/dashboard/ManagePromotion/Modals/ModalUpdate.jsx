import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import PromotionService from "../../../../services/Promotion.service";
import { toast } from "react-hot-toast";
import { makeDate2 } from "../../../../functions/Dates.functions";

function ModalUpdate({ popup, handleClose }) {
  const { open, value } = popup;

  const [Saison, SetSaison] = useState({
    startDate: new Date("05-02-1999"),
    endDate: new Date("05-02-1999"),
  });
  const handleChange = (e) => {
    SetSaison({ ...Saison, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let temp = new Date(value.endDate);

    let temp2 = `${temp.getFullYear()}-${
      temp.getMonth() + 1
    }-${temp.getDate()}`;

    let temp3 = new Date(temp2);
    console.log(temp3);

    SetSaison({
      startDate: new Date(value.startDate),
      endDate: new Date(value.endDate),
    });
  }, [value]);

  const handleSubmit = () => {
    PromotionService.UpdatePromotion(value._id, Saison)
      .then((response) => {
        toast.success("Saison Ajouter avec Succès.");
        console.log(response);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.Message || "Saison déjà existe ");
      });
  };
  return (
    <Dialog open={open} handleClose={handleClose} title={"Nouveau Evénement"}>
      <DialogContent dividers data-test="modal">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Date Debut"
              type="date"
              required
              name="startDate"
              onChange={handleChange}
              value={makeDate2(Saison.startDate)}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Date Fin"
              type="date"
              name="endDate"
              onChange={handleChange}
              value={makeDate2(Saison.endDate)}
            />
          </Grid>
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
          data-test="buttonAddSaison"
          onClick={handleSubmit}
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalUpdate;

import React, { useEffect } from "react";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import { fDate } from "../../../functions/formatTime";

function ShowStudentModal({ popup, handleClose }) {
  const { open, value } = popup;

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Etudiant :  ${value.firstName} ${value.lastName}`}
    >
      <DialogContent dividers>
        <Grid className="shadow border  rounded  mb-4 p-3" container>
          <Grid item xs={4} md={4} lg={4} sx={{ padding: 1 }}>
            <img
              className="shadow-lg rounded border "
              src={value.profilImage}
              alt="imdage"
              style={{
                height: 150,
              }}
            />
          </Grid>
          <Grid item xs={7} md={7} lg={7} sx={{ padding: 1 }}>
            <table className="table table-hover ">
              <tbody style={{ fontSize: 13 }}>
                <tr>
                  <th>Nom</th>

                  <td>{value.firstName}</td>
                </tr>
                <tr>
                  <th scope="col">Prénom</th>

                  <td>{value.lastName}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Mail </th>

                  <td> {value.email}</td>
                </tr>
                <tr>
                  <th scope="col">Numéro De Télephone</th>
                  <td>{value.phoneNumber}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Date De Naissance</th>
                  <td>{fDate(value.birthDate)}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Classe</th>
                  <td>{value.classe}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Numéro Classe</th>
                  <td>{value.numero_classe}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Niveau</th>
                  <td>{value.niveau}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Promotion</th>
                  <td>{value.promotion}</td>
                </tr>{" "}
                <tr>
                  <th scope="col"> Etat Compte</th>
                  <td>{value.isPublic ? <> Publique</> : <> Privé </>} </td>
                </tr>{" "}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShowStudentModal;

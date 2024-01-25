import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import H1 from "../../../components/Texts/H1";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PromoServ from "../../../services/Promotion.service";

import { fDate } from "../../../functions/formatTime";

import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import ModalAddEvent from "./Modals/ModalAddSaison";
import ModalUpdate from "./Modals/ModalUpdate";

function ManagePromotion() {
  const [Promos, setPromos] = useState([]);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Promos,
  });

  const allowed_to_edit = (saison) => {
    const { startDate, endDate } = saison;
    let start = new Date(startDate).getTime();
    let end = new Date(endDate).getTime();
    let current = new Date().getTime();
    return start <= current && current <= end;
  };

  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Promos });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Promos });
    GetAllSaisons();
  };

  const GetAllSaisons = () => {
    const fail = () => {};
    PromoServ.GetAllPromotions(setPromos, fail);
  };

  useEffect(() => {
    GetAllSaisons();
  }, []);

  return (
    <div>
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={6} lg={6}>
            <H1>Gestion Des Saisons </H1>
          </Grid>
          <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
            <Button
              onClick={openAdd}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              data-test="addEventButton"
            >
              Ajouter Saison
            </Button>
          </Grid>
        </Grid>
      </div>
      <div>
        <TableContainer sx={{ marginTop: 5 }}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
            data-test="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Saison Univ</TableCell>
                <TableCell>Date De Début</TableCell>
                <TableCell>Date De Fin </TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Promos.map((item, index) => (
                <TableRow
                  hover
                  key={item._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell>
                    <> {index + 1}</>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{fDate(item.startDate)}</TableCell>
                  <TableCell>{fDate(item.endDate)}</TableCell>

                  <TableCell align="center">
                    {allowed_to_edit(item) ? (
                      <Tooltip title="Modifier">
                        <IconButton
                          onClick={() => openUpdate(item)}
                          data-test={`updateButton-${item.eventName}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {popup.type === "add" && (
        <ModalAddEvent popup={popup} handleClose={handleClose} />
      )}{" "}
      {popup.type === "update" && (
        <ModalUpdate
          popup={popup}
          handleClose={handleClose}
          handleEditEvent={() => {}}
        />
      )}
    </div>
  );
}

export default ManagePromotion;

import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import H1 from "../../../components/Texts/H1";
import Chip from "../../../components/Chip/Chip";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AdminService from "../../../services/AdminService";
import Stack from "@mui/material/Stack";
import { fDate } from "../../../functions/formatTime";
import Avatar from "@mui/material/Avatar";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModalAddAdmin from "./Modals/ModalAddAdmin";
import ModalEditAdmin from "./Modals/ModalEditAdmin";
import ModalDeleteAdmin from "./Modals/ModalDeleteAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";

function ManageAdmins() {
  const navigate = useNavigate();
  const [Admins, setAdmins] = useState([]);
  const [List, setList] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Admins,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Admins });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };
  const openShow = (row) => {
    setPopup({ open: true, type: "show", value: row });
  };

  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      valueRow: row,
      valueArray: Admins,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Admins });
  };

  useEffect(() => {
    AdminService.GetAllAdmins()
      .then((response) => {
        setAdmins(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDeleteAdmin = (_id) => {
    const filteredAdmins = Admins.filter((Admins) => Admins._id !== _id);
    setAdmins(filteredAdmins);
  };

  const handleEditAdmin = (_id, row) => {
    const index = Admins.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Admins[index] = { ...Admins[index], ...row };
    }
  };
  const handleNavigateDetail = (_id) => {
    navigate(`/dash/GestionDesEvenement/details/${_id}`);
  };
  return (
    <div>
      <div>
        <Grid container alignItems="center">
          <Grid item xs={6} md={6} lg={6}>
            <H1>Gestion Des Administrateurs </H1>
          </Grid>
          <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
            <Button
              onClick={openAdd}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              data-test="addadminButton"
            >
              Ajouter Administrateur
            </Button>
          </Grid>
          <Grid item xs={6} md={6} lg={6}></Grid>
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
                <TableCell padding="none">Nom</TableCell>
                <TableCell>Prenom</TableCell>
                <TableCell padding="none">Email</TableCell>
                <TableCell>N° Tel</TableCell>
                <TableCell padding="none">Date De Naissance</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell> Permissions</TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Admins &&
                Admins.map((item, index) => (
                  <TableRow
                    hover
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      {item.profilImage ? (
                        <Avatar src={item.profilImage} />
                      ) : (
                        <></>
                      )}
                    </TableCell>
                    <TableCell padding="none">{item.firstName}</TableCell>{" "}
                    <TableCell>{item.lastName} </TableCell>
                    <TableCell padding="none">{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell padding="none">
                      {fDate(item.birthDate)}
                    </TableCell>
                    <TableCell>{item.sex}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {item.permessions.map((a) => (
                          <Chip label={a} color="success" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Modifier">
                        <IconButton
                          onClick={() => openUpdate(item)}
                          data-test={`updateButton-${item.phoneNumber}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Supprimer">
                        <IconButton
                          onClick={() => openDelete(item)}
                          data-test={`deleteButton-${item.phoneNumber}`}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {popup.type === "add" && (
        <ModalAddAdmin popup={popup} handleClose={handleClose} />
      )}{" "}
      {popup.type === "update" && (
        <ModalEditAdmin
          popup={popup}
          handleClose={handleClose}
          handleEditAdmin={handleEditAdmin}
        />
      )}
      {popup.type === "delete" && (
        <ModalDeleteAdmin
          popup={popup}
          handleClose={handleClose}
          handleDeleteAdmin={handleDeleteAdmin}
        />
      )}
    </div>
  );
}

export default ManageAdmins;

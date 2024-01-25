import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

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
import Avatar from "@mui/material/Avatar";

import TeacherService from "../../../services/TeacherService";

import { isALUMINIE } from "../../../custom/roles";

import { fDate } from "../../../functions/formatTime";
import { roles } from "../../../custom/roles";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

import ModalAddTeacher from "./Modals/ModalAddTeacher";
import ModalEditTeacher from "./Modals/ModalEditTeacher";
import ModalDeleteTeacher from "./Modals/ModalDeleteTeacher";

function ManageTeachers() {
  const [Teachers, setTeachers] = useState([]);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Teachers,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Teachers });
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
      valueArray: Teachers,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Teachers });
  };

  useEffect(() => {
    TeacherService.GetAllTeachers()
      .then((response) => {
        setTeachers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDeleteTeacher = (_id) => {
    const filteredTeachers = Teachers.filter(
      (Teachers) => Teachers._id !== _id
    );
    setTeachers(filteredTeachers);
  };

  const handleEditTeacher = (_id, row) => {
    const index = Teachers.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Teachers[index] = { ...Teachers[index], ...row };
    }
  };
  return (
    <div>
      <div className={styles.head}>
        <Grid container alignItems="center">
          <Grid item xs={6} md={6} lg={6}>
            <H1>Gestion Des Enseignant</H1>
          </Grid>
          <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
            <Button
              onClick={openAdd}
              startIcon={<PersonAddAlt1Icon />}
              variant="contained"
              data-test="addTeacherButton"
            >
              Ajouter Enseignant
            </Button>
          </Grid>
        </Grid>
      </div>

      <div>
        <TableContainer sx={{ marginTop: 5 }}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table"
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
                <TableCell>Cours</TableCell>
                <TableCell> Responsable</TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Teachers &&
                Teachers.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    <TableCell>
                      {item.course.map((a) => (
                        <span> {a},</span>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.role === roles.RESPONSIBLE ? (
                        <Chip
                          label="Oui"
                          color="primary"
                          className={styles.chip}
                        />
                      ) : (
                        <Chip
                          label="Non"
                          color="warning"
                          className={styles.chip}
                        />
                      )}
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
        <ModalAddTeacher popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <ModalEditTeacher
          popup={popup}
          handleClose={handleClose}
          handleEditTeacher={handleEditTeacher}
        />
      )}
      {popup.type === "delete" && (
        <ModalDeleteTeacher
          popup={popup}
          handleDeleteTeacher={handleDeleteTeacher}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}

export default ManageTeachers;

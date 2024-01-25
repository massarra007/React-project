import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import H1 from "../../../components/Texts/H1";
import Chip from "../../../components/Chip/Chip";
import Avatar from "../../../components/Avatar/Avatar";

import StudentServ from "../../../services/Student.service";
import {
  isALUMINIE,
  isADMIN,
  isSUPERADMIN,
  isTEACHER,
} from "../../../custom/roles";
import { UserContext } from "../../../store/Contexts";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";

import AddStudent from "./AddStudent";
import UpdateStudent from "./UpdateStudent";
import DeleteStudent from "./DeleteStudent";

import { makeDate } from "../../../functions/Dates.functions";
import AddMultipleStudent from "./AddMultipleStudent";
import ShowStudent from "./ShowStudentModal";
import ArticleIcon from "@mui/icons-material/Article";
import { useNavigate } from "react-router-dom";

const init_student = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: new Date(),
  sex: "MEN",
  classe: "",
  niveau: "",
  numero_classe: "",
  promotion: "",
};

const concact_class = (item) => {
  const { niveau, classe, numero_classe } = item;
  if (niveau && classe && numero_classe) {
    return `${niveau} ${classe} ${numero_classe}`;
  } else {
    return "Not Defined";
  }
};

const isDiplomated = (item) => {
  const { diplome } = item;
  return diplome.length > 0 && diplome !== "None" ? (
    <Chip label="Diplômé " color="primary" className={styles.chip} />
  ) : (
    <Chip label="non Diplômé " color="error" className={styles.chip} />
  );
};

const isAluminie = (item) => {
  const { diplome } = item;
  return isALUMINIE(item) > 0 ? (
    <Chip label="Aluminie" color="success" className={styles.chip} />
  ) : (
    <Chip label="Etudiant" color="primary" className={styles.chip} />
  );
};

function ManageStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const { user } = useContext(UserContext);

  const GetData = () => {
    StudentServ.GetAllStudents(
      (data) => {
        setStudents(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: init_student,
    callback: GetData,
  });

  const openPopup = (type, data) => {
    console.log(data);
    setPopup({ ...popup, open: true, type: type, value: data });
  };

  const handleClose = () => {
    setPopup({ ...popup, open: false, type: "", value: init_student });
  };

  useEffect(() => {
    GetData();
  }, []);
  const handleNavigateDetail = (_id) => {
    navigate(`/dash/gest_students/cv/${_id}`);
  };
  return (
    <div>
      <div className={styles.head}>
        <H1>Gestion Des Etudiants</H1>
        {(isADMIN(user) || isSUPERADMIN(user)) && (
          <Grid xs={6} md={6} lg={6} container justifyContent="flex-end">
            <Button
              onClick={() => {
                openPopup("add", init_student);
              }}
              startIcon={<PersonAddAlt1Icon />}
              variant="contained"
              data-test="addStudentButton"
            >
              Ajouter Etudiant
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              onClick={() => {
                openPopup("addMultiple", init_student);
              }}
              startIcon={<PersonAddAlt1Icon />}
              variant="contained"
            >
              Ajouter Multiple
            </Button>
          </Grid>
        )}
      </div>

      <div className={styles.body}>
        <TableContainer sx={{ marginTop: 5 }}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            aria-label="a dense table"
            data-test="table"
          >
            <TableHead>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Etudiant</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Naissance</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Diplômé</TableCell>
                <TableCell>Est Aluminie</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <Avatar name={`${row.firstName} ${row.lastName} `} />
                  </TableCell>
                  <TableCell>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{makeDate(row.birthDate)}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{concact_class(row)}</TableCell>
                  <TableCell>{isDiplomated(row)}</TableCell>
                  <TableCell>{isAluminie(row)}</TableCell>
                  <TableCell align="center">
                    <VisibilityIcon
                      className={styles.action_icon}
                      onClick={() => {
                        openPopup("show", row);
                      }}
                    />
                    {isTEACHER(user) && (
                      <ArticleIcon
                        data-test={`cvButton-${row.email}`}
                        className={styles.action_icon}
                        onClick={() => {
                          handleNavigateDetail(row._id);
                        }}
                      />
                    )}
                    {(isADMIN(user) || isSUPERADMIN(user)) && (
                      <>
                        <EditIcon
                          className={styles.action_icon}
                          onClick={() => openPopup("update", row)}
                        />
                        <DeleteIcon
                          className={styles.action_icon}
                          onClick={() => openPopup("delete", row)}
                          data-test={`btn-delete-${row.phoneNumber}`}
                        />
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {popup.type === "add" && (
        <AddStudent popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "addMultiple" && (
        <AddMultipleStudent popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <UpdateStudent popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "show" && (
        <ShowStudent popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "delete" && (
        <DeleteStudent popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default ManageStudents;

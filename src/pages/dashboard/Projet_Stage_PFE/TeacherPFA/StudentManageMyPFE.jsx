import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Button from "@mui/material/Button";
import BookIcon from "@mui/icons-material/Book";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import H1 from "../../../../components/Texts/H1";
import Chip from "../../../../components/Chip/Chip";
import Avatar from "../../../../components/Avatar/Avatar";

import ProjetServ from "../../../../services/Projet.service";
import { UserContext } from "../../../../store/Contexts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddPFA from "./AddPFA";
import UpdatePFA from "./UpdatePFA";
import DeletePFA from "./DeletePFA";
import ShowMyPFA from "./ShowMyPFA";

const init_project = {
  _id: "",
  title: "",
  description: "",
  student: { firstName: "", lastName: "" },
  technologies: [""],
  promotion: "",
};

const MakeAvatarProj = ({ title = "" }) => {
  const [first, second] = title.split(" ");
  return <Avatar variant="rounded" name={`${first} ${second} `} />;
};

const MakeStudent = ({ student }) => {
  if (student) {
    const { firstName, lastName } = student[0];
    return (
      <span>
        {firstName} {lastName}
      </span>
    );
  } else {
    return <Chip label="pas encore" color="warning" className={styles.chip} />;
  }
};

//valide
const MakeState = ({ project_life_cycle = "Pending_Validation" }) => {
  switch (project_life_cycle) {
    case "Pending_Accept_By_Resp":
      return (
        <Chip
          label="Attend Responsable"
          color="error"
          className={styles.chip}
        />
      );
    case "Pending_Validation":
      return (
        <Chip
          label="Attend Validation"
          color="warning"
          className={styles.chip}
        />
      );
    case "Validated":
      return <Chip label="Validée" color="success" className={styles.chip} />;
    default:
      return (
        <Chip
          label="Attend Responsable"
          color="error"
          className={styles.chip}
        />
      );
  }
};

function StudentManageMyPFE() {
  const [projects, setprojects] = useState([]);
  const { user } = useContext(UserContext);

  const GetData = () => {
    ProjetServ.GetMyPfa()
      .then((resp) => {
        setprojects(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: init_project,
    callback: GetData,
  });

  const openPopup = (type, data) => {
    console.log(data);
    setPopup({ ...popup, open: true, type: type, value: data });
  };

  const handleClose = () => {
    setPopup({ ...popup, open: false, type: "", value: init_project });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <div className={styles.head}>
        <H1>Mes PFAs</H1>
        <Button
          onClick={() => {
            openPopup("add", init_project);
          }}
          startIcon={<BookIcon />}
          variant="contained"
          data-test="addpfaButton"
        >
          Ajouter PFA
        </Button>
      </div>
      <div className={styles.body}>
        <Table sx={{ minWidth: 1000 }} data-test="table">
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>Promotion</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Technologies</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <MakeAvatarProj title={row.title} />
                </TableCell>

                <TableCell style={{ maxWidth: "150px" }}>{row.title}</TableCell>

                <TableCell>
                  <MakeStudent student={row.students} />
                </TableCell>

                <TableCell>{row.promotion}</TableCell>

                <TableCell>
                  <MakeState project_life_cycle={row.project_life_cycle} />
                </TableCell>

                <TableCell>
                  <div>{row.technologies.join(", ")}</div>
                </TableCell>

                <TableCell>
                  <div>{row.description}</div>
                </TableCell>

                <TableCell align="center">
                  <VisibilityIcon
                    className={styles.action_icon}
                    onClick={() => openPopup("show", row)}
                    data-test="showpfaButton"
                  />
                  <>
                    <EditIcon
                      className={styles.action_icon}
                      onClick={() => openPopup("update", row)}
                      data-test="updatepfaButton"
                    />
                    <DeleteIcon
                      className={styles.action_icon}
                      onClick={() => openPopup("delete", row)}
                      data-test="deletepfaButton"
                    />
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {popup.type === "add" && (
        <AddPFA popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <UpdatePFA popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "show" && (
        <ShowMyPFA popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "delete" && (
        <DeletePFA popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default StudentManageMyPFE;

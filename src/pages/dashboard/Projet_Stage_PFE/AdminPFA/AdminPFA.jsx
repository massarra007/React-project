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
import Select from "../../../../components/Inputs/Select";

import ProjetServ from "../../../../services/Projet.service";
import { UserContext } from "../../../../store/Contexts";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ShowMyPFA from "./ShowMyPFA";

const init_project = {
  _id: "",
  title: "",
  description: "",
  encadrant: { firstName: "", lastName: "" },
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

function AdminPFA() {
  const [projects, setprojects] = useState([]);
  const { user } = useContext(UserContext);

  const GetData = () => {
    ProjetServ.GetPFAAdmin()
      .then((resp) => {
        setprojects(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);
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

  return (
    <div>
      <div className={styles.head}>
        <H1>Liste des projets de fin d'année</H1>
      </div>

      <div className={styles.body}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>encadrant</TableCell>
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
                <TableCell>
                  {row.encadrant.firstName} {row.encadrant.lastName}
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
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {popup.type === "show" && (
        <ShowMyPFA popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default AdminPFA;

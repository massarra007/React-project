import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Button from "@mui/material/Button";
import BookIcon from "@mui/icons-material/Book";
import TextField from "@mui/material/TextField";
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

import AddStage from "./AddStage";
import UpdateStage from "./UpdateStage";
import DeleteStage from "./DeleteStage";
import ShowMyStage from "./ShowMyStage";

const init_project = {
  _id: "",
  title: "",
  description: "",
  encadrant: { firstName: "", lastName: "" },
  technologies: [""],
  societe: "",
  type: "STAGE",
  promotion: "",
  startDate: new Date(),
  endDate: new Date(),
};

const MakeAvatarProj = ({ title = "" }) => {
  const [first, second] = title.split(" ");
  return <Avatar variant="rounded" name={`${first} ${second} `} />;
};

const MakeNote = ({ projet }) => {
  const { project_life_cycle, note } = projet;
  if (project_life_cycle !== "Validated") {
    return <Chip label="pad encore" color="warning" className={styles.chip} />;
  } else {
    return <span>{note}</span>;
  }
};

const MakeMontion = ({ projet }) => {
  const { project_life_cycle, mention } = projet;
  if (project_life_cycle !== "Validated") {
    return <Chip label="pad encore" color="warning" className={styles.chip} />;
  } else {
    return <span>{mention}</span>;
  }
};

const MakeState = ({ project_life_cycle = "Pending_Validation" }) => {
  switch (project_life_cycle) {
    case "Pending_Teacher":
      return (
        <Chip label="Attend Enseignant" color="error" className={styles.chip} />
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
        <Chip label="Attend Enseignant" color="error" className={styles.chip} />
      );
  }
};

function StudentManageMyStage() {
  const [projects, setprojects] = useState([]);
  const { user } = useContext(UserContext);

  const GetData = () => {
    ProjetServ.GetMyStages()
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
        <H1>Mes Stages</H1>
        <Button
          onClick={() => {
            openPopup("add", init_project);
          }}
          startIcon={<BookIcon />}
          variant="contained"
        >
          Ajouter Stage
        </Button>
      </div>
      <div className={styles.body}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Promotion</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Mention</TableCell>
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

                <TableCell>{row.promotion}</TableCell>

                <TableCell>
                  <MakeState project_life_cycle={row.project_life_cycle} />
                </TableCell>

                <TableCell>
                  <MakeNote projet={row} />
                </TableCell>

                <TableCell>
                  <MakeMontion projet={row} />
                </TableCell>

                <TableCell align="center">
                  <VisibilityIcon
                    className={styles.action_icon}
                    onClick={() => openPopup("show", row)}
                  />
                  <>
                    <EditIcon
                      className={styles.action_icon}
                      onClick={() => openPopup("update", row)}
                    />
                    <DeleteIcon
                      className={styles.action_icon}
                      onClick={() => openPopup("delete", row)}
                    />
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {popup.type === "add" && (
        <AddStage popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <UpdateStage popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "show" && (
        <ShowMyStage popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "delete" && (
        <DeleteStage popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default StudentManageMyStage;

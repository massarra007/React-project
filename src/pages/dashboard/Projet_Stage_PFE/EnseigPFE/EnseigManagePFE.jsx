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

import ChoisirPFE from "./ApproveByEnsg";
import ShowMyPFE from "./ShowMyPFE";

const init_project = {
  _id: "",
  title: "",
  description: "",
  encadrant: { firstName: "", lastName: "" },
  technologies: [""],
  societe: "",
  type: "PFE",
  promotion: "",
  startDate: new Date(),
  endDate: new Date(),
};

const MakeAvatarProj = ({ title = "" }) => {
  const [first, second] = title.split(" ");
  return <Avatar variant="rounded" name={`${first} ${second} `} />;
};

const MakeEncadrent = ({ encadrant }) => {
  if (encadrant) {
    const { firstName, lastName } = encadrant;
    return (
      <span>
        {firstName} {lastName}
      </span>
    );
  } else {
    return <Chip label="pad encore" color="warning" className={styles.chip} />;
  }
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

function EnseigManagePFE() {
  const [projects, setprojects] = useState([]);
  const { user } = useContext(UserContext);
  const [FilterEncad, setFilterEncad] = useState("None");

  const GetData = () => {
    let query = { type: "PFE" };
    if (FilterEncad && FilterEncad !== "None") {
      query = { ...query, encadrant: FilterEncad };
    }
    ProjetServ.GetEverything({ ...query })
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

  const handle_change = (event) => {
    const { value } = event.target;
    setFilterEncad(value);
  };

  useEffect(() => {
    GetData();
  }, [FilterEncad]);

  return (
    <div>
      <div className={styles.head}>
        <H1>Liste des projets de fin d'études</H1>
      </div>
      <div className={styles.filterEncad}>
        <Select
          className={styles.textField}
          value={FilterEncad}
          label="Filtrer Tout PFE / Mes PFE"
          onChange={handle_change}
          items={[
            {
              name: "Mes PFEs",
              value: user._id,
            },
            {
              name: "Tout PFEs",
              value: "None",
            },
          ]}
        />
      </div>
      <div className={styles.body}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Encadrent</TableCell>
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

                <TableCell>
                  <MakeEncadrent encadrant={row.encadrant} />
                </TableCell>

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
                  {!row.encadrant && (
                    <CheckCircleIcon
                      className={styles.action_icon}
                      onClick={() => openPopup("choisir", row)}
                      data-test={`btn-choose-${row.title
                        .toLocaleLowerCase()
                        .split(" ")
                        .join("-")}`}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {popup.type === "show" && (
        <ShowMyPFE popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "choisir" && (
        <ChoisirPFE popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default EnseigManagePFE;

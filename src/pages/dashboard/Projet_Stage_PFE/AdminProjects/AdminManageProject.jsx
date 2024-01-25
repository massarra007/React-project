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
import PromoServ from "../../../../services/Promotion.service";
import { UserContext } from "../../../../store/Contexts";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import ApproveByAdmin from "./ApproveByAdmin";
import ShowMyPFE from "./ShowPFE";
import { EleminateNull } from "../../../../functions/MakeQuery";
import { Grid } from "@mui/material";

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

const MakeEncadrent = ({ encadrant, state }) => {
  if (encadrant) {
    const { firstName, lastName } = encadrant;
    return (
      <span>
        {firstName} {lastName}
      </span>
    );
  }
  if (state === "Pending_Validation") {
    return <span>----------------------</span>;
  }
  return <Chip label="pas encore" color="warning" className={styles.chip} />;
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

const MakeType = ({ projet }) => {
  const { type } = projet;
  if (type === "PFE") {
    return <Chip label="PFE" color="secondary" className={styles.chip} />;
  } else {
    return <Chip label="STAGE" color="primary" className={styles.chip} />;
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

function AdminManageProject() {
  const [projects, setprojects] = useState([]);
  const { user } = useContext(UserContext);
  const [Filter, setFilter] = useState({
    type: "None",
    promotion: "None",
    project_life_cycle: "None",
  });
  const [promos, setPromos] = useState([]);

  const GetData = () => {
    const query = EleminateNull(Filter);
    console.log(query);
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
    const { value, name } = event.target;
    setFilter({ ...Filter, [name]: value });
  };

  useEffect(() => {
    GetData();
  }, [Filter]);

  useEffect(() => {
    const fail = () => {};
    PromoServ.GetAllPromotions(setPromos, fail);
  }, []);

  return (
    <div>
      <div className={styles.head}>
        <H1>Liste des projets PFE/Stage</H1>
      </div>
      <div className={styles.filter}>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Select
              className={styles.textField}
              value={Filter.type}
              name="type"
              label="PFE/STAGE"
              onChange={handle_change}
              items={[
                {
                  name: "Tout les projet",
                  value: "None",
                },
                {
                  name: "Tout les pfes",
                  value: "PFE",
                },
                {
                  name: "Tout les stages",
                  value: "STAGE",
                },
              ]}
            />
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Select
              className={styles.textField}
              value={Filter.promotion}
              label="Promotion"
              name="promotion"
              onChange={handle_change}
              items={[
                {
                  name: "Tout Les Promotions",
                  value: "None",
                },
                ...promos.map((prom) => ({
                  name: prom.title,
                  value: prom.title,
                })),
              ]}
            />
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
            <Select
              className={styles.textField}
              value={Filter.project_life_cycle}
              name="project_life_cycle"
              label="State"
              onChange={handle_change}
              items={[
                {
                  name: "Tout les states",
                  value: "None",
                },
                {
                  name: "Attend Enseig",
                  value: "Pending_Teacher",
                },
                {
                  name: "Attend Validation",
                  value: "Pending_Validation",
                },
                {
                  name: "Validée",
                  value: "Validated",
                },
              ]}
            />
          </Grid>
        </Grid>
      </div>
      <div className={styles.body}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell>Projet</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Encadrent</TableCell>
              <TableCell>Promotion</TableCell>
              <TableCell>State</TableCell>
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
                  <MakeType projet={row} />
                </TableCell>

                <TableCell>
                  <MakeEncadrent
                    encadrant={row.encadrant}
                    state={row.project_life_cycle}
                  />
                </TableCell>

                <TableCell>{row.promotion}</TableCell>

                <TableCell>
                  <MakeState project_life_cycle={row.project_life_cycle} />
                </TableCell>

                <TableCell>
                  <MakeNote projet={row} />
                </TableCell>

                <TableCell align="center">
                  <VisibilityIcon
                    className={styles.action_icon}
                    onClick={() => openPopup("show", row)}
                  />
                  {row.project_life_cycle === "Pending_Validation" && (
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
        <ApproveByAdmin popup={popup} handleClose={handleClose} />
      )}
    </div>
  );
}

export default AdminManageProject;

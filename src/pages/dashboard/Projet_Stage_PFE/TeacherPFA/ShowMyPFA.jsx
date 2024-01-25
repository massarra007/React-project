import React from "react";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Avatar from "../../../../components/Avatar/Avatar";
import styles from "./styles.module.scss";
import Chip from "../../../../components/Chip/Chip";
import { makeDate } from "../../../../functions/Dates.functions";

const MakeAvatarProj = ({ title = "" }) => {
  const [first, second] = title.split(" ");
  return <Avatar variant="rounded" name={`${first} ${second} `} />;
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

const MakeStudent = ({ student }) => {
  if (student) {
    const { firstName, lastName } = student;
    return (
      <span>
        {firstName} {lastName}
      </span>
    );
  } else {
    return <Chip label="pas encore" color="warning" className={styles.chip} />;
  }
};
function ShowMyPFA({ popup, handleClose }) {
  const { open, value } = popup;

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`PFA :  ${value.title}`}
    >
      <DialogContent dividers data-test="show">
        <div className={styles.show}>
          <div className={styles.part1}>
            <div className={styles.avatar}>
              <MakeAvatarProj title={value.title} />
            </div>
            <h3>{value.title}</h3>
          </div>

          {value.students?.length > 0 && (
            <div className={styles.part1}>
              <h2>
                Etudiant :{" "}
                <a href={`/cv/${value.students[0]._id}`} target="_blank">
                  {value.students[0].firstName} {value.students[0].lastName}
                </a>
              </h2>
            </div>
          )}

          <div className={styles.part2}>
            <h4>Promotion : </h4>
            <h5>{value.promotion}</h5>
          </div>

          <div className={styles.part2}>
            <h4>Etat du projet : </h4>
            <h5>
              <MakeState project_life_cycle={value.project_life_cycle} />
            </h5>
          </div>

          <div className={styles.part2}>
            <h4>Student : </h4>
            <h5>
              <MakeStudent student={value.student} />
            </h5>
          </div>

          <div className={styles.part2}>
            <h4>Description : </h4>
            <h5>{value.description}</h5>
          </div>

          <div className={styles.part2}>
            <h4>Les Technologies : </h4>
            <h5>{value.technologies.join(" , ")}</h5>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          onClick={handleClose}
          data-test="showbutton"
        >
          Quitter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ShowMyPFA;

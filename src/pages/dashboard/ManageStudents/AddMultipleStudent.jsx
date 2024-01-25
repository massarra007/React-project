import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import styles from "./styles.module.scss";
import Typography from "@mui/material/Typography";
import StudentServ from "../../../services/Student.service";

const fileTypes = ["xlsx"];
function AddMultipleStudent({ popup, handleClose }) {
  const { open, value, callback } = popup;

  const [loading, setLoading] = useState(false);

  const [File, setFile] = useState(null);

  const handleChangeImage = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {}, []);

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", File);
    console.log(File);

    const succ = () => {
      callback();
      handleClose();
      setLoading(false);
    };
    const fail = () => {
      setLoading(false);
    };
    StudentServ.CreateMultipleStudent(formData, succ, fail);
  };
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={" Ajouter multiple Etudiants"}
      width="md"
    >
      <DialogContent dividers>
        <div className={styles.card}></div>

        <Box sx={{ marginLeft: 2 }}>
          <input
            accept=".xls, .xlsx"
            id="upload-button"
            type="file"
            style={{ display: "none" }}
            onChange={handleChangeImage}
          />
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Importer le ficihier ici
            </Button>
          </label>
          {File && (
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {File.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMultipleStudent;

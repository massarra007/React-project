import React, { useEffect, useState } from "react";

import Dialog from "../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "../../../components/Inputs/Select";

import PromoServ from "../../../services/Promotion.service";
import StudentServ from "../../../services/Student.service";
import json_classes from "../../../assets/json/classes.json";
import { makeDate2 } from "../../../functions/Dates.functions";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import SchoolIcon from "@mui/icons-material/School";

function UpdateParent(props) {
  const { popup, handleClose } = props;
  const { open, value } = popup;
  const [index, setIndex] = useState(0);

  const updates = [
    {
      title: "Modifier Info",
      icon: <ContactEmergencyIcon />,
      Compo: <UpdateInfos {...props} />,
    },
    {
      title: "Diplome",
      icon: <SchoolIcon />,
      Compo: <UpdateDeplome {...props} />,
    },
  ];

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Modifier  :  ${value.firstName} ${value.lastName}`}
      width="md"
    >
      <BottomNavigation
        showLabels
        value={index}
        onChange={(_, newValue) => {
          setIndex(newValue);
        }}
      >
        {updates.map((upd, key) => {
          return (
            <BottomNavigationAction
              key={key}
              label={upd.title}
              icon={upd.icon}
            />
          );
        })}
      </BottomNavigation>
      {updates[index].Compo}
    </Dialog>
  );
}

function UpdateInfos({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [promos, setPromos] = useState([]);
  const [classes, setClasses] = useState([...json_classes]);
  const [levels, setLevels] = useState([]);
  const [nums, setNums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ ...value });

  const handle_change = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    const fail = () => {};
    PromoServ.GetAllPromotions(setPromos, fail);
  }, []);

  useEffect(() => {
    const niveaux = classes.find((cs) => cs.name === form.classe)?.niveau || [];
    setLevels([...niveaux]);
  }, [form.classe]);

  useEffect(() => {
    const nums =
      levels.find((lv) => lv.value === Number(form.niveau))?.classes || [];
    setNums([...nums]);
  }, [form.niveau, levels]);

  const handleSubmit = () => {
    setLoading(true);
    const succ = () => {
      callback();
      handleClose();
      setLoading(false);
    };
    const fail = () => {
      setLoading(false);
    };
    StudentServ.UpdateStudent(form, succ, fail);
  };

  return (
    <>
      <DialogContent dividers>
        <div className={styles.card}>
          <Typography variant="h5" component="h1">
            Informations Générales
          </Typography>
          <Grid container spacing={1}>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Nom"
                name="firstName"
                value={form.firstName}
                onChange={handle_change}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Prenom"
                name="lastName"
                value={form.lastName}
                onChange={handle_change}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="number"
                className={styles.textField}
                label="numéro de téléphone"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handle_change}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="email"
                className={styles.textField}
                label="E-mail"
                name="email"
                value={form.email}
                onChange={handle_change}
              />
            </Grid>

            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="date"
                className={styles.textField}
                label="Date de naissance"
                name="birthDate"
                value={makeDate2(form.birthDate)}
                onChange={handle_change}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <Select
                className={styles.textField}
                value={form.sex}
                label="Genre"
                name="sex"
                onChange={handle_change}
                items={[
                  { name: "Masculin", value: "MEN" },
                  { name: "Féminin", value: "WOMEN" },
                ]}
              />
            </Grid>
          </Grid>
          <br />
          <Typography variant="h5" component="h1">
            Informations Spécifique
          </Typography>
          <Grid container spacing={1}>
            <Grid item xl={3} lg={3} md={6}>
              <Select
                className={styles.textField}
                value={form.promotion}
                label="Promotion"
                name="promotion"
                onChange={handle_change}
                items={promos.map((prom) => ({
                  name: prom.title,
                  value: prom._id,
                }))}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6}>
              <Select
                className={styles.textField}
                value={form.classe}
                label="Classe"
                name="classe"
                onChange={handle_change}
                items={classes.map((cls) => ({
                  name: cls.name,
                  value: cls.name,
                }))}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6}>
              <Select
                className={styles.textField}
                value={form.niveau}
                label="Niveau"
                name="niveau"
                onChange={handle_change}
                items={levels.map((level) => ({
                  name: level.value === 1 ? "1-ére" : `${level.value}-éme`,
                  value: level.value,
                }))}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={6}>
              <Select
                className={styles.textField}
                value={form.numero_classe}
                label="Numero de Classe"
                name="numero_classe"
                onChange={handle_change}
                items={nums.map((num) => ({
                  name: num,
                  value: num,
                }))}
              />
            </Grid>
          </Grid>
        </div>
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
          Modifier
        </Button>
      </DialogActions>
    </>
  );
}

function UpdateDeplome({ popup, handleClose }) {
  const { value, callback } = popup;
  const [loading, setLoading] = useState(false);
  const [diplomes, setDiplomes] = useState([]);
  const [form, setForm] = useState({ ...value });

  useEffect(() => {
    setDiplomes([
      { name: "None", value: "None" },
      ...json_classes.map((clas) => ({
        name: clas.diplome,
        value: clas.diplome,
      })),
    ]);
  }, []);

  const handle_change = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const succ = () => {
      callback();
      handleClose();
      setLoading(false);
    };
    const fail = () => {
      setLoading(false);
    };
    StudentServ.UpdateDiplome(form, succ, fail);
  };

  return (
    <>
      <DialogContent dividers>
        <div className={styles.card}>
          <Grid container spacing={1}>
            <Grid item xl={12} lg={12} md={12}>
              <TextField
                fullWidth
                type="date"
                className={styles.textField}
                label="Date d'obtention de la diplome"
                name="diplomeDate"
                value={makeDate2(form.diplomeDate)}
                onChange={handle_change}
              />
            </Grid>
            <Grid item xl={12} lg={12} md={12}>
              <Select
                className={styles.textField}
                value={form.diplome}
                label="Diplome Libelle"
                name="diplome"
                onChange={handle_change}
                items={diplomes}
              />
            </Grid>
          </Grid>
        </div>
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
          Modifier
        </Button>
      </DialogActions>
    </>
  );
}

export default UpdateParent;

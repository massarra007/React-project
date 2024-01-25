import React, { useEffect, useState } from "react";

import Dialog from "../../../../components/Popup/Popup";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Select from "../../../../components/Inputs/Select";

import PromoServ from "../../../../services/Promotion.service";
import ProjetServ from "../../../../services/Projet.service";
import TechloServ from "../../../../services/technologies.service";
import { makeDate2 } from "../../../../functions/Dates.functions";
import { toast } from "react-hot-toast";
import { Autocomplete } from "@mui/material";

function AddPFE({ popup, handleClose }) {
  const { open, value, callback } = popup;
  const [promos, setPromos] = useState([]);
  const [techs, setTechs] = useState([]);
  const [societes, setSocietes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [],
    societe: "",
    type: "PFE",
    pays: "",
    promotion: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const handle_change = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setForm({ ...form, [name]: value });
  };

  const handle_add_tech = () => {
    setForm({ ...form, technologies: [...form.technologies, ""] });
  };

  const handle_del_tech = (index) => {
    const new_techs = [...form.technologies];
    new_techs.splice(index, 1);

    setForm({ ...form, technologies: new_techs });
  };

  const handle_change_tech = (index, value) => {
    const new_techs = [...form.technologies];
    new_techs[index] = value;

    setForm({ ...form, technologies: new_techs });
  };

  useEffect(() => {
    const fail = () => {};
    PromoServ.GetAllPromotions(setPromos, fail);
    TechloServ.GetTechs()
      .then((resp) => setTechs(resp.data.data))
      .catch(() => {
        console.log("error");
      });

    ProjetServ.GetSocietes()
      .then((resp) => {
        setSocietes(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    ProjetServ.AddProject(form)
      .then((resp) => {
        console.log(resp);
        callback();
        handleClose();
        setLoading(false);
        toast.success("PFE created successfully");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.Message);
      });
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={"Ajouter un nouvel PFE"}
      width="md"
    >
      <DialogContent dividers data-test="modal">
        <div className={styles.card}>
          <Typography variant="h5" component="h1">
            Informations Générales
          </Typography>
          <Grid container spacing={1}>
            <Grid item xl={12} lg={12} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Titre"
                name="title"
                value={form.title}
                onChange={handle_change}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12}>
              <Autocomplete
                freeSolo
                options={societes.map((option) => option)}
                onChange={(event, newValue) => {
                  handle_change({
                    target: { name: "societe", value: newValue },
                  });
                }}
                value={form.societe}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Societe"
                    name="societe"
                    className={styles.textField}
                    onChange={handle_change}
                    value={form.societe}
                  />
                )}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12}>
              <TextField
                fullWidth
                className={styles.textField}
                label="Pays"
                name="pays"
                value={form.pays}
                onChange={handle_change}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12}>
              <Select
                className={styles.textField}
                value={form.promotion}
                label="Promotion"
                name="promotion"
                dataTest="promotion"
                onChange={handle_change}
                items={promos.map((prom) => ({
                  name: prom.title,
                  value: prom.title,
                }))}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="date"
                className={styles.textField}
                label="Date de debut"
                name="startDate"
                value={makeDate2(form.startDate)}
                onChange={handle_change}
              />
            </Grid>
            <Grid item xl={6} lg={6} md={12}>
              <TextField
                fullWidth
                type="date"
                className={styles.textField}
                label="Date de fin"
                name="endDate"
                value={makeDate2(form.endDate)}
                onChange={handle_change}
              />
            </Grid>

            <Grid item xl={12} lg={12} md={12}>
              <TextField
                fullWidth
                type="text"
                className={styles.textField}
                label="Description"
                name="description"
                value={form.description}
                data-test="description"
                onChange={handle_change}
                multiline
                rows={4}
              />
            </Grid>

            {form.technologies.map((value, key) => {
              return (
                <Grid key={key} item xl={4} lg={4} md={12}>
                  <Grid container spacing={1}>
                    <Grid item xl={9} lg={9} md={9}>
                      <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={techs.map((option) => option.title)}
                        onChange={(event, newValue) => {
                          handle_change_tech(key, newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={`Technology N° ${key + 1}`}
                            className={styles.textField}
                            onChange={(e) => {
                              handle_change_tech(key, e.target.value);
                            }}
                            value={value}
                            data-test={`tech-${key}`}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      className={styles.center_btn}
                    >
                      <Button
                        autoFocus
                        variant="contained"
                        data-test={`del-tech-${key}`}
                        fullWidth={true}
                        onClick={() => {
                          handle_del_tech(key);
                        }}
                      >
                        Del
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
            <Grid item xl={4} lg={4} md={12} className={styles.center_btn}>
              <Button
                autoFocus
                variant="contained"
                fullWidth={true}
                data-test="add-tech"
                onClick={handle_add_tech}
              >
                Ajouter Tech
              </Button>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          data-test="Annuler"
          onClick={handleClose}
        >
          Annuler
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          data-test="Ajouter"
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPFE;

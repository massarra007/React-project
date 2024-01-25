import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.scss";
import Dialog from "../../../components/Popup/FullWidthPopup";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CvUpdt from "../../../services/Cv.service";
import TextField from "@mui/material/TextField";
import { makeDate3 } from "../../../functions/dates";
import CvService from "../../../services/Cv.service";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import { UserContext } from "../../../store/Contexts";

function ShowCv({ popup, handleClose, handleThemeChange, isDarkTheme }) {
  const [isDiplome, setDiplome] = React.useState(false);
  const { user } = useContext(UserContext);
  const { open, value } = popup;
  const init_cv = {
    bio: "",
    localisation: "",
    linkedIn: "",
    style: 1,
    experiences: [],
    formations: [],
    languages: [],
    hard_skills: [],
    soft_skills: [],
    hobbys: [],
  };
  const [formaData, setFormaData] = useState({
    bio: "",
    linkedIn: "",
    localisation: "",
    style: 1,
  });
  const [experiences, setExperiences] = useState([
    { description: "", emplacement: "", startDate: "", endDate: "", title: "" },
  ]);
  const [formations, setFormations] = useState([
    { description: "", emplacement: "", startDate: "", endDate: "", title: "" },
  ]);
  const [languages, setLanguages] = useState([{ lang: "", level: "" }]);
  const [soft_skills, setSoft_skills] = useState([]);
  const [hard_skills, setHard_skills] = useState([]);
  const [hobbys, setHobbys] = useState([]);

  const [cv, setCv] = useState(init_cv);

  useEffect(() => {
    CvUpdt.GetCvByUser(
      (data) => {
        console.log(data);
        setCv({ ...data });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    const dip_name = user.diplome;
    setDiplome(dip_name !== "" && dip_name !== "None");
  }, [user]);

  // useEffect(() => {
  //   if (isDiplome) {
  //     alert("i am diplomated");
  //   } else {
  //     alert("i am not diplomated");
  //   }
  // }, [isDiplome]);

  useEffect(() => {
    const { bio, linkedIn, localisation, style } = cv;
    setFormaData({ bio, linkedIn, localisation, style });
    setExperiences(cv.experiences);
    setFormations(cv.formations);
    setLanguages(cv.languages);
    setSoft_skills(cv.soft_skills);
    setHard_skills(cv.hard_skills);
    setHobbys(cv.hobbys);
  }, [cv]);

  const handle_change_cv_general = (event) => {
    const { value, name } = event.target;
    setFormaData({ ...formaData, [name]: value });
  };
  // ******************************* EXPERIENCES *****************************

  const handleExpChange = (e, index) => {
    const { name, value } = e.target;
    const newArray = [...experiences];
    newArray[index] = { ...newArray[index], [name]: value };
    setExperiences(newArray);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        description: "",
        emplacement: "",
        startDate: "",
        endDate: "",
        title: "",
      },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  // ******************************* Formation *****************************

  const handleFormationChange = (e, index) => {
    const { name, value } = e.target;
    const newArray = [...formations];
    newArray[index] = { ...newArray[index], [name]: value };
    setFormations(newArray);
  };

  const handleAddFormation = () => {
    setFormations([
      ...formations,
      {
        description: "",
        emplacement: "",
        startDate: "",
        endDate: "",
        title: "",
      },
    ]);
  };

  const handleRemoveFormations = (index) => {
    const newFormations = [...formations];
    newFormations.splice(index, 1);
    setFormations(newFormations);
  };

  // ******************************* LANGAGE *****************************

  const handleLangageChange = (e, index) => {
    const { name, value } = e.target;
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], [name]: value };
    setLanguages(newLanguages);
  };

  const handleAddLangage = () => {
    setLanguages([...languages, { lang: "", level: "" }]);
  };

  const handleRemoveLangages = (index) => {
    const newArray = [...formations];
    newArray.splice(index, 1);
    setLanguages(newArray);
  };

  // ******************************* hard_skills *****************************
  const handleHard_skillsChange = (e, index) => {
    const { value } = e.target;
    const newHard_skills = [...hard_skills];
    newHard_skills[index] = value;
    setHard_skills(newHard_skills);
  };

  const handleAddHard_skills = () => {
    setHard_skills([...hard_skills, ""]);
  };

  const handleRemoveHard_skills = (index) => {
    const newHard_skills = [...hard_skills];
    newHard_skills.splice(index, 1);
    setHard_skills(newHard_skills);
  };

  // ******************************* soft_skills *****************************

  const handleSoft_skillsChange = (e, index) => {
    const { value } = e.target;
    const newSoft_skills = [...soft_skills];
    newSoft_skills[index] = value;
    setSoft_skills(newSoft_skills);
  };

  const handleAddSolft_skills = () => {
    setSoft_skills([...soft_skills, ""]);
  };

  const handleRemoveSoft_skills = (index) => {
    const newSoft_skills = [...soft_skills];
    newSoft_skills.splice(index, 1);
    setSoft_skills(newSoft_skills);
  };
  // ******************************* hobbys *****************************

  const handleHobbysChange = (e, index) => {
    const { value } = e.target;
    const newHobbys = [...hobbys];
    newHobbys[index] = value;
    setHobbys(newHobbys);
  };

  const handleAddHobbys = () => {
    setHobbys([...hobbys, ""]);
  };

  const handleRemovehobbys = (index) => {
    const newHobbys = [...hobbys];
    newHobbys.splice(index, 1);
    setHobbys(newHobbys);
  };

  const HandleSubmit = () => {
    const finalCv = {
      ...formaData,
      experiences,
      formations,
      languages,
      soft_skills,
      hard_skills,
      hobbys,
    };
    CvService.UpdateCv(
      finalCv,
      () => {},
      () => {}
    );
  };

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title={`Cv User : ${value.firstName} ${value.lastName}`}
    >
      <DialogContent dividers data-test="show">
        <h3>Bio</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              className={styles.textField}
              label="Bio"
              name="bio"
              value={formaData.bio}
              onChange={handle_change_cv_general}
            />
          </Grid>
        </Grid>

        <h3>LinkedIn</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              className={styles.textField}
              label="LinkedIn"
              name="linkedIn"
              value={formaData.linkedIn}
              onChange={handle_change_cv_general}
            />
          </Grid>
        </Grid>

        <h3>Localisation</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              className={styles.textField}
              label="Localisation"
              name="localisation"
              value={formaData.localisation}
              onChange={handle_change_cv_general}
            />
          </Grid>
        </Grid>

        <h3>Experiences</h3>
        <Grid container spacing={2}>
          {experiences?.map((exp, index) => (
            <div key={index}>
              {index + 1}

              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Description"
                  name="description"
                  value={exp?.description}
                  onChange={(e) => handleExpChange(e, index)}
                  disabled={isDiplome}
                  data-test={`desc-${index}`}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Emplacement"
                  name="emplacement"
                  value={exp.emplacement}
                  onChange={(e) => handleExpChange(e, index)}
                  disabled={isDiplome}
                  data-test={`empl-${index}`}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  type="date"
                  className={styles.textField}
                  label="Start Date"
                  name="startDate"
                  value={makeDate3(exp.startDate)}
                  onChange={(e) => handleExpChange(e, index)}
                  disabled={isDiplome}
                  data-test={`stardate-${index}`}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  type="date"
                  className={styles.textField}
                  label="End Date"
                  name="endDate"
                  value={makeDate3(exp.endDate)}
                  onChange={(e) => handleExpChange(e, index)}
                  disabled={isDiplome}
                  data-test={`enddate-${index}`}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Titre"
                  name="title"
                  value={exp.title}
                  onChange={(e) => handleExpChange(e, index)}
                  disabled={isDiplome}
                  data-test={`titre-${index}`}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <Button
                  autoFocus
                  variant="outlined"
                  onClick={() => handleRemoveExperience(index)}
                  disabled={isDiplome}
                  data-test={`supp-${index}`}
                >
                  Supprimer Expérience
                </Button>
              </Grid>
            </div>
          ))}{" "}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xl={12} lg={8} md={12}>
            <Button autoFocus variant="outlined" onClick={handleAddExperience}>
              Ajouter Expérience
            </Button>
          </Grid>
        </Grid>

        <h3>Formations</h3>
        <Grid container spacing={1}>
          {formations?.map((item, index) => (
            <div key={index}>
              {index + 1}

              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Description"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleFormationChange(e, index)}
                  disabled={isDiplome}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Emplacement"
                  name="emplacement"
                  value={item.emplacement}
                  onChange={(e) => handleFormationChange(e, index)}
                  disabled={isDiplome}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  type="date"
                  className={styles.textField}
                  label="Start Date"
                  name="startDate"
                  value={makeDate3(item.startDate)}
                  onChange={(e) => handleFormationChange(e, index)}
                  disabled={isDiplome}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  type="date"
                  className={styles.textField}
                  label="End Date"
                  name="endDate"
                  value={makeDate3(item.endDate)}
                  onChange={(e) => handleFormationChange(e, index)}
                  disabled={isDiplome}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Titre"
                  name="title"
                  value={item.title}
                  onChange={(e) => handleFormationChange(e, index)}
                  disabled={isDiplome}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <Button
                  autoFocus
                  variant="outlined"
                  onClick={() => handleRemoveFormations(index)}
                  disabled={isDiplome}
                >
                  Supprimer Formation
                </Button>
              </Grid>
            </div>
          ))}{" "}
        </Grid>

        <Grid container spacing={1}>
          <Grid item xl={12} lg={8} md={12}>
            <Button autoFocus variant="outlined" onClick={handleAddFormation}>
              Ajouter Formation
            </Button>
          </Grid>
        </Grid>

        <h3>Hard Skills</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            {hard_skills?.map((item, index) => {
              return (
                <div key={index}>
                  <Grid item xl={12} lg={8} md={12}>
                    <TextField
                      fullWidth
                      className={styles.textField}
                      label="Hard_skills"
                      name="hard_skills"
                      value={item}
                      onChange={(e) => handleHard_skillsChange(e, index)}
                    />
                  </Grid>
                  <Grid item xl={12} lg={8} md={12}>
                    <Button
                      autoFocus
                      variant="outlined"
                      onClick={() => handleRemoveHard_skills(index)}
                    >
                      Supprimer Hard Skill
                    </Button>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xl={12} lg={8} md={12}>
            <Button autoFocus variant="outlined" onClick={handleAddHard_skills}>
              Ajouter Hard Skill
            </Button>
          </Grid>
        </Grid>

        <h3>Hoppys</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            {hobbys?.map((item, index) => {
              return (
                <div key={index}>
                  <Grid item xl={12} lg={8} md={12}>
                    <TextField
                      fullWidth
                      className={styles.textField}
                      label="Hobby"
                      name="hobby"
                      value={item}
                      onChange={(e) => handleHobbysChange(e, index)}
                    />
                  </Grid>
                  <Grid item xl={12} lg={8} md={12}>
                    <Button
                      autoFocus
                      variant="outlined"
                      onClick={() => handleRemovehobbys(index)}
                    >
                      Supprimer Hoppy
                    </Button>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xl={12} lg={8} md={12}>
            <Button autoFocus variant="outlined" onClick={handleAddHobbys}>
              Ajouter Hoppy
            </Button>
          </Grid>
        </Grid>

        <h3>Languages</h3>
        <Grid container spacing={1}>
          {languages?.map((row, index) => (
            <div key={index}>
              {index + 1}

              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Langage"
                  name="lang"
                  value={row.lang}
                  onChange={(e) => handleLangageChange(e, index)}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <TextField
                  fullWidth
                  className={styles.textField}
                  label="Niveau"
                  name="level"
                  value={row.level}
                  onChange={(e) => handleLangageChange(e, index)}
                />
              </Grid>
              <Grid item xl={12} lg={8} md={12}>
                <Button
                  autoFocus
                  variant="outlined"
                  onClick={() => handleRemoveLangages(index)}
                >
                  Supprimer Language
                </Button>
              </Grid>
            </div>
          ))}{" "}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xl={12} lg={8} md={12}>
            <Button autoFocus variant="outlined" onClick={handleAddLangage}>
              Ajouter Language
            </Button>
          </Grid>
        </Grid>

        <h3>Soft Skills</h3>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            {soft_skills?.map((item, index) => {
              return (
                <div key={index}>
                  <Grid item xl={12} lg={8} md={12}>
                    <TextField
                      fullWidth
                      className={styles.textField}
                      label="Soft skill"
                      name="Soft_skill"
                      value={item}
                      onChange={(e) => handleSoft_skillsChange(e, index)}
                    />
                  </Grid>
                  <Grid item xl={12} lg={8} md={12}>
                    <Button
                      autoFocus
                      variant="outlined"
                      onClick={() => handleRemoveSoft_skills(index)}
                    >
                      Supprimer Soft Skill
                    </Button>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xl={12} lg={8} md={12}>
            <Button
              autoFocus
              variant="outlined"
              onClick={handleAddSolft_skills}
            >
              Ajouter Soft Skill
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button autoFocus variant="contained" onClick={HandleSubmit}>
          Modifier
        </Button>
        <a href="http://localhost:3000/cv" target="_blank">
          <Button variant="contained">Show Cv</Button>
        </a>
      </DialogActions>
    </Dialog>
  );
}

export default ShowCv;

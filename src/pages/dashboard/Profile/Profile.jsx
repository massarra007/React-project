import React, { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { UserContext } from "../../../store/Contexts";
import CvUpdt from "../../../services/Cv.service";
import { makeDate2 } from "../../../functions/dates";
import UpdateProfile from "./UpdateProfile";
import ShowCv from "./ShowCv";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import H1 from "../../../components/Texts/H1";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import EditStateAccount from "./EditStateAccount";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { isALUMINIE, isSTUDENT } from "../../../custom/roles";
import { roles } from "../../../custom/roles";

// firstName, lastName, phoneNumber, birthDate, sex
function Profile() {
  const [isDiplome, setDiplome] = React.useState(false);
  const { user, setUser } = useContext(UserContext);

  const init_cv = {
    student: "",
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

  const [cv, setCv] = useState([]);

  useEffect(() => {
    CvUpdt.GetCvByUser(
      (data) => {
        console.log(data);
        setCv(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    //value: init_cv,
  });

  const openPopup = (type, data) => {
    console.log(data);
    setPopup({ ...popup, open: true, type: type, value: data });
  };

  const handleClose = () => {
    setPopup({ ...popup, open: false, type: "", value: init_cv });
  };
  // update State Account
  const [Etat, setEtat] = useState("");

  useEffect(() => {
    const dip_name = user.diplome;
    setDiplome(dip_name !== "" && dip_name !== "None");
  }, [user]);
  return (
    <>
      <div>
        <div className={styles.head}>
          <Grid container alignItems="center">
            <Grid item xs={6} md={6} lg={6}>
              <H1>Profile</H1>
            </Grid>
            <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
              <>
                {(user.role === roles.STUDENT ||
                  user.role === roles.ALUMINIE) &&
                user?.isPublic === true ? (
                  <Button
                    startIcon={<PublicIcon />}
                    variant="contained"
                    onClick={() => {
                      openPopup("updateStateAccount", user);
                      setEtat("privé");
                    }}
                  >
                    Compte Public
                  </Button>
                ) : (user.role === roles.STUDENT ||
                    user.role === roles.ALUMINIE) &&
                  user?.isPublic === false ? (
                  <Button
                    startIcon={<PublicOffIcon />}
                    variant="contained"
                    onClick={() => {
                      openPopup("updateStateAccount", user);
                      setEtat("public");
                    }}
                  >
                    Compte Privé
                  </Button>
                ) : (
                  ""
                )}
              </>{" "}
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="name">
              Prénom:{" "}
            </label>
            <label htmlFor="name">{user.firstName} </label>
          </Grid>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="name">
              Nom:{" "}
            </label>
            <label htmlFor="name">{user.lastName}</label>
          </Grid>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="phone">
              Numéro de tel:{" "}
            </label>
            <label htmlFor="phone">{user.phoneNumber}</label>
          </Grid>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="birthdate">
              Date de naissance:{" "}
            </label>
            <label htmlFor="name">{makeDate2(user.birthDate)}</label>
          </Grid>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="sex">
              Sex:{" "}
            </label>
            <label htmlFor="phone">{user.sex}</label>
          </Grid>
          <Grid item xl={6} lg={6} md={12}>
            <label className={styles.classLabel} htmlFor="email">
              Email:{" "}
            </label>
            <label htmlFor="phone">{user.email}</label>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1}>
          <Grid item xl={6} lg={6} md={12}>
            <Button
              autoFocus
              variant="outlined"
              onClick={() => openPopup("update", user)}
              disabled={isDiplome}
            >
              Modifier Profile
            </Button>
          </Grid>
        </Grid>

        {(isALUMINIE(user) || isSTUDENT(user)) && (
          <Button
            autoFocus
            variant="outlined"
            onClick={() => openPopup("show", user)}
            data-test="showcv"
          >
            Afficher Cv
          </Button>
        )}
      </div>

      {popup.type === "update" && (
        <UpdateProfile popup={popup} handleClose={handleClose} />
      )}

      {popup.type === "show" && (
        <ShowCv popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "updateStateAccount" && (
        <EditStateAccount popup={popup} handleClose={handleClose} etat={Etat} />
      )}
    </>
  );
}

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import CVService from "../../../services/Cv.service";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { fDate } from "../../../functions/formatTime";
import Chip from "@mui/material/Chip";
import {
  isALUMINIE,
  isADMIN,
  isSUPERADMIN,
  isTEACHER,
  isSTUDENT,
} from "../../../custom/roles";
import { UserContext } from "../../../store/Contexts";

function CVStudent() {
  const { _id } = useParams();
  const [CV, setCV] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    CVService.GetCvById(
      _id,
      (data) => {
        console.log(data);
        setCV({ ...data });
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  return (
    <div>
      {" "}
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ marginBottom: 2 }}
      >
        <Link
          underline="hover"
          key="1"
          color="inherit"
          to={
            isTEACHER(user)
              ? "/dash/gest_students"
              : isSTUDENT(user) || isALUMINIE(user)
              ? "/dash/ComptePublic"
              : ""
          }
        >
          Liste Des Etudiants
        </Link>
        ,
        <Typography key="3" color="text.primary">
          CV Etudiant
        </Typography>
      </Breadcrumbs>{" "}
      <Grid
        container
        direction="column"
        className="  rounded shadow-lg m-1 "
        sx={
          CV?.style === 1
            ? { color: "white", background: "#383838", padding: 2 }
            : { padding: 2 }
        }
      >
        <Grid
          className="pt-4 rounded"
          item
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#383838",
          }}
        >
          <Avatar
            src={CV?.student?.profilImage}
            alt="User Image"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              top: 50,
            }}
          />
        </Grid>
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 65,
          }}
        >
          {" "}
          <Box>
            <Typography variant="h6">
              {" "}
              {CV?.student?.firstName} {CV?.student?.lastName}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            padding: 2,
            marginTop: 3,
          }}
        >
          {" "}
          <Box>
            <Typography variant="h6"> Informations Générales</Typography>
            <Typography variant="body1" color="gray">
              {CV?.bio}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOnIcon sx={{ marginRight: "5px" }} /> {CV?.localisation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LinkedInIcon sx={{ marginRight: "5px" }} /> {CV?.linkedIn}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            padding: 2,
            marginTop: 3,
          }}
        >
          {" "}
          <Typography variant="h6"> Experience</Typography>
          {CV?.experiences?.map((item) => (
            <Box sx={{ borderBottom: "1px solid gray " }}>
              <Typography variant="body1">{item.title}</Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color="gray"
              >
                <LocationOnIcon sx={{ marginRight: "5px" }} />{" "}
                {item.emplacement}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color="gray"
              >
                <DateRangeIcon sx={{ marginRight: "5px" }} />{" "}
                {fDate(item.startDate)} - {fDate(item.endDate)}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            padding: 2,
            marginTop: 3,
          }}
        >
          {" "}
          <Typography variant="h6"> Formation</Typography>
          {CV?.formations?.map((item) => (
            <Box sx={{ borderBottom: "1px solid gray " }}>
              <Typography variant="body1">{item.title}</Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color="gray"
              >
                <LocationOnIcon sx={{ marginRight: "5px" }} />{" "}
                {item.emplacement}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                color="gray"
              >
                <DateRangeIcon sx={{ marginRight: "5px" }} />{" "}
                {fDate(item.startDate)} - {fDate(item.endDate)}
              </Typography>
              <Typography variant="body1">{item.description}</Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            padding: 2,
            marginTop: 3,
          }}
        >
          {" "}
          <Typography variant="h6"> Compétence</Typography>
          <Typography variant="subtitle2">Compétences Générales</Typography>
          {CV?.soft_skills?.map((item) => (
            <Box>
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
          <Typography variant="subtitle2"> Compétences techniques</Typography>
          {CV?.hard_skills?.map((item) => (
            <Box>
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
          <Typography variant="subtitle2"> Language</Typography>
          {CV?.languages?.map((item) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Chip label={item.lang} />

              <Typography variant="body1" color="gray" ml={2}>
                {item.level}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          item
          sx={{
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            border: "1px solid #ddd",
            padding: 2,
            marginTop: 3,
          }}
        >
          {" "}
          <Typography variant="h6"> Loisir</Typography>
          {CV?.hobbys?.map((item) => (
            <Stack direction="row" spacing={1}>
              <Chip label={item} variant="outlined" />
            </Stack>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default CVStudent;

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import H1 from "../../../components/Texts/H1";
import EventService from "../../../services/EventService";
import { fDate } from "../../../functions/formatTime";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
const eventImage = require("../../../../src/assets/images/figures/BG.jpg");

function DetailsEvent() {
  const { _id } = useParams();
  const [Event, setEvent] = useState([]);

  useEffect(() => {
    EventService.GetEventById(_id)
      .then((response) => {
        console.log(response);
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ marginBottom: 2 }}
      >
        <Link
          underline="hover"
          key="1"
          color="inherit"
          to="/dash/GestionDesEvenement"
        >
          Gestion Des Evénenements
        </Link>
        ,
        <Typography key="3" color="text.primary">
          Détail
        </Typography>
      </Breadcrumbs>{" "}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <div
            style={{
              backgroundImage: `url(${eventImage})`,
              backgroundSize: "cover",
              height: 200,
              marginTop: 5,
              borderRadius: 5,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant=""
                component="h2"
                color="#194B94"
                style={{ flex: 1 }}
                sx={{
                  backgroundColor: "rgba(240, 240, 240, 0.26)",
                  padding: 1,
                }}
              >
                {Event.eventName}
              </Typography>
              <IconButton sx={{ padding: 2 }}>
                <AutoFixHighIcon />
              </IconButton>
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" component="h2">
            Détails{" "}
          </Typography>
          <Box display="flex" alignItems="center">
            <DateRangeIcon color="primary" fontSize="small" />{" "}
            <Typography variant="subtitle1" component="p">
              &nbsp; {fDate(Event.eventDateDebut)}{" "}
              {Event.eventDateFin ? (
                <> jusqu'a {fDate(Event.eventDateFin)} </>
              ) : (
                ""
              )}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <LocationOnIcon color="primary" fontSize="small" />
            <Typography variant="subtitle1" component="p">
              &nbsp; {Event.location}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <AccessTimeIcon color="primary" fontSize="small" />{" "}
            <Typography variant="subtitle1" component="p">
              &nbsp; <b> Durée: </b>
              {Event.duration} heures
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <PersonIcon color="primary" fontSize="small" />{" "}
            <Typography variant="subtitle1" component="p">
              &nbsp; <b> Organiser Par: </b> {Event.organizedBy}
            </Typography>
          </Box>

          <Typography variant="subtitle1" component="p" mt={2}>
            <b> Plus d'information: </b>
          </Typography>
          <Typography variant="body1" component="p">
            {Event.description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsEvent;

import React, { useEffect, useState, useContext } from "react";
import CvUpdt from "../../../services/Cv.service";
import { UserContext } from "../../../store/Contexts";

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

import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { fDate } from "../../../functions/formatTime";
import Chip from "@mui/material/Chip";

function Cv() {
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
  const [cv, setCv] = useState(init_cv);
  const [sx, setSx] = useState({ padding: 2 });
  const { user } = useContext(UserContext);

  const handleClick = () => {
    // If cv.style is currently 1, change it to 2 and update sx object
    if (cv.style === 1) {
      setCv({ ...cv, style: 2 });
      setSx({ color: "white", background: "#383838", padding: 2 });
    } else {
      // If cv.style is currently 2, change it to 1 and update sx object
      setCv({ ...cv, style: 1 });
      setSx({ padding: 2 });
    }
  };

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

  return (
    <div>
      <Grid
        container
        direction="column"
        className="rounded shadow-lg m-1"
        style={sx}
      >
        <Button onClick={handleClick} data-test="style">
          {cv.style}-Theme
        </Button>
        {/* Your other Grid components */}
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
            src={cv?.student?.profilImage}
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
              {user.firstName} {user.lastName}
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
              {cv.bio}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOnIcon sx={{ marginRight: "5px" }} /> {cv?.localisation}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <LinkedInIcon sx={{ marginRight: "5px" }} /> {cv?.linkedIn}
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
          {cv?.experiences?.map((item) => (
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
          {cv?.formations?.map((item) => (
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
          {cv?.soft_skills?.map((item) => (
            <Box>
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
          <Typography variant="subtitle2"> Compétences techniques</Typography>
          {cv?.hard_skills?.map((item) => (
            <Box>
              <Typography variant="body1">{item}</Typography>
            </Box>
          ))}
          <Typography variant="subtitle2"> Language</Typography>
          {cv?.languages?.map((item) => (
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
          {cv?.hobbys?.map((item) => (
            <Stack direction="row" spacing={1}>
              <Chip label={item} variant="outlined" />
            </Stack>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default Cv;

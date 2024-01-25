import React, { useState, useEffect } from "react";
import Acount from "./Acount";
import { Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, Typography, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import StudentServ from "../../../services/Student.service";
import H1 from "../../../components/Texts/H1";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

function AcountsPage() {
  const navigate = useNavigate();

  const [Students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [typeStudent, settypeStudent] = useState("actuel");
  const [searchQuery, setSearchQuery] = useState(""); // new state variable for search query

  const handleChange = (event) => {
    settypeStudent(event.target.value);
  };

  const GetDataStudents = () => {
    StudentServ.GetAllPublicAccount(
      (data) => {
        const filteredStudents = filterStudents(data.allpublicStrudents); // Appliquer le filtre
        setStudents(filteredStudents);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const GetDataAluminies = () => {
    StudentServ.GetAllPublicAccount(
      (data) => {
        const filteredStudents = filterStudents(data.allpublicAluminies); // Appliquer le filtre
        setStudents(filteredStudents);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (typeStudent === "actuel") {
      GetDataStudents();
    } else if (typeStudent === "aluminie") {
      GetDataAluminies();
    }
  }, [currentPage, typeStudent]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleNavigateDetail = (_id) => {
    navigate(`/dash/gest_students/cv/${_id}`);
  };

  // new function to filter students based on search query
  const filterStudents = (students) => {
    if (searchQuery === "") {
      return students;
    } else {
      return students.filter((student) =>
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  return (
    <>
      <div>
        <Grid container alignItems="center" mb={3}>
          <Grid item xs={6} md={6} lg={6}>
            <H1>Liste des comptes Publics </H1>
          </Grid>
          <Grid item container>
            <Grid item xs={6} md={6} lg={6}>
              <TextField
                sx={{ margin: 1 }}
                id="outlined-basic"
                label="Rechercher Par Nom"
                variant="outlined"
                size="small"
                type="text"
                placeholder="Search by first name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Compte</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={typeStudent}
                  label="Compte"
                  onChange={handleChange}
                >
                  <MenuItem value="actuel" onClick={() => setSearchQuery("")}>
                    Compte public des actuels étudiants
                  </MenuItem>
                  <MenuItem value="aluminie" onClick={() => setSearchQuery("")}>
                    Compte public des étudiants en alumine.
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={3}>
        {filterStudents(
          Students.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        ).map((item, index) => (
          <Grid item lg={4} md={6} xs={6} key={index}>
            {" "}
            <Box
              onClick={() => handleNavigateDetail(item._id)}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
                borderRadius: 4,
                maxWidth: 350,
                margin: "auto",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                filter: "brightness(100%)",
                position: "relative", // add position relative
                "&::before": {
                  // create a pseudo-element before the box
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "8%", // adjust the height of the gradient
                  background: "linear-gradient(to bottom, #4580F0, #005bea)", // add the gradient colors
                  opacity: 0.9,
                  borderRadius: ["4px 4px 0px 0px", "4px 4px 0px 0px"],
                },
                "&:hover": {
                  transform: "scale(1.05)",
                  filter: "brightness(120%)",
                },
              }}
            >
              <Box
                sx={{
                  marginRight: 2,
                }}
              >
                <img
                  width={64}
                  height={64}
                  style={{ borderRadius: "50%" }}
                  src={item.profilImage}
                />
              </Box>
              <Box>
                <Typography variant="h6">
                  {item.firstName} {item.lastName}
                </Typography>
                <Typography variant="subtitle2">{item.email}</Typography>
              </Box>
            </Box>{" "}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ position: "sticky", bottom: 0, background: "white" }}>
        <Stack
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 40 }}
        >
          <Pagination
            count={Math.ceil(filterStudents(Students).length / pageSize)} // adjust count based on filtered students
            color="primary"
            onChange={handlePageChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default AcountsPage;

import React, { useEffect, useState } from "react";
import AluminiService from "../../../services/Alumini.service";
import {
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
const GestionAlumini = () => {
  const [aluminies, setAluminies] = useState([]);
  const [popup, setPopup] = useState({ type: null });



  const validateAl = (alumini) => {
    try {
      const succ = (item) => {
          fetchAlumini();
      };
      const fail = () => {};

      AluminiService.validateAluminiInscription(alumini._id,true,succ, fail);
    } catch (error) {
      console.error(error);
    }
  };




  const fetchAlumini = async () => {
    try {
      const succ = (list) => {
        const aluminiData = list.filter(user => user.role === 'ALUMINIE'
        &&(user.isValide==null||user.isValide==false)
        );
        setAluminies(aluminiData);
      };
      const fail = () => {};

      AluminiService.GetAllAlumini(succ, fail);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAlumini();
  }, []);

  return (
    <div>
      <div>
        <Grid container alignItems="center">
          <Grid item xs={6} md={6} lg={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Gestion des Aluminis
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
            {/* <Button
              onClick={openAdd}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              data-test="addAluminiButton"
            >
              Ajouter Alumini
            </Button> */}
          </Grid>
        </Grid>
      </div>
      <div>
      <TableContainer 
      data-testid="aluminiTableContainer"
      sx={{ marginTop: 5 }}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Prénom</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Diplome</TableCell>
                <TableCell>Promotion</TableCell>
                <TableCell>Date inscription</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aluminies.map((alumini, index) => (
                <TableRow
                  hover
                  key={alumini._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  data-test="aluminiTableRow"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{alumini.firstName}</TableCell>
                  <TableCell>{alumini.lastName}</TableCell>
                  <TableCell>{alumini.diplome}</TableCell>
                  <TableCell>{alumini.promotion}</TableCell>
                  <TableCell>{alumini.createdAt.substring(0,10)}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="Valider inscription">
                      <IconButton
                      data-test="validateBtn"
                      //{`validateBtn-${alumini._id}`}
                      onClick={() => validateAl(alumini)}>
                        <CheckCircleIcon color="success"/>
                      </IconButton>
                    </Tooltip>
                
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
 {/*      {popup.type === "add" && (
        <ModalAddAlumini popup={popup} handleClose={handleClose} />
      )}
      {popup.type === "update" && (
        <ModalEditAlumini
          popup={popup}
          handleClose={handleClose}
          handleEditAlumini={handleEditAlumini}
        />
      )}
      {popup.type === "delete" && (
        <ModalDeleteAlumini
          popup={popup}
          handleClose={handleClose}
          handleDeleteAlumini={handleDeleteAlumini}
        />
      )} */}
    </div>
  );
};

export default GestionAlumini;

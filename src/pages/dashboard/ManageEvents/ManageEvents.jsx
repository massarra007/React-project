import React, { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EventNoteIcon from "@mui/icons-material/EventNote";

import H1 from "../../../components/Texts/H1";
import Chip from "../../../components/Chip/Chip";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EventService from "../../../services/EventService";
import PromoServ from "../../../services/Promotion.service";

import { fDate } from "../../../functions/formatTime";
import styles from "../../../App.scss";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ModalAddEvent from "./Modals/ModalAddEvent";
import ModalEditEvent from "./Modals/ModalEditEvent";
import ModalDeleteEvent from "./Modals/ModalDeleteEvent";
import { Link, useNavigate, useParams } from "react-router-dom";

import Select from "../../../components/Inputs/Select";
import { isADMIN, isSUPERADMIN, isTEACHER } from "../../../custom/roles";
import { UserContext } from "../../../store/Contexts";
import Loading from "../../../components/Loading/Loading";
import LoadingPetit from "../../../components/Loading/LoadingPetit";

function ManageEvents() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [Events, setEvents] = useState([]);
  const [List, setList] = useState(false);
  const [promotion, setpromotion] = useState("");
  const [promos, setPromos] = useState([]);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    value: Events,
  });
  const openAdd = () => {
    setPopup({ open: true, type: "add", value: Events });
  };

  const openUpdate = (row) => {
    setPopup({ open: true, type: "update", value: row });
  };
  const openShow = (row) => {
    setPopup({ open: true, type: "show", value: row });
  };
  const [Loading, setLoading] = useState(true);
  const openDelete = (row) => {
    setPopup({
      open: true,
      type: "delete",
      valueRow: row,
      valueArray: Events,
    });
  };

  const handleClose = () => {
    setPopup({ open: false, type: "", row: Events });
  };

  useEffect(() => {
    const fail = () => {};
    PromoServ.GetAllPromotions(setPromos, fail);
  }, []);

  useEffect(() => {
    EventService.GetAllEvents()
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const ChangeYear = () => {
    EventService.GetAllEvents(promotion)
      .then((response) => {
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteEvent = (_id) => {
    const filteredEvents = Events.filter((Events) => Events._id !== _id);
    setEvents(filteredEvents);
  };

  const handleEditEvent = (_id, row) => {
    const index = Events.findIndex((item) => item._id === _id);
    if (index !== -1) {
      Events[index] = { ...Events[index], ...row };
    }
  };
  const handleNavigateDetail = (_id) => {
    navigate(`/dash/GestionDesEvenement/details/${_id}`);
  };
  return (
    <div>
      <div>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} md={6} lg={6}>
            <H1>Gestion Des Evénenements </H1>
          </Grid>
          <Grid item xs={6} md={6} lg={6} container justifyContent="flex-end">
            <Button
              onClick={openAdd}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              variant="contained"
              data-test="addEventButton"
            >
              Ajouter Evénenement
            </Button>
          </Grid>

          <Grid item xs={4} md={4} lg={4} container>
            <Select
              value={promotion}
              label="Promotion"
              name="promotion"
              onChange={(e) => {
                setpromotion(e.target.value);
              }}
              items={[
                {
                  name: "Tout Les Promotions",
                  value: "None",
                },
                ...promos.map((prom) => ({
                  name: prom.title,
                  value: prom.title,
                })),
              ]}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} container>
            <Button
              onClick={ChangeYear}
              startIcon={<EventNoteIcon />}
              variant="contained"
            >
              Basculer
            </Button>
          </Grid>
        </Grid>
      </div>
      <div>
        <TableContainer sx={{ marginTop: 5 }}>
          <Table
            sx={{ minWidth: 1000 }}
            size="small"
            stickyHeader
            aria-label="sticky table"
            data-test="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Date De Début</TableCell>
                <TableCell>Date De Fin </TableCell>
                <TableCell> Type d'événement</TableCell>
                <TableCell>location</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {Loading ? (
              <TableBody>
                <LoadingPetit />
              </TableBody>
            ) : (
              <TableBody>
                {Events &&
                  Events.map((item, index) => (
                    <TableRow
                      hover
                      key={item._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <> {index + 1}</>
                      </TableCell>
                      <TableCell>{item.eventName}</TableCell>{" "}
                      <TableCell>{fDate(item.eventDateDebut)}</TableCell>{" "}
                      <TableCell>
                        {item.eventDateFin ? (
                          fDate(item.eventDateFin)
                        ) : (
                          <Typography color="textSecondary"> Néant </Typography>
                        )}{" "}
                      </TableCell>
                      <TableCell>
                        {" "}
                        {item.eventType === "JPO" ? (
                          <Chip
                            label={item.eventType}
                            color="error"
                            className={styles.chip}
                          />
                        ) : item.eventType === "Formation" ? (
                          <Chip
                            label={item.eventType}
                            color="warning"
                            className={styles.chip}
                          />
                        ) : (
                          <Chip
                            label={item.eventType}
                            color="primary"
                            className={styles.chip}
                          />
                        )}
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell align="center">
                        {(isADMIN(user) || isSUPERADMIN(user)) && (
                          <Tooltip title="Modifier">
                            <IconButton
                              onClick={() => openUpdate(item)}
                              data-test={`updateButton-${item.eventName}`}
                            >
                              <EditIcon sx={{ color: "#4580F0" }} />
                            </IconButton>
                          </Tooltip>
                        )}

                        {(isADMIN(user) || isSUPERADMIN(user)) && (
                          <Tooltip title="Supprimer">
                            <IconButton
                              onClick={() => openDelete(item)}
                              data-test={`deleteButton-${item.eventName}`}
                            >
                              <DeleteIcon sx={{ color: "#4580F0" }} />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Voir">
                          <IconButton
                            onClick={(_id) => handleNavigateDetail(item._id)}
                            data-test={`viewButton-${item.eventName}`}
                          >
                            <VisibilityIcon sx={{ color: "#4580F0" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
      {popup.type === "add" && (
        <ModalAddEvent popup={popup} handleClose={handleClose} />
      )}{" "}
      {popup.type === "update" && (
        <ModalEditEvent
          popup={popup}
          handleClose={handleClose}
          handleEditEvent={handleEditEvent}
        />
      )}
      {popup.type === "delete" && (
        <ModalDeleteEvent
          popup={popup}
          handleClose={handleClose}
          handleDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
}

export default ManageEvents;

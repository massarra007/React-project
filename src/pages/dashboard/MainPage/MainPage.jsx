import React, { useState, useEffect, useContext } from "react";
import UpdateClass from "./Modals/UpdateClass";
import EventList from "./Event/EventList";
import H1 from "../../../components/Texts/H1";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import { UserContext } from "../../../store/Contexts";
import { roles } from "../../../custom/roles";

function MainPage() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <UpdateClass />

      <H1>Home </H1>
      {user.role === roles.STUDENT || user.role === roles.ALUMINIE ? (
        <>
          {" "}
          <Box sx={{ marginBottom: 3 }}>
            {" "}
            <Typography variant="h6"> Les evenements de l'ISAMM</Typography>
          </Box>
          <EventList />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MainPage;

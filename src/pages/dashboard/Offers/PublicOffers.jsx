import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OfferService from "../../../services/Offre.service";
import { toast } from "react-hot-toast";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const PublicOffers = () => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    filterOffersByTab();
  }, [offers, activeTab]);

  const fetchOffers = () => {
    OfferService.GetAllOffers(
      (res) => {
        setOffers(res);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  const filterOffersByTab = () => {
    if (activeTab === "All") {
      setFilteredOffers(offers);
    } else {
      setFilteredOffers(offers.filter((offer) => offer.offerType === activeTab));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Typography variant="h5" component="h5" gutterBottom>
        Offres
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <StyledButton
            variant={activeTab === "Conseil" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTabChange("Conseil")}
          >
            Conseil
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant={activeTab === "Offre" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTabChange("Offre")}
          >
            Offre
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant={activeTab === "Opportunité" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTabChange("Opportunité")}
          >
            Opportunité
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant={activeTab === "Offre d'emploi" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTabChange("Offre d'emploi")}
          >
            Offre d'emploi
          </StyledButton>
        </Grid>
        <Grid item>
          <StyledButton
            variant={activeTab === "All" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTabChange("All")}
          >
            Tous
          </StyledButton>
        </Grid>
      </Grid>
      <div style={{ height: 60 }}></div>
      <Grid container spacing={3}>
        {filteredOffers.map((offer) => (
          <Grid item xs={12} sm={6} md={4} key={offer.id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="h6" gutterBottom>
                  {offer.offerName}
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                  Type: {offer.offerType}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {offer.description}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography variant="body3" color="textSecondary" component="p">
                  <LocationOnIcon style={{ marginRight: "0.5rem" }} />
                  {offer.location}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PublicOffers;

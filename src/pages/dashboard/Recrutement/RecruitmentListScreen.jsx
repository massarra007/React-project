import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RecrutementService from "../../../services/Recrutement.service";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";
import RecruitmentDetailsDialog from "./Modals/RecruitmentDetailsDialog";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const RecruitmentListScreen = () => {
  const [recruitments, setRecruitments] = useState([]);
  const [filteredRecruitments, setFilteredRecruitments] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedRecruitment, setSelectedRecruitment] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchRecruitments();
  }, []);

  useEffect(() => {
    filterRecruitmentsByTab();
  }, [recruitments, activeTab]);

  const fetchRecruitments = () => {
    // Replace with the actual API call to fetch recruitment list
    RecrutementService.GetAllRecrutement(
      (res) => {
        setRecruitments(res);
      },
      (error) => {
        toast.error(error);
      }
    );
  };

  const filterRecruitmentsByTab = () => {
    if (activeTab === "All") {
      setFilteredRecruitments(recruitments);
    } else {
      setFilteredRecruitments(
        recruitments.filter((recruitment) => recruitment.type === activeTab)
      );
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenDialog = (recruitment) => {
    setSelectedRecruitment(recruitment);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" component="h5" gutterBottom>
        Liste des demandes de recrutement
      </Typography>

      <Tabs value={activeTab} onChange={(_, tab) => handleTabChange(tab)}>
        <Tab label="Tous" value="All" />
        <Tab label="Temporaire" value="Temporary" />
        <Tab label="Expert" value="Expert" />
      </Tabs>

      <Grid container spacing={2}>
        {filteredRecruitments.map((recruitment) => (
          <Grid item xs={12} key={recruitment.id}>
            <StyledPaper>
              <Box>
                <Typography variant="h6" component="h6" gutterBottom>
                  Type: {recruitment.type}
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                  Compétences:
                </Typography>
                <ul>
                  {recruitment.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpenDialog(recruitment)}
                >
                  Voir les détails
                </Button>
              </Box>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <RecruitmentDetailsDialog open={dialogOpen} onClose={handleCloseDialog} selectedRecruitment={selectedRecruitment}/>

    
    </div>
  );
};

export default RecruitmentListScreen;

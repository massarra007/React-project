import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  paddingBottom: 0,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
}));


const SkillsContainer = styled(Grid)(({ theme }) => ({
    marginTop: theme.spacing(2),
  }));
  
  const SkillChip = styled(Chip)(({ theme }) => ({
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }));

const RecruitmentDetailsDialog = ({
  open,
  onClose,
  selectedRecruitment,
}) => {
  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Détails de la demande de recrutement</StyledDialogTitle>
      <StyledDialogContent>
        {selectedRecruitment && (
          <>
            <Typography variant="h6" component="h6">
              Type: {selectedRecruitment.type}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Compétences:
            </Typography>
            <SkillsContainer>
              {selectedRecruitment.skills.map((skill) => (
                <SkillChip key={skill} label={skill} variant="outlined" />
              ))}
            </SkillsContainer>
            <Typography variant="subtitle1" component="p">
              Informations sur le condidat :
            </Typography>
            <StyledAvatar
              alt={`${selectedRecruitment.studentId.firstName} ${selectedRecruitment.studentId.lastName}`}
              src={selectedRecruitment.studentId.profileImage}
            />
            <Typography variant="subtitle1" component="p">
              Prénom: {selectedRecruitment.studentId.firstName}
            </Typography>
            <Typography variant="subtitle1" component="p">
              Nom: {selectedRecruitment.studentId.lastName}
            </Typography>
          </>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default RecruitmentDetailsDialog;
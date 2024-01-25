import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./styles.module.scss";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Chip,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import RadioGroup from "@mui/material/RadioGroup";
import Autocomplete from "@mui/material/Autocomplete";
import RecrutementService from '../../../services/Recrutement.service';
import { toast } from "react-hot-toast";
const theme = createTheme();

const RecruitmentScreen = () => {
  const [type, setType] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if(skills.length<=0)
    {
        toast.error("Veuillez ajouter votre compétrences")
    }else
   {
    
    const requestData = {
        type,
        skills,
        description
      };
  
      try {
        // Make your API call here
        // const response = await createRecruitmentRequest(requestData);
        // Handle success response
        // toast.success(response.Message);
        // Reset form fieldstoast
        RecrutementService.createRecruitmentRequest(
          //request body for recrutement
          requestData,
          //if success
          (res)=>{
              setType("");
              setSkills([]);
              setDescription("");
          },
          //if fail 
          (error)=>{}
        );
     
      } catch (error) {
        // Handle error response
        // toast.error(error.Message);
      }
   }
  

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <Typography component="h1" variant="h5">
            Créer une demande de recrutement
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Select
                    data-test="selectType"
                    labelId="type-label"
                    id="type"
                    name="type"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    inputProps={{
                        "data-cy": "type-select", // Add data-cy attribute
                      }}
                  >
                    <MenuItem value="Temporary" 
                    data-test="Temporary"
                    >Temporaire</MenuItem>
                    <MenuItem value="Expert"
                       data-test="Expert"

                    >Expert</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="skills-input"
                  name="skills"
                  fullWidth
                  options={[]}
                  freeSolo
                  value={skills}
                  onChange={(event, newValue) => {
                    setSkills(newValue);
                  }}
                  inputProps={{
                    "data-cy": "skills-input", // Add data-cy attribute
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                        variant="outlined"
                        color="primary"
                        sx={{ marginRight: 1, marginBottom: 1 }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      data-test="compt"
                      placeholder="Entrez une compétence et appuyez sur Entrée"
                 
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="description"
                  name="description"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  id="description"
                  label="Description"
                  inputProps={{
                    "data-cy": "description-input", // Add data-cy attribute
                  }}
                   value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Chargement..." : "Créer la demande"}
            </Button>
           
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default RecruitmentScreen;

import React, { useState ,useEffect} from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import { useNavigate,useLoaderData } from "react-router-dom";
import theme from "../theme"; 
import {addProject,updateProject,getProjectById} from '../model/ProjectCRUD';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { IProject } from "../model/IProject";

const AddForm = () => {
  const projectData: IProject | null = useLoaderData() as IProject | null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    _id:0,
    Project_Name: "",
    Details: "",
    Demo_Link: "",
    Github_repository: "",
    userId:0
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (projectData) {
      setFormData({
        _id: projectData._id || 0,
        Project_Name: projectData.Project_Name || "",
        Details: projectData.Details || "",
        Demo_Link: projectData.Demo_Link || "",
        Github_repository: projectData.Github_repository || "",
        userId:projectData.userId ||0
      });
    }
  }, [projectData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "_id") {
      const numericValue = value === "" ? 0 : parseInt(value, 10);
      if (!isNaN(numericValue)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (projectData && projectData._id) {
        await updateProject(formData);
      } else {
        await addProject(formData);
      }
      navigate("/cards");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
      {projectData ? "Update Project" : "Add a New Project"}
      </Typography>
      <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
        A
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
            <TextField
              fullWidth
              label="Id"
              variant="outlined"
              name="_id"
              type="number"
              value={formData._id === 0 ? "" : formData._id}
              onChange={handleChange}
              disabled={!!projectData}
              InputProps={{
                inputProps: { min: 0 },
              }}
              helperText={
                projectData
                  ? "ID cannot be changed for existing project"
                  : "Enter a unique ID for the project"
              }
              required
            />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project_Name"
              variant="outlined"
              name="Project_Name"
              value={formData.Project_Name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter Project Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details"
              variant="outlined"
              name="Details"
              value={formData.Details}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter Project Details"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Demo_Link"
              variant="outlined"
              name="Demo_Link"
              value={formData.Demo_Link}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter Demo Link"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Github_repository"
              variant="outlined"
              name="Github_repository"
              value={formData.Github_repository}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Enter Github repository"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : projectData ? (
                "Update project"
              ) : (
                "Add project"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    <Footer></Footer>
    </>
  );
};

export default AddForm;
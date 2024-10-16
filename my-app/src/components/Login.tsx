import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../theme";
import { loginUser } from "../model/authCrud"; 
import Navbar from "../navbar/Navbar";
import { useDispatch } from 'react-redux';
import { setUserId, setUserName } from "../store/userSlice";


const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.username, formData.password);
      console.log("login",response);
      
      if (response.username && response.userId && response.token) {
        dispatch(setUserName(response.username));
        dispatch(setUserId(response.userId))
        navigate("/cards");
      }
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
        L
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
            />
          </Grid>
          {errorMessage && (
            <Grid item xs={12}>
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </>
  );
};

export default Login;
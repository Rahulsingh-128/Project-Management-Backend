import React, { useState } from "react";
import { register } from "../model/ProjectCRUD";
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
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/userSlice';
import { setUserName } from "../store/userSlice";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    _id:0,
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerForm();
  };
  async function registerForm(){
     const data=await register(formData);
     if (data) {
      const username =data?.data.username;
      const userId = data?.data.userId;
      console.log('userId from response:', userId);
      console.log('username from response:', username);
      dispatch(setUserId(userId)); // Dispatch the action to set the userId
      dispatch(setUserName(username));
      window.alert(`User registered successfully.`);
      navigate('/login');
    } else {
      window.alert('Error during registration');
    }
  }

  return (
    <>
    <Navbar></Navbar>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
        R
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
            <TextField
              fullWidth
              label="Id"
              variant="outlined"
              name="_id"
              value={formData._id}
              required
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              variant="outlined"
              name="username"
              value={formData.username}
              required
              onChange={handleChange}
              type="text"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    <Footer></Footer>
    </>
  );
};

export default Registration;

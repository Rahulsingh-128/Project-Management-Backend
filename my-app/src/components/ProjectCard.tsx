import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material"; 
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Project } from "../classes/Project";
import { useNavigate, useLoaderData } from "react-router-dom";
// import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link"; 
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteProjectById} from "../model/ProjectCRUD";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface CardData {
  _id: number;
  Project_Name: string;
  Details: string;
  Demo_Link: string;
  Github_repository: string;
  created_by: CreatedBy;
  createdAt: Date;
  updatedAt: Date;
  }
  interface CreatedBy{
    username:string;
    _id:number;
  }
  
const commonImagePath = "./logo192.png";

export default function ProjectCard() {
  // const userId = useSelector((state: RootState) => state.user.userId);
  // const username = useSelector((state: RootState) => state.user.username);
  const navigate = useNavigate();
  const data:any = useLoaderData() as CardData[]; 
  console.log("cardData",data);

  

  const handleDelete = (_id: number) => {
    deleteProject(_id);
  };
  async function deleteProject(_id:Number){
    const data=await deleteProjectById(_id);
    if(data!=null){
        window.alert(`project with id ${_id} deleted successfully.....`);
        navigate("/cards");
    }
    else
        window.alert("Error during deletion");  
}
  return (
    <>
      <Navbar />
      <div>
      <Grid container spacing={2}>
        {data?.data.map((card:any) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
                    B
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={card.Project_Name}
              />
              <CardMedia
                component="img"
                height="150"
                sx={{
                  objectFit: "contain", 
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto", // Centers the image horizontally
                }}
                image={commonImagePath}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Details:</strong> {card.Details}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Repository:</strong>{" "}
                  <MuiLink href={card.Github_repository} target="_blank" rel="noopener">
                    {card.Github_repository}
                  </MuiLink>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Demo Link:</strong>{" "}
                  <MuiLink href={card.Demo_Link} target="_blank" rel="noopener">
                    {card.Demo_Link}
                  </MuiLink>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Created By:</strong> {card.created_by.username}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  <strong>Created By:</strong> { username}
                </Typography> */}
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Created At:</strong> {card.createdAt}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                  <strong>Updated At:</strong> {card.updatedAt}
                </Typography>
              </CardContent>


              <CardActions>
                
                {/* <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(card._id)}
                >
                  <EditIcon />
                </IconButton> */}
                <Link
                  to={`/editproject/${card._id}`}
                  style={{ textDecoration: "none" }}
                >
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(card._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </div>
      <Footer />
    </>
  );
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; //
import ProjectCard from './components/ProjectCard';
// let childRoutes=[
//   {
//     path:'employees',
//     element:<Projects />
//   }
// ]
const router= createBrowserRouter([
  {
    path:'/',
    element:<App></App>,
    // children:childRoutes
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <App></App>
      <ProjectCard></ProjectCard>
      <Footer></Footer>
    </ThemeProvider>
  </React.StrictMode>
);

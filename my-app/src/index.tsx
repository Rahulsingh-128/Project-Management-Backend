import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; //
import ProjectCard from './components/ProjectCard';
import { getAllProjects,getProjectById } from './model/ProjectCRUD';
import AddForm from './components/AddForm';
import Registration from './components/Registration';
import Login from './components/Login';
import { isAuthenticated } from "./utils/auth";
import store from './store/store';
import { Provider } from 'react-redux';

const router= createBrowserRouter([
  {
    path:'/',
    element:<App></App>
  },
  {
    path: "/home",
    element: isAuthenticated() ? <App /> : <Navigate to="/cards" />,
  },
  {
    path:'cards',
    element:<ProjectCard></ProjectCard>,
    loader: async () => {
      return await getAllProjects(); 
    },
  },
  {
    path:'add',
    element:<AddForm></AddForm>
  },
  {
    path:'registration',
    element:<Registration></Registration>
  },
  {
    path:'login',
    element:<Login></Login>
  },
  {
    path: "editproject/:_id",
    element: <AddForm />,
    loader: async ({ params }) => {
      try {
        const project = await getProjectById(Number(params._id)); 
        console.log("edit route",project)
        return { ...project, _id: project._id }; 
      } catch (error) {
        throw error; 
      }
    }
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}> 
    <ThemeProvider theme={theme}>
     <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

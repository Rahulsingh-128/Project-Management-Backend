import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your custom theme
import { Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store/store";
import { Box } from "@mui/material";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
      <Box sx={{ color: theme.palette.primary.main }}>Hello ABC</Box>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      </Provider>
    </ThemeProvider>
  );
}
export default App;
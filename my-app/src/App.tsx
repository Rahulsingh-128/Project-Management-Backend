import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // Import your custom theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ color: theme.palette.primary.main }}>Hello World</div>
    </ThemeProvider>
  );
}
export default App;
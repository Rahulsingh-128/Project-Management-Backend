import { createTheme, ThemeOptions } from "@mui/material/styles";

// Extend the Material UI theme to add custom properties
const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#A29415",
    },
    secondary: {
      main: "#5d6d7e",
    },
  },
  typography: {
    button: {
      textTransform: "none", // Disable uppercase for buttons
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
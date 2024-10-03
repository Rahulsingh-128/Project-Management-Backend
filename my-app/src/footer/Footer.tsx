import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main", // Use primary color from the theme
        color: "white",
        p: 2,
        textAlign: "center",
        position: "fixed", // Fixes the footer at the bottom
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Project Management App. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
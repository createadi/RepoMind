import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ width: "100%" }}>
      <Toolbar>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ height: 40, marginRight: 10, marginLeft: 5 }}
        />
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          RepoMind
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="github"
          href="https://github.com/createadi/RepoMind"
          target="_blank"
          sx={{
            marginLeft: "auto",
            marginRight: 2,
            "&:hover": { color: "white" },
          }}
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

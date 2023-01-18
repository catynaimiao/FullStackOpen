import { AppBar, Button, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MenuHome = () => {
  const user = useSelector((data) => data.login);

  const linkStyle = {
    fontWeight: 700,
    letterSpacing: ".1rem",
    color: "white",
    textDecoration: "none",
  };
  const Style = {
    textDecoration: "none",
  };

  return (
    <AppBar position="static">
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Link to="/blogs" style={Style}>
          <Button sx={{ mx: 2, my: 2, color: "white", display: "block" }}>
            <Typography sx={linkStyle} variant="body1">
              Blogs
            </Typography>
          </Button>
        </Link>
        <Link to="/users" style={Style}>
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            <Typography sx={linkStyle} variant="body1">
              Users
            </Typography>
          </Button>
        </Link>
        <Link to="/login" style={Style}>
          <Button sx={{ my: 2, color: "white", display: "block" }}>
            <Typography sx={linkStyle} variant="body1">
              {!user ? "login" : "logout"}
            </Typography>
          </Button>
        </Link>
      </Box>
    </AppBar>
  );
};

export default MenuHome;

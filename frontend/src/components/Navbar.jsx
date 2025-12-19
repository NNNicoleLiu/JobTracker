import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

const settings = ["Profile", "Settings", "Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const clickProfile = () => {};

  const clickSettings = () => {};

  const clickLogout = () => {};

  return (
    <AppBar position="static" color="transparent">
      <Toolbar
        sx={{
          boxSizing: "border-box",
          backgroundColor: "#d9d9d9",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pl: 1,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "#1ccc28",
              my: "10px",
            }}
          >
            JAT
          </Avatar>
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: "black",
              fontFamily: "Inder, sans-serif",
              pl: "20px",
              fontSize: "36px",
            }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box>
          <Button
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "black",
              mr: 1,
            }}
            onClick={handleOpenUserMenu}
          >
            <AccountCircleIcon sx={{ fontSize: 45 }} />
            <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
          </Button>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              sx={{
                fontFamily: "Inder, sans-serif",
                fontSize: "20px",
              }}
              onClick={clickProfile}
            >
              <AccountCircleIcon sx={{ mr: 2 }} /> Profile
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: "Inder, sans-serif",
                fontSize: "20px",
              }}
              onClick={clickSettings}
            >
              <Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <MenuItem
              sx={{
                fontFamily: "Inder, sans-serif",
                fontSize: "20px",
              }}
              onClick={clickLogout}
            >
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

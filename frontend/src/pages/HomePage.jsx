import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
} from "@mui/material";

import dashboard from "../assets/dashboard_image.png";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar
          sx={{
            boxSizing: "border-box",
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
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="outlined"
              sx={{
                mx: 2,
                fontSize: "16px",
                height: "40px",
                width: "110px",
                borderRadius: "20px",
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="contained"
              sx={{
                fontSize: "16px",
                height: "40px",
                width: "110px",
                borderRadius: "20px",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ pt: { xs: 2, md: 10 }, textAlign: "center" }}>
          <Typography
            variant="h2"
            fontWeight={600}
            lineHeight={1.1}
            sx={{
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Organize your{" "}
            <Box component="span" sx={{ color: "#1976d2" }}>
              Job Hunt
            </Box>
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 4, maxWidth: 500, lineHeight: 1.8 }}
          >
            Track your job applications, interview stages, and follow-ups — all
            in one beautifully organized dashboard.
          </Typography>
          <Typography
            variant="h4"
            sx={{ mt: 4, maxWidth: 500, lineHeight: 1.8 }}
          >
            Get offer today! Good Luck!
          </Typography>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            variant="contained"
            sx={{
              fontSize: "18px",
              height: "46px",
              borderRadius: "10px",
              my: 2,
              px: 2,
            }}
          >
            Start Tracking Now
          </Button>
        </Box>
        <Card sx={{ width: "56%", minWidth: "360px" }}>
          <CardContent>
            <img
              src={dashboard}
              alt="dashboard overview"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default HomePage;

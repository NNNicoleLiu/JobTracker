import React from "react";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";

import { Box, Button, Modal, Divider, IconButton, Chip } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const Profile = (props) => {
  // props: open, setOpen
  const [profile, setProfile] = React.useState({});

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile/");
      setProfile(response.data);
    } catch (error) {
      alert("Error fetching user profile");
    }
  };

  React.useEffect(() => {
    fetchProfile();
  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="profile-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <h1 style={{ margin: 0 }}>Profile</h1>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <p style={{ fontSize: "20px" }}>Name: {profile.name}</p>
        <p style={{ fontSize: "20px" }}>Email: {profile.email}</p>
      </Box>
    </Modal>
  );
};

export default Profile;

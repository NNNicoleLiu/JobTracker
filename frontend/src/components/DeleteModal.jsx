import React from "react";
import { useNavigate } from "react-router-dom";

import api from "../utils/api";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const DeleteModal = (props) => {
  const navigate = useNavigate();

  const clickYes = async () => {
    try {
      const response = await api.delete(`/jobs/${props.id}/`);
      props.setOpen(false);
      navigate(0);
    } catch (err) {
      alert("Something wrong! Try again!");
    }
  };
  const clickNo = () => props.setOpen(false);
  return (
    <Modal open={props.open} aria-label="delete-modal">
      <Box sx={style} aria-label="delete-modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Do you want to delete all the information about this job application?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            endIcon={<CheckCircleOutlineIcon />}
            onClick={clickYes}
          >
            YES
          </Button>
          <Button
            variant="outlined"
            endIcon={<HighlightOffIcon />}
            onClick={clickNo}
          >
            NO
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;

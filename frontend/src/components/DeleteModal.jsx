import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    await axios({
      url: `http://localhost:8000/jobs/${props.id}/`,
      method: "DELETE",
      headers: {
        // authorization: token,
      },
    })
      .then((res) => {
        alert("Information delete successfully!");
        console.log("Response Data:", res.data);
        props.setOpen(false);
        navigate(0);
      })
      .catch((err) => {
        alert("Something wrong! Try again!");
        console.log("Response Data:", res.data);
      });
  };
  const clickNo = () => props.setOpen(false);
  return (
    <Modal open={props.open} aria-labelledby="delete-application-modal">
      <Box sx={style}>
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

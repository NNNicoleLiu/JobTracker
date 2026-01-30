import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AlertMsg from "./Alertmsg";

const JobEdit = (props) => {
  // console.log(props);
  const navigate = useNavigate();
  const token = "token " + localStorage.getItem("token");
  const [formData, setFormData] = React.useState({
    company: "",
    position: "",
    status: "Applied",
    applied_at: new Date().toISOString(),
    link: "",
    comment: "",
  });

  // handle input error
  const [positionError, setPositionError] = React.useState(false);
  const [companyError, setCompanyError] = React.useState(false);
  const [positionMsg, setPositionMsg] = React.useState([]);
  const [companyMsg, setCompanyMsg] = React.useState([]);

  // Populate form when editing
  React.useEffect(() => {
    if (props.editData) {
      console.log(props.editData.applied_at);
      setFormData({
        company: props.editData.company || "",
        position: props.editData.position || "",
        status: props.editData.status || "Applied",
        applied_at:
          props.editData.applied_at.toString() || new Date().toISOString(),
        link: props.editData.link || "",
        comment: props.editData.comment || "",
      });
    } else {
      // Reset form for new application
      setFormData({
        company: "",
        position: "",
        status: "Applied",
        applied_at: new Date().toISOString(),
        link: "",
        comment: "",
      });
    }
  }, [props.editData, props.open]);

  const handleChange = (field) => (event) => {
    let newValue = event.target.value;
    // console.log(field);
    if (field === "applied_at") {
      newValue = newValue + "T" + formData.applied_at.toString().split("T")[1];
    }
    setFormData({
      ...formData,
      [field]: newValue,
    });
  };

  const handleSave = async () => {
    // console.log(formData);
    let method, url, alertMeg;
    if (props.editData) {
      method = "PUT";
      url = `http://localhost:8000/jobs/${props.editData.id}/`;
      alertMeg = "Information update successfully!";
    } else {
      method = "POST";
      url = "http://localhost:8000/jobs/";
      alertMeg = "Information create successfully!";
    }
    await axios({
      url: url,
      method: method,
      headers: {
        authorization: token,
      },
      data: formData,
    })
      .then((res) => {
        // alert(alertMeg);
        console.log("Response Data:", res.data);
        handleClose();
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response.data));
        console.log("Response Data:", err.response.data);
        if (err.response.data.company) {
          setCompanyError(true);
          setCompanyMsg(err.response.data.company);
          console.log(companyMsg);
        }
        if (err.response.data.position) {
          setPositionError(true);
          setPositionMsg(err.response.data.position);
          console.log(positionMsg);
        }
      });
  };

  const handleClose = () => {
    setFormData({
      company: "",
      position: "",
      status: "Applied",
      applied_at: new Date().toISOString(),
      link: "",
      comment: "",
    });
    props.setOpen(false);
    navigate(0);
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="job-application-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header with Close Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 500, fontFamily: "Inder, sans-serif" }}
          >
            {props.editData ? "Edit Job Application" : "New Job Application"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            fontFamily: "Inder, sans-serif",
          }}
        >
          {/* Company Name */}
          <TextField
            label="Company Name"
            value={formData.company}
            onChange={handleChange("company")}
            fullWidth
            required
            variant="outlined"
            onFocus={() => setCompanyError(false)}
          />
          {companyError && (
            <AlertMsg
              msg={companyMsg}
              closeAlert={() => setCompanyError(false)}
            />
          )}
          {/* Position */}
          <TextField
            label="Position"
            value={formData.position}
            onChange={handleChange("position")}
            fullWidth
            required
            variant="outlined"
            onFocus={() => setPositionError(false)}
          />
          {positionError && (
            <AlertMsg
              msg={positionMsg}
              closeAlert={() => setPositionError(false)}
            />
          )}
          {/* Status */}
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={handleChange("status")}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Interview">Interview</MenuItem>
              <MenuItem value="Offer">Offer</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Withdrawn">Withdrawn</MenuItem>
            </Select>
          </FormControl>

          {/* Applied Date */}
          <TextField
            label="Applied Date"
            type="date"
            value={formData.applied_at.split("T")[0]}
            onChange={handleChange("applied_at")}
            fullWidth
          />

          {/* Link */}
          <TextField
            label="Job Link"
            value={formData.link}
            onChange={handleChange("link")}
            fullWidth
            variant="outlined"
            placeholder="https://example.com/job"
          />

          {/* Comment */}
          <TextField
            label="Comment"
            value={formData.comment}
            onChange={handleChange("comment")}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Add notes or comments..."
          />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              px: 2,
              py: 1,
              fontFamily: "Inder, sans-serif",
              fontSize: 16,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              textTransform: "none",
              px: 3,
              py: 1,
              fontFamily: "Inder, sans-serif",
              fontSize: 16,
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default JobEdit;

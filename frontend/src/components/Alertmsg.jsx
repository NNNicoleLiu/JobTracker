import React from "react";
import { Alert, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertMsg = ({ msg, closeAlert }) => {
  return (
    <>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={closeAlert}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        }
        // sx={{ mt: 1, mb: 1 }}
      >
        <div>
          {msg.map((value) => (
            <p key={value} style={{ margin: "2px" }}>
              {value}
            </p>
          ))}
        </div>
      </Alert>
    </>
  );
};

export default AlertMsg;

import React from "react";
import {
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Password = (props) => {
  // props: showPassword, setShowPassword, handleClickShowPassword, password, setPassword, label, setError

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl variant="outlined" required fullWidth margin="normal">
      <InputLabel htmlFor={props.label}>{props.label}</InputLabel>
      <OutlinedInput
        id={props.label}
        type={props.showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                props.showPassword
                  ? "hide the password"
                  : "display the password"
              }
              onClick={props.handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {props.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        onChange={(e) => props.setPassword(e.target.value)}
        value={props.password}
        onFocus={() => props.setError(false)}
      />
    </FormControl>
  );
};

export default Password;

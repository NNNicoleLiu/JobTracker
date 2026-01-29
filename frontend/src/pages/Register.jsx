import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Container,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import LoginGoogle from "../components/LoginGoogle";
import Password from "../components/Password";

// import AlertMsg from '../components/Alert';

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [emailRegister, setEmailRegister] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const checkName = (name) => {
    if (!name.target.value) {
      setNameError(true);
      error.current = "Name cannot be empty!";
    } else {
      setNameError(false);
    }
  };

  const checkEmail = (email) => {
    const emailPattern = /^.+@.+\..+/;
    if (!email.target.value || !emailPattern.test(email.target.value)) {
      setEmailError(true);
      error.current = "Invalid email format!";
      alert("Invalid email format! Example: abc@example.com");
    } else {
      setEmailError(false);
    }
  };

  const register = async () => {
    if (password !== password2) {
      alert("Passwords do not match! Please check again!");
      setPasswordError(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/register/",
          {
            name,
            email,
            password,
            password2,
          }
        );
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } catch (err) {
        // error.current = err.response.data.error;
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
        setRegisterError(true);
      }
    }
  };

  React.useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        register();
      }
    };
    document.addEventListener("keydown", keyDown);
    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ pt: "90px", display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ margin: "auto", marginBottom: "16px" }}>Register</h1>
        {!emailRegister && (
          <Button
            startIcon={<EmailIcon sx={{ mr: "20px" }} fontSize="large" />}
            variant="outlined"
            sx={{
              height: "46px",
              width: "100%",
              border: "1px solid black",
              borderRadius: "23px",
              textTransform: "none",
              fontSize: "16px",
              mt: 1,
            }}
            onClick={() => setEmailRegister(true)}
          >
            Sign up with Email
          </Button>
        )}
        {emailRegister && (
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              // onBlur={checkName}
            />
            {/* {nameError && <AlertMsg msg={error.current} closeAlert = {() => setNameError(false)} />} */}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              // onBlur={checkEmail}
            />
            {/* {emailError && <AlertMsg msg={error.current} closeAlert = {() => setEmailError(false)} />} */}
            <Password
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleClickShowPassword={handleClickShowPassword}
              password={password}
              setPassword={setPassword}
              label={"Password"}
            />
            <Password
              showPassword={showPassword2}
              setShowPassword={setShowPassword2}
              handleClickShowPassword={handleClickShowPassword2}
              password={password2}
              setPassword={setPassword2}
              label={"Confirm Password"}
            />
            {/* {passwordError && <AlertMsg msg='Password does not match! Check again!' closeAlert = {() => setPasswordError(false)} />} */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, height: 45, textTransform: "none" }}
              onClick={register}
            >
              Register
            </Button>
          </div>
        )}
        {/* {registerError && <AlertMsg msg={error.current} closeAlert = {() => setRegisterError(false)} />} */}
        <Divider sx={{ my: 3, fontSize: "15px", color: "grey" }}>OR</Divider>
        <LoginGoogle />
        <p style={{ margin: "auto", fontSize: "16px" }}>
          Already have an account?
          <Link to="/login" style={{ paddingLeft: "8px" }}>
            Login
          </Link>
        </p>
      </Container>
    </>
  );
};

export default Register;

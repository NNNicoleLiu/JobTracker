import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Container,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

// import AlertMsg from '../components/Alert';

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);
  const navigate = useNavigate();
  const error = React.useRef("");

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
        error.current = err.response.data.error;
        console.log(err.response.data);
        alert(error.current);
        setRegisterError(true);
      }
    }
  };

  React.useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        // register();
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
        sx={{ mt: "90px", display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ margin: "auto", marginBottom: "8px" }}>Register</h1>
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
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          value={password2}
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
          sx={{ mt: 1, mb: 2, height: 45, textTransform: "none" }}
          onClick={register}
        >
          Register
        </Button>
        {/* {registerError && <AlertMsg msg={error.current} closeAlert = {() => setRegisterError(false)} />} */}
        <p style={{ margin: "auto", fontSize: "19px" }}>
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

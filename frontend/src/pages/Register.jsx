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

import AlertMsg from "../components/Alertmsg";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  // check input error
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [matchError, setMatchError] = React.useState(false);

  const [nameMsg, setNameMsg] = React.useState([]);
  const [emailMsg, setEmailMsg] = React.useState([]);
  const [passwordMsg, setPasswordMsg] = React.useState([]);

  // password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [emailRegister, setEmailRegister] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const register = async () => {
    if (password !== password2) {
      // error.current = "Passwords do not match! Please check again!";
      setMatchError(true);
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
        // alert(JSON.stringify(err.response.data));
        if (err.response.data.name) {
          setNameError(true);
          setNameMsg(err.response.data.name);
          console.log(nameMsg);
        }
        if (err.response.data.email) {
          setEmailError(true);
          setEmailMsg(err.response.data.email);
          console.log(emailMsg);
        }
        if (err.response.data.password) {
          setPasswordError(true);
          setPasswordMsg(err.response.data.password);
          console.log(passwordMsg);
        }
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
              onFocus={() => setNameError(false)}
            />
            {nameError && (
              <AlertMsg msg={nameMsg} closeAlert={() => setNameError(false)} />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onFocus={() => setEmailError(false)}
            />
            {emailError && (
              <AlertMsg
                msg={emailMsg}
                closeAlert={() => setEmailError(false)}
              />
            )}
            <Password
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleClickShowPassword={handleClickShowPassword}
              password={password}
              setPassword={setPassword}
              label={"Password"}
              setError={setPasswordError}
            />
            {passwordError && (
              <AlertMsg
                msg={passwordMsg}
                closeAlert={() => setPasswordError(false)}
              />
            )}

            <Password
              showPassword={showPassword2}
              setShowPassword={setShowPassword2}
              handleClickShowPassword={handleClickShowPassword2}
              password={password2}
              setPassword={setPassword2}
              label={"Confirm Password"}
              setError={setMatchError}
            />
            {matchError && (
              <AlertMsg
                msg={["Password does not match! Check again!"]}
                closeAlert={() => setMatchError(false)}
              />
            )}
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
        <p style={{ margin: "auto", fontSize: "16px", marginBottom: "40px" }}>
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

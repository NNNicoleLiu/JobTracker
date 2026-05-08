import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import config from "../config";
import LoginGoogle from "../components/LoginGoogle";
import Password from "../components/Password";
import AlertMsg from "../components/Alertmsg";

import {
  Container,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Login = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // login error
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [emailMsg, setEmailMsg] = React.useState([]);
  const [passwordMsg, setPasswordMsg] = React.useState([]);

  // password visibility
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // login by email
  const [emailLogin, setEmailLogin] = React.useState(false);

  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }
    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password"));
    }
    if (localStorage.getItem("check")) {
      setIsChecked(localStorage.getItem("check"));
    }
  }, []);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const LoginEmail = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/auth/login/`, {
        email,
        password,
      });
      const { access, refresh, user } = response.data;

      // Store JWT tokens (CHANGED from 'token')
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      if (isChecked) {
        localStorage.setItem("check", isChecked);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("check");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      navigate("/dashboard");
    } catch (err) {
      if (err.response.data.email) {
        setEmailError(true);
        setEmailMsg(err.response.data.email);
      }
      if (err.response.data.error) {
        setPasswordError(true);
        setPasswordMsg([err.response.data.error]);
      }
    }
  };

  React.useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        LoginEmail();
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
        <h1 style={{ margin: "auto", marginBottom: "16px" }}>Welcome Back!</h1>
        {!emailLogin && (
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
            onClick={() => setEmailLogin(true)}
          >
            Sign in with Email
          </Button>
        )}
        {emailLogin && (
          <div>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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

            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleChange} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, height: 45, textTransform: "none" }}
              onClick={LoginEmail}
            >
              Login
            </Button>
          </div>
        )}
        <Divider sx={{ my: 3, fontSize: "15px", color: "grey" }}>OR</Divider>
        <LoginGoogle />
        <p style={{ margin: "auto", fontSize: "16px" }}>
          {"Don't have an account?"}
          <Link to="/register" style={{ paddingLeft: "8px" }}>
            Register Now
          </Link>
        </p>
        <p
          style={{
            margin: "auto",
            fontSize: "16px",
            marginTop: "16px",
            marginBottom: "40px",
          }}
        >
          <Link to="/" style={{ paddingLeft: "8px" }}>
            Go to Home Page
          </Link>
        </p>
      </Container>
    </>
  );
};

export default Login;

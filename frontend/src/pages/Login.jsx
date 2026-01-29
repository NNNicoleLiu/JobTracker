import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import LoginGoogle from "../components/LoginGoogle";
import Password from "../components/Password";

const Login = () => {
  const navigate = useNavigate();
  // const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [loginError, setLoginError] = React.useState(false);
  // const error = React.useRef("");

  const [emailLogin, setEmailLogin] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // if (localStorage.getItem("token")) {
  //   return <Navigate to="/dashboard" />;
  // }

  const LoginEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      // error.current = err.response.data.error;
      console.log(err);
      // alert(error.current);
      alert(err.response.data.error);
      // setLoginError(true);
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
        sx={{ pt: "100px", display: "flex", flexDirection: "column" }}
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
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            /> */}
            <Password
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleClickShowPassword={handleClickShowPassword}
              password={password}
              setPassword={setPassword}
              label={"Password"}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
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
      </Container>
    </>
  );
};

export default Login;

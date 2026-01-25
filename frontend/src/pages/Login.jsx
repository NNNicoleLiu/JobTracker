import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginError, setLoginError] = React.useState(false);
  const navigate = useNavigate();
  const error = React.useRef("");

  // if (localStorage.getItem("token")) {
  //   return <Navigate to="/dashboard" />;
  // }

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login/", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      error.current = err.response.data.error;
      alert(error.current);
      setLoginError(true);
    }
  };

  React.useEffect(() => {
    const keyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        login();
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
        sx={{ mt: "100px", display: "flex", flexDirection: "column" }}
      >
        <h1 style={{ margin: "auto", marginBottom: "8px" }}>Login</h1>
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
        <TextField
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2, height: 45, textTransform: "none" }}
          onClick={login}
        >
          Login
        </Button>
        {/* {loginError && <AlertMsg msg={error.current} closeAlert={() => setLoginError(false)} />} */}
        <p style={{ margin: "auto", fontSize: "19px" }}>
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

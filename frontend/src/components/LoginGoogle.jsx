import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@mui/material";
import google from "../assets/google.jpg";
import config from "../config";

const LoginGoogle = () => {
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send access_token to backend
        const response = await axios.post(`${config.API_URL}/auth/google/`, {
          access_token: tokenResponse.access_token,
        });

        const { access, refresh } = response.data;

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login failed:", error.response?.data);
        alert(
          "Google login failed: " +
            (error.response?.data?.detail || "Unknown error"),
        );
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      alert("Google login failed");
    },
  });

  return (
    <Button
      variant="outlined"
      sx={{
        height: "46px",
        width: "100%",
        border: "1px solid black",
        borderRadius: "23px",
        textTransform: "none",
        fontSize: "16px",
        mb: 2,
      }}
      onClick={loginGoogle}
    >
      <img
        src={google}
        alt="google icon"
        style={{ height: "30px", width: "30px", marginRight: "20px" }}
      />
      Continue with Google
    </Button>
  );
};

export default LoginGoogle;

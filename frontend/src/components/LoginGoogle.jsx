import React from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@mui/material";
import google from "../assets/google.jpg";

const LoginGoogle = () => {
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google token response:", tokenResponse);
      // setLoading(true);

      try {
        // Send access_token to Django backend
        const response = await axios.post(
          "http://localhost:8000/auth/google/",
          {
            access_token: tokenResponse.access_token,
          }
        );

        // console.log("Django response:", response.data);

        // Get token and user from Django
        const { token, user } = response.data;

        // Store token and user info
        localStorage.setItem("token", token);

        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login failed:", error.response?.data);
        alert(
          "Google login failed: " +
            (error.response?.data?.detail || "Unknown error")
        );
      } finally {
        setLoading(false);
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

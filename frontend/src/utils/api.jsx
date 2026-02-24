import axios from "axios";
import config from "../config";

// Create axios instance
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Changed from Token to Bearer
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If 401 error and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          // Try to refresh the token
          const response = await axios.post(
            `${config.API_URL}/auth/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = response.data;

          // Save new access token
          localStorage.setItem("access_token", access);

          // 👇 Update the instance default header
          api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

          // Retry original request with new token
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        } else {
          // No refresh token, redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login"; // 👈 use this instead of navigate()
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

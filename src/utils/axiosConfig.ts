import axios from "axios";

// Create an axios instance
export const axiosConfig = axios.create({
  baseURL: "https://campus-crib-backend.onrender.com",
});

// Add a request interceptor to dynamically add the token from localStorage
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

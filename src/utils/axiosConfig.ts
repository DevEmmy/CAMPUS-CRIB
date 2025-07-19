import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://campus-crib-backend.onrender.com",
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

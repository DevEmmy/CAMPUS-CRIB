import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "https://campus-crib-backend-mgwi.onrender.com",
  // baseURL: "http://192.168.125.168:3050",
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

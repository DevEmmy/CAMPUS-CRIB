import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: "http://192.168.71.168:3050",
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

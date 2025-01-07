import axios from "axios";

export const axiosConfig = axios.create({
    // baseURL: "http://192.168.176.168:3050/",
    baseURL: "https://campus-crib-backend.onrender.com",
    headers: {
    //   Authorization: `Bearer `
    }
  });
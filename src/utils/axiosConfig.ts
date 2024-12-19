import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: "http://192.168.176.86:3000/",
    headers: {
    //   Authorization: `Bearer `
    }
  });
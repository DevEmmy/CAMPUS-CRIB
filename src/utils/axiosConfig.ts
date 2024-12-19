import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: "http://192.168.176.168:3050/",
    headers: {
    //   Authorization: `Bearer `
    }
  });
import axios from "axios";

export const axiosConfig = axios.create({
    baseURL: "",
    headers: {
    //   Authorization: `Bearer `
    }
  });
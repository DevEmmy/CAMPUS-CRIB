import { axiosConfig } from "./axiosConfig";

export const signup = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string | null;
}) => {
  try {
    const response = await axiosConfig.post("auth/sign-up", data);
    if (response) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosConfig.post("auth/sign-in", data);
    if (response) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
